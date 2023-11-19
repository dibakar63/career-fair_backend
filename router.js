const router=require('express').Router();
const authController=require('./controller')
const recipe=require('./recipeController')

router.post('/register',authController.registerController)
router.post('/add',recipe.addRecipes)
router.get('/recipe',recipe.getAllRecipes)
router.get('/recipe/:id',recipe.getById);
router.put('/update/:id',recipe.updateRecipe)
router.delete('/:id',recipe.deleteRecipe)
router.post('/login',authController.loginController)


module.exports=router;