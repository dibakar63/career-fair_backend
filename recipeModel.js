const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const recipeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    time:{
        type:Number,required:true
    },
    category:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    
},{timestamps:true})
module.exports=mongoose.model('recipes',recipeSchema)