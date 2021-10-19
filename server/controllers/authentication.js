const User = require('../models/users');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat:timestamp},config.secret);
}



exports.signin= function(req,res,next){
    res.send({ 
        user:{
            _id:req.user._id,
            name:req.user.name,
            token : tokenForUser(req.user)
        }
    });
}

exports.signup = function(req,res,next){
    
    const name= req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const user ={
        name:name,
        email:email,
        password:password
    }

     //empty field check
     const allFieldsFilledIn = Object.keys(user).every((key) => !!user[key]);
     if(! allFieldsFilledIn){
         return  res.send({"error":'**All field required to filled in'});
     }
 

     //valid email check 

    const atposition=email.indexOf("@");  
    const dotposition=email.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
           return res.send({"error":"**please enter a valid email address"});
    }
  
    
    //password check
 
    if(password.length <6){
        return  res.send({"error":'**password should not be less than 6 characters'});
    }

    // see if a user with this email exists
   
    User.findOne({email:email}, function (err,existingUser) { 

        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }
        //If a user with email does exist, return a error

        if(existingUser){
           return res.send({"error":'**Email already in use'});
        }

        //If a user eith email does not exists , create a new user

        User.create(user,function(err,user){
            if(err){
                return res.send({ "error":"**Oopps..something went wrong, please try again"});
            }

            //Respond to request indicating user is created
            res.send({
                user: {
                    _id:user._id,
                    name: user.name,
                    token:tokenForUser(user)
                }
            });
        })
     });


}