const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../../models/Users');

//create user
const signUp = async (email,password,username) => {
    try{
        let user = await User.findOne({
            email:email
        });

        if(user)
            return null

        user = await User.findOne({
                usernmae:usernmae
        });

        if(user)
            return null;

        const hashedPass = bcrypt.hashSync(password);
        
        const newUser = await User.create({
            email,
            password: hashedPass,
            username,
            profile:{photos:[],bio: null,skills:[]},
            matches:[],
            hackathon: null,
            team: null

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
const login = async (email,password) => {
    try{
        const user = await User.findOne({
            email
        });

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


module.exports =  {signUp,login};