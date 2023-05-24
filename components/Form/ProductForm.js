/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import React from 'react';
import {uploadImageToFirebase} from '../../pages/api/firebase/firebaseConfig';

export default function ProductForm({id, ...props}) {
	const router = useRouter();
	const [title, setTitle] = useState(props.title || '');
	const [description, setDescription] = useState(props.description || '');
	const [price, setPrice] = useState(props.price || '');
	const [image, setImage] = useState(props.image || []);

	const [goBack, setGoBack] = useState(false);

	const createProduct = async ev => {
		ev.preventDefault();
		const formData = ev.currentTarget;
		const file = formData.elements[1].files?.item(0);
		let data = {title, description, price, image};

		if (file) {
			await uploadImageToFirebase(data, file);
		}

		data = {title, description, price, image};
		console.log(data);

		if (id) {
			await axios.put('/api/products', {...data, id});
		} else {
			await axios.post('/api/products', data);
		}

		setGoBack(true);
	};

	if (goBack) {
		router.push('/products');
	}

	return (
		<form onSubmit={createProduct}>
			<label>Product name</label>
			<input
				type='text'
				placeholder='product name'
				value={title}
				onChange={ev => setTitle(ev.target.value)}
			></input>
			<label>Images</label>
			<div className='flex gap-1 flex-row flex-wrap'>
				<label className='w-24 h-24 border flex items-center justify-center text-sm gap-1 rounded-md bg-blue-200 cursor-pointer'>
          Upload{' '}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-4 h-4'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
						/>
					</svg>
					<input type='file' className='hidden'></input>
					{/* onChange={uploadImage} */}
				</label>

				{image?.length > 0 ? (
					image.map(item => (
						<img
							key={item}
							className='w-24 min h-24 min-w-24 object-cover min-h-24 border rounded-md bg-blue-200'
							src={item}
							alt={'product image'}
							width={60}
							height={60}
						></img>
					))
				) : (
					<div>No images in this product.</div>
				)}
			</div>
			<label>Description</label>
			<textarea
				placeholder='description'
				className='max-h-52'
				value={description}
				onChange={ev => setDescription(ev.target.value)}
			></textarea>
			<label>Price (in €)</label>
			<input
				type='text'
				placeholder='price'
				value={price}
				onChange={ev => setPrice(ev.target.value)}
			></input>
			<button type='submit' className='btn-primary'>
        Save
			</button>
		</form>
	);
}
