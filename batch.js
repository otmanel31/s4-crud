const mongoose = require('mongoose')
const Stat = require('./model')
const db = mongoose.connection
mongoose.connect('mongodb://localhost/test')

db.on('error', console.error.bind('connection error'))
db.on('open', function(){
    console.log('connected to db')
})


function script(){
    array.forEach((elt)=>{
        if (elt.statu === 'new'){
            elt.statu = 'proceceed'
            elt.point = [{x:1,y1}, {x:5,y:9}]
            console.log('my elt ', elt)
        }
    })
}

Stat.updateMany({statu: 'new'}, {$set:{statu:'proceceed'}},function(err){
    console.log(err)
    process.exit()
})

