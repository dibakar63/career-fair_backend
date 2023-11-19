const recipeModel=require('./recipeModel')

const getAllRecipes = async (req, res, next) => {
  let recipes;
  try {
    recipes = await recipeModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!recipes) {
    return res.status(404).json({ message: 'No Recipes found' });
  }
  return res.status(200).json({ recipes })
}

const addRecipes = async (req, res, next) => {
  const recipe = new recipeModel({
    name: req.body.name,
    image: req.body.image,
    time: req.body.time,
    category: req.body.category,
    ingredients: req.body.ingredients,
    
  })
  try{
    const newRecipe = await recipe.save()
    res.status(201).json(newRecipe)
  } catch (error) {
    res.status(400).json({ message: 'Unable to Add' })
  }


};
const getById=async(req,res,next)=>{
  const id=req.params.id;
  let recipe;
  try {
    recipe=await recipeModel.findById(id)
  } catch (error) {
    console.log(error)
  }
  if(!recipe){
    return res.status(500).json({message:'Recipe not Found'})
  }
  return res.status(200).json({recipe,message:"recipeModel Found"})
}
const updateRecipe=async(req,res,next)=>{
  //let id=req.params.id;
  let id=req.params.id;
  let recipe;
  try {
      const {name,image,time,ingredients,category}=req.body;
      let nwrecipe=await recipeModel.findByIdAndUpdate(id,{name,image,time,ingredients,category})
      recipe=await nwrecipe.save()
      if(!recipe){
          res.status(500).send({
              success:false,
              message:"recipe is not updated",
  
          })
      }
      res.status(200).send({
          success:true,
          message:"Recipe updated",
          recipe
      }) 
  } catch (error) {
      console.log(error)
  }
}
const deleteRecipe=async(req,res,next)=>{
    let id=req.params.id;
    let recipe;
    try {
        recipe=await recipeModel.findByIdAndDelete(id)
        if(!recipe){
            res.status(500).send({
                success:false,
                message:"no recipe found with this id",
    
            })
        }
        res.status(200).send({
            success:true,
            message:"Recipe Deleted",
            recipe
        })

        
    } catch (error) {
       console.log(error) 
    }
    
}

exports.getAllRecipes = getAllRecipes;
exports.addRecipes = addRecipes;
exports.updateRecipe=updateRecipe;
exports.deleteRecipe=deleteRecipe;
exports.getById=getById;