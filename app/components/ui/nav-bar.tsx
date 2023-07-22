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
				<ThemeSwitch userPreference={userPrefs.theme} />
				<Link
					to="/"
					className="flex items-center gap-2 font-bold uppercase tracking-[1em] dark:text-white"
				>
					<span className="hidden text-right opacity-20 lg:inline-flex">
						George
					</span>
					<Logo className="h-14 w-14" />
					<span className="hidden pl-3 opacity-20 lg:inline-flex">Burrell</span>
				</Link>
				<div className="flex items-center gap-10">
					{user ? (
						<UserDropdown />
					) : (
						<Link to="/login">
							<Icon name="avatar">
								<span className="sr-only">Login</span>
							</Icon>
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}
