import {Category} from '@/models/category';
import {isAdminRequest} from './auth/[...nextauth]';
import {mongooseConnect} from '@/lib/mongoose';

export default async function handle(req, res) {
	const {method} = req;
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (method === 'GET') {
		res.json(await Category.find().populate('parent'));
	}

	if (method === 'POST') {
		const {name, parentCategory, properties} = req.body;
		const categoryDoc = await Category.create({name, parent: parentCategory || undefined, properties});
		res.json(categoryDoc);
	}

	if (method === 'PUT') {
		const {id, name, parentCategory, properties} = req.body;
		const categoryDoc = await Category.findByIdAndUpdate(
			{_id: id},
			{
				parent: parentCategory || undefined,
				properties,
				name,
			},
		);
		res.json(categoryDoc);
	}

	if (method === 'DELETE') {
		const {id} = req.query;
		if (id) {
			await Category.findByIdAndDelete(id);
			res.json(true);
		}
	}
}
