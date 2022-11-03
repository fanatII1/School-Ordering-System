const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
const authz = require('express-jwt-authz');
require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

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
    console.log('hi')
    res.send({adminMsg: 'admin'})
})


//Server listens on PORT 3001 or environment variable PORT
app.listen(PORT, ()=>{
    console.log(`listenting on port ${PORT}`)
})