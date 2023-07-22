import { json } from '@remix-run/router'
import { type DataFunctionArgs } from '@remix-run/server-runtime'
import { PostEditor } from '~/routes/resources+/post-editor.tsx'
import { requireUserId } from '~/utils/auth.server.ts'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default function NewPostRoute() {
	return <PostEditor />
}
