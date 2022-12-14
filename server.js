const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
const authz = require('express-jwt-authz');
const mongoose = require('mongoose')
require('dotenv').config()
const saveOrderedStudent = require('./Controller/OrderedStudentsSave');
const findOrderedStudents = require('./Controller/FindOrderedStudents');
const findSpecificOrder = require('./Controller/StudentSpecificOrder');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

//connect to mongodb
let uri = 'mongodb+srv://George:GeorginhoSchool7@school-food-ordering-cl.h3slfex.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
.then(() => console.log('connected'))
.catch(() => console.log('not connected'))

//middlware to validate JWT
const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
async function getSecret(){
    const client = jwksRsa({
        jwksUri: `https://${domain}/.well-known/jwks.json`
    })
    const kid = 'cw6RS_j3VkXN_HG66cLNw';
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    return signingKey
}

const authorizationAccessToken = jwt({
    secret: getSecret(),
    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ['RS256']
})

//middleware that checks the scopes(permissions) of the accessToken
const checkPermissions = authz(['read:admin'], {
    customScopeKey: 'permissions',
    customUserKey: 'auth'
})

//handle requests to validate user token, check roles/permission(scopes)
app.get('/AdminDashboard', authorizationAccessToken, checkPermissions, (req, res)=>{
    res.send({adminMsg: 'admin'})
})

//capture payment by checking payment token
app.post('/Payment', async (req, res)=>{
    let {token, totalAmountInCents} = req.body;
    
    //request to capture payments on yoco
    await fetch('https://online.yoco.com/v1/charges/',{
        method: 'POST',
        headers: {
            'X-Auth-Secret-Key': 'sk_test_960bfde0VBrLlpK098e4ffeb53e1',
            "Content-Type": "application/json", 
        },
        body:  JSON.stringify({
            token: token,
            amountInCents: totalAmountInCents,
            currency: 'ZAR',
        })
    })
    .then((res)=> res.json() )
    .then((response)=>{
        if(response.errorType){
            res.status(401).send({error: 'Oops, seems that there was a problem in the payment'})
        }
        else{
            res.send({msg: 'Payment was a success'})   
        }
    })
    .catch((error)=> console.log(`the error: ${error}`))
})


//request to save Paid/Ordered Students to the database
app.post('/PaidStudents', (req, res)=>{
    saveOrderedStudent.saveStudentOrder(req, res)
})

/* Request to fetch all paid students from the database */
app.get('/PlacedOrders', (req, res)=>{
    findOrderedStudents.findOrderedStudents(req, res)
})

/*request to find student specific order from db*/
app.post('/ProfileOrders', (req, res)=>{
    findSpecificOrder.findSpecificOrder(req, res)
})


app.use(express.static('frontend/school-food-ordering-system/build'))
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend/school-food-ordering-system', 'build', 'index.html'))
})

//Server listens on PORT 3001 or environment variable PORT
app.listen(PORT, ()=>{
    console.log(`listenting on port ${PORT}`)
})