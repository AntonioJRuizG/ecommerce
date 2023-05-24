import Layout from '../components/Layout/Layout';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function Home() {
	const {data: session} = useSession();
	return (
		<Layout className='text-blue-900 flex'>
			<div className='text-blue-900 flex justify-between'>
				<h2>Hello, {session?.user?.name}</h2>
				<div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
					<Image
						className='w-6 h-6 '
						src={session?.user?.image}
						alt='User image'
						width={50}
						height={50}
					></Image>
					<span className='px-2'>{session?.user?.name}</span>
				</div>
			</div>
		</Layout>
	);
}
