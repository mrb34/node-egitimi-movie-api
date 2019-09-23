const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const MovieSchema=new Schema({
    direction_id:Schema.Types.ObjectID,
    title:{
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    date:{
        type: Date,
        default:Date.now
    }


});
module.exports=mongoose.model('movie',MovieSchema)