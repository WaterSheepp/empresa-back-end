'us strict'

var mongoose = require("mongoose")
var app = require("./app")


mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/NoSQL', {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connected');

    app.set('port',process.env.PORT || 3000)
    app.listen(app.get('port'), ()=>{
        console.log(`server running port... ${app.get('port')}`);
        
    })
    
}).catch(err => console.log(err))

