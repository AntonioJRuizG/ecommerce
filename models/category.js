const {Schema, model, models} = require('mongoose');

const categorySchema = new Schema({
	name: {type: String, required: true},
});

categorySchema.set('toJSON', {
	transform(_document, returnedObject) {
		returnedObject.id = returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject._id;
	},
});

export const Category = models?.Category || model('Category', categorySchema);
