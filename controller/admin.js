var express 	= require('express');
var router 		= express.Router();
var alluserModule = require.main.require("./models/alluser");



router.get('/', function(req, res){

    res.redirect("/login");
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
router.get('/addemployee', function(req, res){
    if(req.session.username!=null)
    {
        console.log("here");
        res.render('admin/addemployee');
    }
    else
    {
        res.redirect('/login');
    }
 
    
});


router.post('/addemployee', function(req, res){

   
    if(req.session.username!=null)
    {
        var user = {
            username:req.body.username,
            password:req.body.password,
            employeename:req.body.employeename,
            contact:req.body.contact
        }
        alluserModule.insert(user,(status)=>{
            if(status)
            {
                res.redirect('/admin/home');
            }
            else
            {
                res.redirect('/admin/addemployee');
            }

        });
    }
    else
    {
        res.redirect("/login");
    }
 
    
});
module.exports = router;