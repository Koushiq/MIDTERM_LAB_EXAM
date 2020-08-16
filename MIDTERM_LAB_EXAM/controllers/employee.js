var express = require('express');
var employeedb = require.main.require('./models/employee');
var router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res){
    var search = req.query.search;
    employeedb.getProdList(search, function (result){
        res.render('employee/index',{products: result});
    });
});
module.exports = router;
router.get('/addproduct', function(req, res){
    var value = {
        name: req.body.name,
        quantity: 0,
        price: 0,
    };
    var valueCheck = [];

    res.render('employee/addproduct',{val:value, errors:valueCheck});
});

router.post('/addproduct', [
    body('name','Name required!').notEmpty(),
    body('quantity').notEmpty().withMessage('Quantity required!').isNumeric().withMessage('Quantity must be numeric!'),
    body('price').notEmpty().withMessage('Price required!').isNumeric().withMessage('Price must be numeric!'),
], function(req, res){
    
    var value= {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
    };
    
    var valueCheck = [];

    validationResult(req).errors.forEach(error => {
        valueCheck.push(error.msg);
    });

    if(valueCheck.length > 0){
        res.render('employee/addproduct',{val:value, errors:valueCheck});
    } else {
        employeedb.addProduct(req.body.name, req.body.quantity, req.body.price, function(result){
            res.redirect('/employee/');
        });
    }
});
router.get('/updateproduct/:id', function (req, res){
    
    ID = req.params.id;

    employeedb.getProductByID(ID, function (result){
        var value = {
            name: result.name,
            quantity: result.quantity,
            price: result.price,
        };
        
        var valueCheck = [];

        res.render('employee/updateproduct',{value, valueCheck, product: result});
    });    
});

router.post('/updateproduct/:id',[
    body('name','Name required!').notEmpty(),
    body('quantity').notEmpty().withMessage('Quantity required!').isNumeric().withMessage('Quantity must be numeric!'),
    body('price').notEmpty().withMessage('Price required!').isNumeric().withMessage('Price must be numeric!'),
], function (req, res){
    
    ID = req.params.id;

    employeedb.getProductByID(ID, function (result){
        var value = {
            name: result.name,
            quantity: result.quantity,
            price: result.price,
        };

        var valueCheck = [];
    
        validationResult(req).errors.forEach(error => {
            valueCheck.push(error.msg);
        });

        if (valueCheck.length > 0){
            res.render('employee/updateProduct',{value, valueCheck, product: result});
        } else {
            employeedb.updateProduct(ID, req.body.name, req.body.quantity, req.body.price, function(result1){
                res.redirect('/employee/');
            });
        }
    });  
});
  