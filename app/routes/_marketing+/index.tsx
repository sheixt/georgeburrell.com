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
								<span className="mx-auto mt-6 max-w-lg text-center font-bold uppercase tracking-[1em] opacity-30 animate-in fade-in slide-in-from-top duration-500 sm:max-w-3xl  md:text-xl">
									Portfolio of
								</span>
								<span className="delay-400 text-center text-mega font-extrabold tracking-tight animate-in fade-in duration-500 delay-150 sm:text-8xl lg:text-9xl">
									<span className="animate-bg-position bg-gradient-to-r from-pink-800 from-10% via-purple-700 to-teal-600 bg-300% bg-clip-text text-transparent">
										George Burrell
									</span>
								</span>
								<span className="mx-auto mt-6 max-w-lg text-center font-bold uppercase tracking-[1em] opacity-30 sm:max-w-3xl md:text-xl">
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
