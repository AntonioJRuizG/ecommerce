import Layout from '@/components/Layout/Layout'
import React, { useState } from 'react';
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

export default function New () {
const router = useRouter()
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');

const [goBack, setGoBack] = useState(false)

const createProduct = async (ev) =>{
  ev.preventDefault();
  const data = {title, description, price}
  await axios.post('/api/products', data)
  setGoBack(true)
}

if(goBack) router.push('/products');

return (
  <Layout>
    <form onSubmit={createProduct}>
      <h1 className='text-blue-900 mb-2 text-xl'>New Product</h1>
      <label>Product name</label>
      <input
        type='text'
        placeholder='product name'
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      ></input>
      <label>Description</label>
      <textarea
        placeholder='description'
        className='max-h-52'
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price (in €)</label>
      <input
        type='text'
        placeholder='price'
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      ></input>
      <button type='submit' className='btn-primary'>
        Save
      </button>
    </form>
  </Layout>
);
}
