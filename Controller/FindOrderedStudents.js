const OrderedStudentsModel = require('../Models/OrderedStudents');

//module that fetches ALL students who ordered from the database
exports.findOrderedStudents = async function(req, res){
    await OrderedStudentsModel.find()
    .then((data) =>{
        //if there are no students found, send messages that there' no paid students, else: send paid students
        if(typeof data[0] === 'undefined'){
            res.status(200).send({responseMsg: 'no paid students so far'})
        }
        else{
            res.status(200).send(data)
        }
    })
    .catch((error) => console.log(error))
}