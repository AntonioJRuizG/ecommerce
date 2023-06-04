import React from 'react';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href={'/'} className='flex gap-1'>
			<span className='text-xl text-gray-800 font-semibold'>EcommerceAdmin</span>
		</Link>
	);
}
