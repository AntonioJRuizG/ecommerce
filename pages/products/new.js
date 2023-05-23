import Layout from '@/components/Layout/Layout'
import React from 'react';
import ProductForm from '@/components/Form/ProductForm';

export default function New () {
return (
  <Layout>
    <h1 className='text-blue-900 mb-2 text-xl'>New Product</h1>
    <ProductForm></ProductForm>
  </Layout>
);
}
