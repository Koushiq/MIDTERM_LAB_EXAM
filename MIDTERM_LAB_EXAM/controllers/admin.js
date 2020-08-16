var express = require('express');
const { body, validationResult } = require('express-validator');
const { error } = require('console');
var admindb      = require.main.require('./models/admin');
var router = express.Router();

router.get('/', function(req, res){
    if(req.cookies['type'] == 'admin'){
        admindb.getAllEmp(function(result){
            console.log(result);
            res.render('admin/index',{emp:result});
        });
    }
    else{
        res.redirect('/employee');
    }
});

router.get('/addemployee', function(req, res){
    
    if(req.cookies['type'] == 'admin'){
        
        var value = {
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            gender: req.body.gender,
            designation: req.body.designation,
        };
        var valueCheck = [];
        var data ={
            value   : value,
            errors  : valueCheck
        }
        res.render('admin/addEmployee',data);
    }
    else{
        res.redirect('/employee');
    }
    
});
router.post('/addemployee', [
    body('name','Name required!').notEmpty(),
    body('username').notEmpty().withMessage('Username required!').isLength({min: 9}).withMessage('Username must be greater than 8 characters!'),
    body('password').notEmpty().withMessage('Password required!').isLength({min: 8}).withMessage('Password must be atleast 8 characters!').custom((value,{req}) => {
        if (value != req.body.cPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    body('phone').notEmpty().withMessage('Phone number required!').isNumeric().withMessage('Phone number must be numeric!').isLength({min: 11, max: 11}).withMessage('Phone number must be 11 characters!'),
    body('gender','Gender required!').notEmpty(),
], function(req, res){
    if(req.cookies['type'] == 'admin'){
        
        var value = {
            name: req.body.name,
            phone: req.body.phone,
            username: req.body.username,
            gender: req.body.gender,
            designation: req.body.designation,
            password:req.body.password
        };
        
        var valueCheck = [];

        validationResult(req).errors.forEach(error => {
            valueCheck.push(error.msg);
        });
        var data ={
            value   : value,
            errors  : valueCheck
        }
        if(valueCheck.length > 0){
            res.render('admin/addemployee',data);
        } else {
            admindb.addEmployee(value, function(result){
                console.log(result);
                res.redirect('/admin/');
            });
        }
    }
    else{
        res.redirect('/employee');
    }

});


router.get('/update/:id', function (req, res){
    
    if(req.cookies['type'] == 'admin'){
        id = req.params.id;

        admindb.getEmployee(id, function (result){
            var data = {
                name: result.name,
                phone: result.phone,
                gender: result.gender,
                designation: result.designation,
            };
            console.log(data);
            var valueCheck = [];

            res.render('admin/updateEmployee',{data, errors:valueCheck});
        });
    }  
    else{
        res.redirect('/employee');
    }
  
});

router.post('/update/:id',[
    body('name','Name required!').notEmpty(),
    body('phone').notEmpty().withMessage('Phone number required!').isNumeric().withMessage('Phone number must be numeric!').isLength({min: 11, max: 11}).withMessage('Phone number must be 11 characters!'),
    body('gender','Gender required!').notEmpty(),
], function (req, res){
    
    id= req.params.id;

    admindb.getEmployee(id, function (result){
        var data = {
            name: result.name,
            phone: result.phone,
            gender: result.gender,
            designation: result.designation,
        };
        
        var valueCheck = [];
    
        validationResult(req).errors.forEach(error => {
            valueCheck.push(error.msg);
        });

        if (valueCheck.length > 0){
            res.render('admin/updateEmployee',{data,errors: valueCheck});
        } else {
            admindb.updateEmployee(id, req.body.name, req.body.phone, req.body.gender, req.body.designation, function(result1){
                res.redirect('/admin/');
            });
        }
    });    
}); 


router.get('/delete/:id', function(req, res){

    id= req.params.id;

    admindb.getEmployee(id, function(result){
        
        res.render('admin/deleteEmp',{employee: result});
    });    
});

router.post('/delete/:id', function(req, res){

    id = req.params.id;
    if(req.body.submit="Yes"){
        console.log('yes');
        admindb.deleteEmp(id, function(){
            res.redirect('/admin/');
        });
    }
});

module.exports = router;