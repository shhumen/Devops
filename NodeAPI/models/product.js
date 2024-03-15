const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:  { type: String, required: true, unique: true },
    description:  { type: String, required: false },
    categoryId:   { type: mongoose.Types.ObjectId, required: false, ref: 'Category' },
    unitsInStock: { type: Number, required: false },
    unitPrice:    { type: Number, required: false },
    createdDate:  {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collection: 'Products' });

module.exports = mongoose.model('Product', productSchema);
