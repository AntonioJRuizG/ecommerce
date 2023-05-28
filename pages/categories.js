import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Modal/Modal';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function Categories() {
	const [name, setName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [categoriesList, setCategoriesList] = useState([]);
	const [editedCategory, setEditedCategory] = useState(null);
	const [deletedCategory, setDeletedCategory] = useState(null);

	const saveCategory = async ev => {
		ev.preventDefault();
		const data = {name, parentCategory};

		if (editedCategory) {
			data.id = editedCategory._id;
			await axios.put('/api/categories', data);
			setEditedCategory(null);
		}

		if (!editedCategory) {
			await axios.post('/api/categories', data);
		}

		setName('');
		setParentCategory('');
	};

	useEffect(() => {
		axios.get('/api/categories').then(response => {
			setCategoriesList(response.data);
		});
	}, [name, deletedCategory]);

	const editCategory = category => {
		setEditedCategory(category);
		setName(category.name);
		console.log(category.parent?._id);
		setParentCategory(category.parent?._id);
	};

	const deleteCategory = async category => {
		const {_id} = category;
		await axios.delete('/api/categories?id=' + _id);
		setDeletedCategory(null);
	};

	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Edit category ${editedCategory.name}`
					: 'Add new category'}
			</label>

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
							<option key={category._id} value={category._id}>
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
									<button
										className='btn-primary'
										onClick={() => {
											editCategory(category);
										}}
									>
                      Edit
									</button>
									<Modal
										category={category}
										setDeletedCategory={setDeletedCategory}
										deleteCategory={deleteCategory}
										deletedCategory={deletedCategory}
									></Modal>
								</td>
							</tr>
						))
						: null}
				</tbody>
			</table>
		</Layout>
	);
}

