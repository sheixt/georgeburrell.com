import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/node'
import {
	Form,
	Link,
	useActionData,
	useFormAction,
	useLoaderData,
	useNavigation,
} from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { floatingToolbarClassName } from '~/components/floating-toolbar.tsx'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { getUserId, requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	const userId = await getUserId(request)
	const post = await prisma.post.findUnique({
		where: {
			id: params.postId,
		},
		select: {
			id: true,
			title: true,
			content: true,
			ownerId: true,
			updatedAt: true,
		},
	})
	if (!post) {
		throw new Response('Not found', { status: 404 })
	}
	const date = new Date(post.updatedAt)
	const timeAgo = formatDistanceToNow(date)
	return json({
		post,
		timeAgo,
		dateDisplay: date.toLocaleDateString(),
		isOwner: userId === post.ownerId,
	})
}

const DeleteFormSchema = z.object({
	intent: z.literal('delete-post'),
	postId: z.string(),
})

export async function action({ request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFormSchema,
		acceptMultipleErrors: () => true,
	})
	if (!submission.value || submission.intent !== 'submit') {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	const { postId } = submission.value

	const post = await prisma.post.findFirst({
		select: { id: true, owner: { select: { username: true } } },
		where: {
			id: postId,
			ownerId: userId,
		},
	})
	if (!post) {
		submission.error.postId = ['Post not found']
		return json({ status: 'error', submission } as const, {
			status: 404,
		})
	}

	await prisma.post.delete({
		where: { id: post.id },
	})

	return redirectWithToast(`/users/${post.owner.username}/posts`, {
		title: 'Post deleted',
		variant: 'destructive',
	})
}

export default function PostRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<>
			<div className="absolute inset-0 flex flex-col px-10">
				<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{data.post.title}</h2>
				<div className={`${data.isOwner ? 'pb-24' : 'pb-12'} overflow-y-auto`}>
					<p className="whitespace-break-spaces text-sm md:text-lg">
						{data.post.content}
					</p>
				</div>
			</div>
			{data.isOwner ? (
				<div className={floatingToolbarClassName}>
					<span
						className="text-sm text-foreground/90 max-[524px]:hidden"
						title={data.dateDisplay}
					>
						<Icon name="clock" className="mr-2 scale-125" />
						{data.timeAgo} ago
					</span>
					<div className="grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4">
						<DeletePost id={data.post.id} />
						<Button
							asChild
							className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
						>
							<Link to="edit">
								<Icon
									name="pencil-1"
									className="scale-125 max-md:scale-150 md:mr-2"
								/>
								<span className="max-md:hidden">Edit</span>
							</Link>
						</Button>
					</div>
				</div>
			) : null}
		</>
	)
}

export function DeletePost({ id }: { id: string }) {
	const actionData = useActionData<typeof action>()
	const navigation = useNavigation()
	const formAction = useFormAction()
	const [form] = useForm({
		id: 'delete-post',
		lastSubmission: actionData?.submission,
		constraint: getFieldsetConstraint(DeleteFormSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFormSchema })
		},
	})

	return (
		<Form method="post" {...form.props}>
			<input type="hidden" name="postId" value={id} />
			<StatusButton
				type="submit"
				name="intent"
				value="delete-post"
				variant="destructive"
				status={
					navigation.state === 'submitting' &&
					navigation.formAction === formAction &&
					navigation.formData?.get('intent') === 'delete-post' &&
					navigation.formMethod === 'POST'
						? 'pending'
						: actionData?.status ?? 'idle'
				}
				disabled={navigation.state !== 'idle'}
				className="w-full max-md:aspect-square max-md:px-0"
			>
				<Icon name="trash" className="scale-125 max-md:scale-150 md:mr-2" />
				<span className="max-md:hidden">Delete</span>
			</StatusButton>
			<ErrorList errors={form.errors} id={form.errorId} />
		</Form>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => <p>Post not found</p>,
			}}
		/>
	)
}
