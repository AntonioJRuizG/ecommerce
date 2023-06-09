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
	const [properties, setProperties] = useState([]);
	const [invalidOption, setInvalidOption] = useState(false);
	const [invalidOptionMsg, setInvalidOptionMsg] = useState('');

	const invaliOptionList = {0: '', 1: 'Category and parent category cannot be the same.', 2: 'Category already exists. Change the name or choose edit option.', 3: 'An existing parent category has the same name of the edited category.'};

	const saveCategory = async ev => {
		ev.preventDefault();
		const data = {name, parentCategory, properties: properties.map(p => ({name: p.name, values: p.values.split(',')}))};
		const parentInCategoryList = categoriesList.find(
			object => object._id === parentCategory,
		);

		const categoryExists = categoriesList.some(object => object.name === name);

		if (name === parentInCategoryList?.name) {
			setInvalidOption(true);
			setInvalidOptionMsg(invaliOptionList[1]);
			return;
		}

		if (!editedCategory) {
			if (categoryExists) {
				setInvalidOption(true);
				setInvalidOptionMsg(invaliOptionList[2]);
				return;
			}

			await axios.post('/api/categories', data);
		}

		if (editedCategory) {
			if (editedCategory._id === parentCategory) {
				setInvalidOption(true);
				setInvalidOptionMsg(invaliOptionList[2]);
				return;
			}

			if (parentInCategoryList?.parent?.name
      === editedCategory.name
			) {
				setInvalidOption(true);
				setInvalidOptionMsg(invaliOptionList[3]);
				return;
			}

			data.id = editedCategory._id;
			await axios.put('/api/categories', data);
			setEditedCategory(null);
		}

		setName('');
		setParentCategory('');
		setProperties([]);
		fetchCategories();
		setInvalidOption(true);
		setInvalidOptionMsg(invaliOptionList[0]);
	};

	useEffect(() => {
		fetchCategories();
	}, []);
	function fetchCategories() {
		axios.get('/api/categories').then(result => {
			setCategoriesList(result.data);
		});
	}

	const editCategory = category => {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
		setProperties(
			category.properties.map(({name, values}) => ({
				name,
				values: values.join(','),
			})),
		);
	};

	const deleteCategory = async category => {
		const {_id} = category;
		await axios.delete('/api/categories?id=' + _id);
		setDeletedCategory(null);
		fetchCategories();
	};

	const addProperty = () => {
		setProperties(prev => [...prev, {name: '', values: ''}]);
	};

	const handlePropertyNameChange = (index, property, newName) => {
		setProperties(prev => {
			const properties = [...prev];
			properties[index].name = newName;
			return properties;
		});
	};

	const handlePropertyValuesChange = (index, property, newValue) => {
		setProperties(prev => {
			const properties = [...prev];
			properties[index].values = newValue;
			return properties;
		});
	};

	function removeProperty(indexToRemove) {
		setProperties(prev => [...prev].filter((p, pIndex) => pIndex !== indexToRemove));
	}

	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Edit category ${editedCategory.name}`
					: 'Add new category'}
			</label>

			<form onSubmit={saveCategory}>
				<div className='flex gap-1 mb-1'>
					<input
						className='mb-0'
						type='text'
						placeholder={'Category name'}
						onChange={ev => setName(ev.target.value)}
						value={name}
						required
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
				</div>
				{invalidOption ? (
					<div className='text-red-500 text-sm'>{invalidOptionMsg}</div>
				) : null}
				<div className='mb-2'>
					<label className='block'>Properties</label>
					<button
						className='btn-default my-2'
						type='button'
						onClick={addProperty}
					>
            Add new property
					</button>
					{properties.length > 0
						? properties.map((property, index) => (
							<div className='flex gap-1 items-center' key={index}>
								<div className='flex'>
									<input
										className='h-7 text-sm mb-1'
										type='text'
										placeholder='property name (example: color'
										value={property.name}
										onChange={ev =>
											handlePropertyNameChange(
												index,
												property,
												ev.target.value,
											)
										}
										required
									></input>
								</div>
								<div className='flex'>
									<input
										className='h-7 text-sm mb-0'
										type='text'
										placeholder='values, comma separated'
										value={property.values}
										onChange={ev =>
											handlePropertyValuesChange(
												index,
												property,
												ev.target.value,
											)
										}
										required
									></input>
								</div>
								<button
									className='btn-red text-sm h-7'
									type='button'
									onClick={() => removeProperty(index)}
								>
                    Remove
								</button>
							</div>
						))
						: null}
				</div>
				<div className='flex gap-2'>
					{editedCategory ? (
						<button
							className='btn-default'
							type='button'
							onClick={() => {
								setEditedCategory(null);
								setName('');
								setParentCategory('');
								setProperties([]);
							}}
						>
              Cancel
						</button>
					) : null}

					<button className='btn-primary py-1' type='submit'>
            Save
					</button>
				</div>
			</form>
			{!editedCategory && (
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
									<td>
										<div className='flex flex-row gap-1'>
											<button
												className='btn-secondary w-20'
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
										</div>
									</td>
								</tr>
							))
							: null}
					</tbody>
				</table>
			)}
		</Layout>
	);
}
