const mongoose = require('mongoose');

/*Model-Schema that represents data of students who ordered, and the items they ordered*/
const OrderedStudentsSchema = mongoose.Schema({
    studentName: String,
    studentOrder: Object
}, {collection: 'Ordered Students'})

module.exports = mongoose.model('OrderedStudentsModel', OrderedStudentsSchema)