import {Category} from '@/models/category';

export default async function handle(req, res) {
	const {method} = req;

	if (method === 'POST') {
		const {name, parentCategory} = req.body;
		const categoryDoc = await Category.create({name, parent: parentCategory});
		res.json(categoryDoc);
	}

	if (method === 'GET') {
		res.json(await Category.find().populate('parent'));
	}
}
