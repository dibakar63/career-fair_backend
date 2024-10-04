const mongoose=require('mongoose');

const connectDb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://dibakardey63:20Rx2Mx69vSKzNaZ@recipes.rglhoml.mongodb.net/recipe_mern')
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDb
