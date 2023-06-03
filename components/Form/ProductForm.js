/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {uploadImageToFirebase} from '../../pages/api/firebase/firebaseConfig';

import SortableList, {SortableItem} from 'react-easy-sort';
import arrayMove from 'array-move';

export default function ProductForm({id, ...props}) {
	const router = useRouter();
	const [title, setTitle] = useState(props.title || '');
	const [description, setDescription] = useState(props.description || '');
	const [price, setPrice] = useState(props.price || '');
	const [image, setImage] = useState(props.image || []);
	const [goBack, setGoBack] = useState(false);
	const [isUploading, setIsUploagin] = useState(false);
	const [categoriesList, setCategoriesList] = useState([]);
	const [category, setCategory] = useState(props.category || '');
	const [productProperties, setProductProperties] = useState(
		props.properties || {},
	);

	const onSortEnd = (oldIndex, newIndex) => {
		setImage(array => arrayMove(array, oldIndex, newIndex));
	};

	const createProduct = async ev => {
		ev.preventDefault();
		const formData = ev.currentTarget;
		const file = formData.elements[1].files?.item(0);
		const data = {
			title,
			description,
			price,
			image,
			category,
			properties: productProperties,
		};

		if (file) {
			await uploadImageToFirebase(data, file);
			setIsUploagin(true);
		}

		if (id) {
			await axios.put('/api/products', {...data, id});
		} else {
			await axios.post('/api/products', data);
		}

		setIsUploagin(false);
		// SetGoBack(true);
	};

	if (goBack) {
		router.push('/products');
	}

	useEffect(() => {
		axios.get('/api/categories').then(response => {
			setCategoriesList(response.data);
		});
	}, []);

	const propertiesToFill = [];
	if (categoriesList.length > 0 && category) {
		let selectedCategoryInfo = categoriesList.find(
			({_id}) => _id === category,
		);
		propertiesToFill.push(...selectedCategoryInfo.properties);
		while (selectedCategoryInfo?.parent?._id) {
			// eslint-disable-next-line prefer-const
			let selectedParentCategory = categoriesList.find(
				({_id}) => _id === selectedCategoryInfo?.parent?._id,
			);
			propertiesToFill.push(...selectedParentCategory.properties);
			selectedCategoryInfo = selectedParentCategory;
		}
	}

	const setProductProps = (propName, value) => {
		setProductProperties(prev => {
			const newProductProps = {...prev};
			newProductProps[propName] = value;
			return newProductProps;
		});
	};

	return (
		<form onSubmit={createProduct}>
			<label>Product name</label>
			<input
				type='text'
				placeholder='product name'
				value={title}
				onChange={ev => setTitle(ev.target.value)}
			></input>
			<label>Category</label>
			<select value={category} onChange={ev => setCategory(ev.target.value)}>
				<option value=''>Uncategorized</option>
				{categoriesList.length > 0
					? categoriesList.map(categoryItem => (
						<option key={categoryItem._id} value={categoryItem._id}>
							{categoryItem.name}
						</option>
					))
					: null}
			</select>
			<div className='pt-2'>
				{propertiesToFill.length > 0
					? propertiesToFill.map(p => (
						<div key={p.name} className='flex flex-row items-baseline gap-1'>
							<div className='flex'>
								<label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
							</div>
							<div className='flex'>
								<select
									value={productProperties[p.name]}
									onChange={ev => setProductProps(p.name, ev.target.value)}
								>
									<option value=''>Property value</option>
									{p.values.map(value => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
						</div>
					))
					: null}
			</div>

			<label>Images</label>
			<div className='flex gap-1 flex-row flex-wrap mb-3'>
				<label className='text-primary w-24 h-24 border flex items-center justify-center text-sm gap-1 rounded-sm bg-white border-primary shadow-sm cursor-pointer'>
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
				</label>
				{isUploading ? (
					<label className='w-24 h-24 border flex items-center justify-center text-sm gap-1 rounded-sm bg-gray-200'>
						<div className='activityIndicator'></div>
					</label>
				) : null}

				<SortableList
					onSortEnd={onSortEnd}
					className='list flex gap-1 flex-row flex-wrap'
					draggedItemClassName='dragged'
				>
					{image?.length > 0
						? image.map(item => (
							<SortableItem key={item}>
								<img
									className='w-24 min h-24 min-w-24 object-cover min-h-24 border rounded-sm bg-white cursor-grab active:cursor-grabbing'
									src={item}
									alt={'product image'}
									width={60}
									height={60}
								></img>
							</SortableItem>
						))
						: null}
				</SortableList>
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
