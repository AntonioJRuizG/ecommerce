import Layout from '../../components/Layout/Layout';
import ProductForm from '../../components/Form/ProductForm';
import React from 'react';

export default function New() {
	return (
		<Layout>
			<h1 className='text-gray-200 mb-2 text-xl'>New Product</h1>
			<ProductForm></ProductForm>
		</Layout>
	);
}
