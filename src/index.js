const express = require('express')
const morgan = require('morgan')
const path = require('path')

//database
const products = [
    {id:1,name:"Francis Myers"},
    {id:2,name:"Mitchell Peterson"}
]

const app = express()
//setings
app.set('port',process.env.PORT || 3000)

//midlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.get('/products', (req,res)=>{
    res.json(products)
})
app.post('/products', (req,res)=>{
    console.log(req.body)
    const {name} = req.body
    products.push({
        id:products.length + 1,
        name
    })
    res.json("datos recibidos")
})
app.put('/products/:id',(req,res)=>{
    console.log(req.params,req.body);
    products.forEach((element,i) =>{
        if(element.id ==  req.params.id){
            products[i] = req.body
        }
    })
})
app.delete('/products/:id',(req,res)=>{
    console.log(req.params);
    console.log(req.params);
    products.forEach((element,i) =>{
        if(element.id ==  req.params.id){
            products = products.splice(i,1)
        }
    })
})

app.use(express.static(path.join(__dirname,'/public')))
app.listen(app.get('port'),()=>{
    console.log(`port on ${app.get('port')}`)
})