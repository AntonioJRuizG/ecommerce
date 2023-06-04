import mongoose, {Schema, model, models} from 'mongoose';

const productSchema = new Schema({
	title: {type: String, required: true},
	description: String,
	price: {type: Number, required: true},
	category: {type: mongoose.Types.ObjectId, ref: 'Category'},
	images: [{type: String}],
	properties: {type: Object},
});

productSchema.set('toJSON', {
	transform(_document, returnedObject) {
		returnedObject.id = returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject._id;
	},
});

export const Product = models.Product || model('Product', productSchema);
