import {mongooseConnect} from '../../lib/mongoose';
import {Product} from '../../models/product';
import {isAdminRequest} from './auth/[...nextauth]';

export default async function handler(req, res) {
	const {method} = req;
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (method === 'GET') {
		if (req.query?.id) {
			res.json(await Product.findById(req.query.id));
		} else {
			res.json(await Product.find());
		}
	}

	if (method === 'POST') {
		const {...props} = req.body;
		const productDoc = await Product.create({
			...props,
		});
		res.json(productDoc);
	}

	if (method === 'PUT') {
		const {id, category, ...props} = req.body;
		const productDoc = await Product.findByIdAndUpdate({_id: id},
			{category: category || null, ...props},
		);
		res.json(productDoc);
	}

	if (method === 'DELETE') {
		const {id} = req.query;
		if (id) {
			await Product.findByIdAndDelete(id);
			res.json(true);
		}
	}
}
