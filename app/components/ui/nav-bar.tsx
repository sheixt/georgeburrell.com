import { Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/user.ts'
import { Logo } from '../logo.tsx'
import UserDropdown from '../user-dropdown.tsx'
import { ThemeSwitch } from '~/routes/resources+/theme/index.tsx'
import { useRequestInfo } from '~/utils/request-info.ts'
import { Icon } from './icon.tsx'

export function NavBar() {
	const user = useOptionalUser()
	const { userPrefs } = useRequestInfo()

	return (
		<header className="container py-6">
			<nav className="flex items-center justify-between gap-4">
				<div className="w-48">
					<ThemeSwitch userPreference={userPrefs.theme} />
				</div>
				<Link
					to="/"
					className="group flex items-center gap-4 font-bold uppercase tracking-[0.8em] dark:text-white"
				>
					<span className="relative left-3 hidden w-40 justify-end lg:inline-flex">
						<span className="animate-bg-position bg-300% opacity-20 transition-all group-hover:bg-gradient-to-r group-hover:from-pink-800 group-hover:from-10% group-hover:via-purple-700 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:opacity-100">
							George
						</span>
					</span>
					<Logo className="h-14 w-14 group-hover:animate-spin group-hover:repeat-[0.5]" />
					<span className="hidden w-40 lg:inline-flex">
						<span className="animate-bg-position bg-300% opacity-20 transition-all group-hover:bg-gradient-to-r group-hover:from-pink-800 group-hover:from-10% group-hover:via-purple-700 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:opacity-100">
							Burrell
						</span>
					</span>
				</Link>
				<div className="flex w-48 items-center justify-end gap-10">
					{user ? (
						<UserDropdown />
					) : (
						<Link to="/login">
							<Icon name="avatar">
								<span className="sr-only">Log in</span>
							</Icon>
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}
