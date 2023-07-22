import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PostEditor } from '~/routes/resources+/post-editor.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'

export async function loader({ params, request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const post = await prisma.post.findFirst({
		where: {
			id: params.postId,
			ownerId: userId,
		},
	})
	if (!post) {
		throw new Response('Not found', { status: 404 })
	}
	return json({ post: post })
}

export default function PostEdit() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="absolute inset-0">
			<PostEditor post={data.post} />
		</div>
	)
}
