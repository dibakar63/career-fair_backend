const authHelper = require( "./helper.js");
const userModel =require( "./model.js");

 const JWT=require ( 'jsonwebtoken');
 
 
 const registerController=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    //validations
    if(!name){
        return res.send({message:'Name is Required'})
    }
    if(!email){
        return res.send({message:'Email is Required'})
    }
    if(!password){
        return res.send({message:'Password is Required'})
    }
    
    //existing user
    const existingUser=await userModel.findOne({email})
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already register please login"
        })
    }
    //register user
    const hashedPassword=await authHelper.hashPassword(password)
    //save
    const user=await new userModel({name,email,password:hashedPassword}).save()
    res.status(201).send({
        success:true,
        message:"User register successfully",
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,message:'Error in Registration',
        error
    })
  }
}


//login\\post
 const loginController=async(req,res)=>{
   try {
    const {email,password}=req.body
    //validation
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Invalid email or password"
        })
    }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid email"
            })
        }
        const match=await authHelper.comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Password incorrect"
            })

        }
        //token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },token
        })

     
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in login",error
    })
   }
}
const testController=(req,res)=>{
    res.send('protedted route')
}

module.exports.registerController=registerController;
module.exports.loginController=loginController;