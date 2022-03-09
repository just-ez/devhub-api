const Joi = require('joi')
const express = require('express')
const app = express()
const users = require('./index.js')
const testimonials = require('./testimonial.js')

app.use(express.json())


app.get('/api/users',(req,res)=>{
    res.send('worked!')
    console.log('ok!');
})

app.get('/api/user/:id',(req,res)=>{
     const user = users.find(c => c.id === parseInt(req.params.id))
     if(!users) res.status(404).send('user with id not found')
     res.send(user)
})
app.get('/api/testimonial/:id',(req,res)=>{
     const testimonial = testimonials.find(c => c.id === parseInt(req.params.id))
     if(!testimonial) res.status(404).send('user with id not found')
     res.send(testimonial)
})


app.post('/api/users',(req,res)=>{
  
    const {error} = validateUser(req.body)
    console.log(error);
    if (error){
        res.status(400) 
        console.log(`not up to 3!`);
    }
    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user)
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
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user)
    res.send(user)
    
})

app.put('/api/user/:id', (req,res)=>{
 const user = users.find(c => c.id === parseInt(req.params.id))
 if(!user) res.status(404).send('user with id not found')

 const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required()
})
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
        // email: Joi.string().min(6).email(),
        // password: Joi.string().min(6).required()
    })
    
  return schema.validate(user)
}



const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`listening on port ${port}...`))