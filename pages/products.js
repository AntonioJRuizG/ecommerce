import Layout from "../components/Layout/Layout";
import Link from 'next/link'

export default function Products(){
  return <Layout>
    <Link className="bg-blue-900 py-1 px-2 rounded-md text-white" href={'/products/new'}>Add new product</Link>
  </Layout>
}