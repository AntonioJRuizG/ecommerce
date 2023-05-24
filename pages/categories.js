import Layout from '@/components/Layout/Layout';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function Categories() {
	const [name, setName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [categoriesList, setCategoriesList] = useState([]);
	const saveCategory = async ev => {
		ev.preventDefault();
		await axios.post('/api/categories', {name, parentCategory});
		setName('');
	};

	useEffect(() => {
		axios
			.get('/api/categories')
			.then(response => {
				setCategoriesList(response.data);
			});
	}, [name]);

	return (
		<Layout>
			<h1>Categories</h1>
			<label>New category name</label>
			<form onSubmit={saveCategory} className='flex gap-1'>
				<input
					className='mb-0'
					type='text'
					placeholder={'Category name'}
					onChange={ev => setName(ev.target.value)}
					value={name}
				></input>
				<select
					className='mb-0'
					onChange={ev => setParentCategory(ev.target.value)}
					value={parentCategory}
				>
					<option value=''>No parent category</option>
					{categoriesList.length > 0
						? categoriesList.map(category => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))
						: null}
				</select>
				<button className='btn-primary py-1' type='submit'>
          Save
				</button>
			</form>
			<table className='basic mt-2'>
				<thead>
					<tr>
						<td>Category name</td>
						<td>Parent category</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{categoriesList.length > 0
						? categoriesList.map(category => (
							<tr key={category._id}>
								<td>{category.name}</td>
								<td>{category.parent?.name}</td>
								<td className='flex flex-row gap-1'>
									<button className='btn-primary'>Edit</button>
									<button className='btn-primary'>Delete</button>
								</td>
							</tr>
						))
						: null}
				</tbody>
			</table>
		</Layout>
	);
}
