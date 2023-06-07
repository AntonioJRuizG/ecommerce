import {useSession, signIn} from 'next-auth/react';
import Nav from '../Nav/Nav';
import React, {useState} from 'react';
import Logo from '../Logo/Logo';

export default function Layout({children}) {
	const [showNav, setShowNav] = useState(false);
	const {data: session} = useSession();
	if (!session) {
		return (
			<div className='bg-bggray w-screen h-screen flex items-center'>
				<div className='text-center w-full'>
					<button
						className='bg-primary text-white p-2 px-4 rounded-lg'
						onClick={() => signIn('google')}
					>
            Login with google
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-bggray min-h-screen'>
			<div className='flex flex-row gap-2 p-2'>
				<button className='md:hidden' onClick={() => setShowNav(!showNav)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</button>
				<div className='flex justify-center md:justify-start w-full mx-3'>
					<Logo></Logo>
				</div>
			</div>
			<div className='flex'>
				<Nav show={showNav}></Nav>
				<div className='flex-grow p-4'>{children}</div>
			</div>
		</div>
	);
}
