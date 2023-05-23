import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductForm({id, ...props}) {
  const router = useRouter();
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [price, setPrice] = useState(props.price || '');

  const [goBack, setGoBack] = useState(false);

  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };

    if(id){
      await axios.put('/api/products', {id, ...data});
    } else{
      await axios.post('/api/products', data);
      setGoBack(true);
    }
    
  };

  if (goBack) router.push('/products');

  return (
    <form onSubmit={createProduct}>
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
  );
}
