const OrderedStudentsModel = require('../Models/OrderedStudents');

exports.saveStudentOrder = async function(req, res){
    let {name, order} = req.body;
    let studentDetails = new OrderedStudentsModel({
        studentName: name,
        studentOrder: order
    });

    await studentDetails.save()
    .then((response)=> res.status(200).send({saveMsg: 'successfully ordered'}))
    .catch((error)=>{
        console.log(error)
        res.status(500).send({saveMsg: 'server internal error: could not place order'})
    })
}