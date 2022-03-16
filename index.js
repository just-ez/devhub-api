

const Joi = require('joi')
const express = require('express')
const app = express()
const users = require('./app.js')
// const testimonials = require('./testimonial.js')

app.use(express.json())


app.get('/',(req,res)=>{
    res.send(users)
    console.log('ok!');
})
app.get('/api/user',(req,res)=>{
    res.send(users[0])
    console.log('ok!');
})

app.get('/api/user/:id',(req,res)=>{
     const user = users[0].find(c => c.id === parseInt(req.params.id))
     if(!users) res.status(404).send('user with id not found')
     res.send(user)
})
app.get('/api/testimonial/:id',(req,res)=>{
     const testimonial = users[1].find(c => c.id === parseInt(req.params.id))
     if(!testimonial) res.status(404).send('user with id not found')
     res.send(testimonial)
})



app.post('/api/user',(req,res)=>{
  
    const {error} = validateUser(req.body)
    console.log(error);
    if (error){
        res.status(400) 
        console.log(`not up to 3!`);
    }
    const user = {
        id: users[0].length + 1,
        name: req.body.name,
        email: req.body.email
    }
    users[0].push(user)
    res.send(user)
    
})
app.post('/api/testimonial',(req,res)=>{
  
    const {error} = validateUser(req.body)
    console.log(error);
    if (error){
        res.status(400) 
        console.log(`not up to 3!`);
    }
    const user = {
        id: users[1].length + 1,
        name: req.body.name,
        text: req.body.text,
        img: req.body.img
    }
    users[1].push(user)
    res.send(user)
    
})

app.put('/api/user/:id', (req,res)=>{
 const user = users.find(c => c.id === parseInt(req.params.id))
 if(!user) res.status(404).send('user with id not found')

//  const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     email: Joi.string().min(6).email(),
//     password: Joi.string().min(6).required()
// })npm 

const {error} = validateUser(req.body)
console.log(error);
if (error){
    res.status(400) 
    console.log(`not up to 3!`);
}

user.name = req.body.name
 res.send(user)
})

function validateUser(user) {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).email(),
        text: Joi.string(),
        img: Joi.string()
        // password: Joi.string().min(6).required()
    })
    
  return schema.validate(user)
}



const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`listening on port ${port}...`)
    console.log(users[1])
})