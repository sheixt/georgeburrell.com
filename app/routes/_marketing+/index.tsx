import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => [
	{ title: 'George Burrell | Coming Soon...' },
]

export default function Index() {
	return (
		<main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
			<div className="relative sm:pb-16 sm:pt-8">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="relative sm:overflow-hidden sm:rounded-2xl">
						<div className="lg:pt-18 relative px-4 pb-8 pt-8 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pb-20">
							<h1 className="flex flex-col">
								<span className="mx-auto mt-6 max-w-lg text-center text-xl font-bold uppercase tracking-[1em] opacity-30  sm:max-w-3xl">
									Portfolio of
								</span>
								<span className="text-center text-mega font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
									George Burrell
								</span>
								<span className="ont-bold mx-auto mt-6 max-w-lg text-center text-xl uppercase tracking-[1em] opacity-30  sm:max-w-3xl">
									coming soon
								</span>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
