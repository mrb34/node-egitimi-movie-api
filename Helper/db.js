const mongoose=require('mongoose');
module.exports=()=>{
    mongoose.connect('mongodb://movieApiUser:MXG750v8040@ds351987.mlab.com:51987/heroku_rntck724',{ useNewUrlParser: true });

    mongoose.connection.on('open',()=>{
    console.log("MongoDB:Connected");
    });
    mongoose.connection.on('error',(err)=>{
        console.log("MongoDB:Error",err);
    });
};


// mongoose.connect('mongodb://localhost/MovieApi',{ useNewUrlParser: true });
//mongodb atlas
//  mongoose.connect('mongodb+srv://movieApiUser:MXG750v8040@movieapi-tt5l3.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });

//mongodb+srv://<username>:<password>@movieapi-tt5l3.mongodb.net/test?retryWrites=true&w=majority
//mlab bağlantı stringi
//  mongodb://<dbuser>:<dbpassword>@ds351987.mlab.com:51987/heroku_rntck724
