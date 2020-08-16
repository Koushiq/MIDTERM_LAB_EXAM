var express 	= require('express');
var router 		= express.Router();
var allusermodel = require.main.require("./models/alluser");
var user ={
    username:'',
    password:'',
    role:''
};

router.get('/', function(req, res){

    console.log("here");
    res.render('login');
    
});


router.post('/', function(req, res)
{
    user.username=req.body.username;
    user.password=req.body.password;
    allusermodel.validate(user,(result)=>{
        if(result.length==1)
        {
            req.session.username=user.username;
            user.role=result[0].role;
            if(user.role=="admin")
            {
                res.redirect("/admin/home");
            }
        }
        else
        {
            res.redirect("/login");
        }
    });
});

module.exports = router;