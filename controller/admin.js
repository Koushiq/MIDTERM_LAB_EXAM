var express 	= require('express');
var router 		= express.Router();

var user ={
    username:'',
    password:'',
    role:''
};


router.get('/', function(req, res){

    
});



router.get('/home', function(req, res){
    if(req.session.username!=null)
    {
        console.log("here");
        res.render('admin/home');
    }
    else
    {
        res.redirect('/login');
    }
 
    
});


module.exports = router;