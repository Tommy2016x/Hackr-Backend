const router = require('express').Router();

const {signUp,login,updateValue} = require('../../services/user');

router.post('/signup',async (req,res) => {
  const {email,password,username} = req.body;

  try{
    const token = await signUp(email,password,username);

    res.send(token);
    
  } catch(err){
    throw err;
  }
})

router.post('/login', async (req,res) => {
  const {email,password} = req.body;

  try{
    const token = await login(email,password);

    res.send(token);

  } catch(err){
    throw err
  }
})

router.patch('/updateOne',async (req,res) => {
  const {id,param,value} = req.body;

  try{
    await updateValue(id,param,value);

    res.send('succesfully updated')
  }catch(err){
    res.send('something went wrong')
  }
})
module.exports = router;