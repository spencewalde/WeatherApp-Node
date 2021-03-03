const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// define paths for express config
const publicdir = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath= path.join(__dirname,'../templates/partials')

// setup handbars engine and views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


// setup static directory to serve
app.use(express.static(publicdir))


//page rendering
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Spencer Williams-Waldemar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Spencer Williams-Waldemar',
        age: 23,
        degree: 'Computer Science'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: 'We are sorry about your issues',
        title: 'Help',
        name: 'Spencer Williams-Waldemar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'no address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error })
        }
    
        
    
        forecast(longitude ,latitude, (error1, forecastdata) => {
            if(error){
                return res.send({error1})
            }
           
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
          })
    
    })
    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    
    res.send({
        products: []
    })
})






app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title: '404 Error',
        msg: 'Help Article Not Found',
        name: 'Spencer Williams-Waldemar'
    })
})

app.get('*', (req,res)=>{
    res.render('404error',{
        title: '404 Error',
        msg: 'Page Not Found',
        name: 'Spencer Williams-Waldemar'
    })
})


app.listen(3000, ()=>{

    console.log('server started')

})


