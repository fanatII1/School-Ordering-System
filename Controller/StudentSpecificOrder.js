const OrderedStudentsModel = require('../Models/OrderedStudents');

//module that fetches a student's specific ordered from the database
//we find by name and email
exports.findSpecificOrder = async function(req, res){
    let {studentName} = req.body;
    await OrderedStudentsModel.find({
        studentName: studentName
    })
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