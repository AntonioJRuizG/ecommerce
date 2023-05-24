import ProductForm from "@/components/Form/ProductForm";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function DeleteProduct(){
  const [product, setProduct] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  useEffect (()=>{
    if (!id) return
    axios.get('/api/products?id='+id).then( response =>
      setProduct(response.data)
    )
  },[id])

  const deleteProduct = async () =>{
    if (!id) return;
    await axios
      .delete('/api/products?id=' + id)
      .then(() => setDeleted(true));
  }

  const goBack = () =>{
    router.push('/products')
  }
 
  return (
    <Layout>
      {deleted ? (
        <>
          <h1 className='text-center'>
            Product <span className='italic'>{product?.title}</span> deleted.
          </h1>
          <div className='flex gap-3 mt-2 justify-center'>
            <button className='btn-primary' onClick={goBack}>
              Go back to products
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className='text-center'>
            Do you really want to delete{' '}
            <span className='italic'>{product?.title}</span> ?
          </h1>
          <div className='flex gap-3 mt-2 justify-center'>
            <button className='btn-red' onClick={deleteProduct}>
              Yes
            </button>
            <button className='btn-primary' onClick={goBack}>
              No
            </button>
          </div>{' '}
        </>
      )}
    </Layout>
  );
}