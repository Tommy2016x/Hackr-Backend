const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../../models/Users');

//create user
const signUp = async (email,password,username) => {
    try{
        let user = await User.findOne({
            email:email
        });

        console.log(user)

        if(user)
            return null

        let user1 = await User.findOne({
                username:username
        });

        console.log(user1)

        if(user1)
            return null;

        const hashedPass = bcrypt.hashSync(password);
        
        const newUser = await User.create({
            email,
            password: hashedPass,
            username,
            profile:{photos:[],bio: null,skills:[]},
            matches:[],
            location: {latitude: null,longitude: null}
        });

        await newUser.save();

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
        
        return jwt.sign({
            email,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');

    } catch(err){
        return null;
    }
   
}
//Authenticate user
const login = async (name,password) => {
    try{
        let testuser = await User.findOne({
            email: name
        });

        let testuser2 = await User.findOne({
            username: name
        })

        if(!testuser && !testuser2)
            return null
        
        let user;

        testuser ? user = testuser : user = testuser2;

        const correctPass = bcrypt.compareSync(password,user.password);

        if(!user || !correctPass)
            return null;
        
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
        
        let id = user.id;

        return jwt.sign({
            id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');

    } catch(err){
        return null;
    }
}

//update a value in the User schema
const updateValue = async (id,param,value) => {
    try{
        await User.update({_id:id},{$set: {[param]: value}});

    }catch(err){
        console.log(err)
    }
}


module.exports =  {signUp,login,updateValue};