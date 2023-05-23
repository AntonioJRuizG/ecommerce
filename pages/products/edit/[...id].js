import ProductForm from "@/components/Form/ProductForm";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function EditProduct(){
  const router = useRouter();
  const {id} = router.query;
  const [product, setProduct] = useState(null)
 
  useEffect(() => {
    if(!id) return
      axios.get('/api/products?id='+id).then(response => {
        setProduct(response.data)
      });
 }, [id]);
 
  return (
    <Layout>
      <h1 className='text-blue-900 mb-2 text-xl'>Edit Product</h1>
      {product ? (<ProductForm {...product}></ProductForm>) : null}
    </Layout>
  );
}