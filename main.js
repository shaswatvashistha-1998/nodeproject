const express = require("express");
const { Sequelize } = require("sequelize");
const md5=require("md5")
const jwt = require("jsonwebtoken")
const app = express();
const PORT=3000;
const {db, blogs} = require ('./models/index');
var Buffer = require('buffer/').Buffer


app.use(express.json());
app.use(express.urlencoded());

// const init = async () => {
//     await db.sync({force: true}) 
//   };
//   init();

app.post("/auth/signup",async function (request, response) {
  const { body }=request;
  const pushingdata=await blogs.create({
    name:body.name,
    password:md5(body.password),
    email:body.email
  })
  const user = {
    name: body.name,
    email: body.email
}
  jwt.sign({ user }, 'secretkey', (err, reqtoken) => {
    if (err) {
        response.sendStatus(403)
    }
    else {
        response.send({ token: reqtoken })
    }
})
});

app.delete("/blogs/:id",verifytoken,async function(request,response){
  const { id }=request.params;
  jwt.verify(request.token, 'secretkey',async (err,reqtoken ) => {
    const value=request.token
    if (value) {
      console.log(id)
      let payload= parseJwt(value);
      const name=payload.user.name;
      const user = await blogs.findOne({ where: { name } });
      console.log(user)
      user.blogs1=body.blog
      await user.save()
    }
    else {
        response.send(err)
     }
  });
  
});


app.get("/blogs",async (request,response)=>{
  const blogs=await blogs.findall({})
  response.send(blogs.blogs1);
})


app.post("/blogs",verifytoken,async function(request,response){
  const { body }=request;
  jwt.verify(request.token, 'secretkey',async (err,reqtoken ) => {
    const value=request.token
    if (value) {
      let payload= parseJwt(value);
      const name=(payload.user.name);
      console.log(name)
      const user = await blogs.findOne({ where: { name } });
      await blogs.create({
        name:user.name,
        blogs1:body.blog
      })
    }
    else {
        response.send(err)
     }
  });
});

app.post("/AUTH/LOGIN", async function (request, response) {
  const { body } = request;
  const email=body.email;
  const password=body.password;
  const user = await blogs.findOne({ where: { email } });
  const users = {
    name: user.name,
    email: email
}
  if (!user || user.password != md5(password)) {
    response
      .status(401)
      .send({ message: "Either username or password is incorrect" });
  }
else{
  jwt.sign({ users }, 'secretkey', (err, reqtoken) => {
    if (err) {
        response.sendStatus(403)
    }
    else {
        response.send({ token: reqtoken })
    }
})
}
});
app.listen(3000,()=>console.log('server is listening'));

function verifytoken(request, response, next) {
  const acctoken = request.headers["authorization"];
  request.token = acctoken;
  next();
}
function parseJwt(token) {
  var base64Payload = token.split('.')[1];
  var payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}