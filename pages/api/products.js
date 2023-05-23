import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/product';

export default async function handler(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    req.query?.id ?
      res.json(await Product.findById({id: req.query.id})) : res.json(await Product.find())
  }

  if(method === 'POST') {
    const {...props} = req.body;
    const productDoc = await Product.create({
      ...props
    })    
    res.json(productDoc);
  }
}
