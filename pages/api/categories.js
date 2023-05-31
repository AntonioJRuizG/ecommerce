import {Category} from '@/models/category';

export default async function handle(req, res) {
	const {method} = req;

	if (method === 'POST') {
		const {name, parentCategory} = req.body;
		const parent = parentCategory ? parentCategory : null;
		const categoryDoc = await Category.create({name, parent});
		res.json(categoryDoc);
	}

	if (method === 'GET') {
		res.json(await Category.find().populate('parent'));
	}

	if (method === 'PUT') {
		const {id, name, parentCategory} = req.body;
		const categoryDoc = await Category.findByIdAndUpdate(
			{_id: id},
			{
				name,
				parent: parentCategory,
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
