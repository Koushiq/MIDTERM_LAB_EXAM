var db      = require('./dbconnection');
module.exports = {

    getProdList: function(search, callback){
        var sql="SELECT * FROM `product`";
            db.getResults(sql,function(result){
                callback(result);
            });
    },
    addProduct: function(name, quantity, price, callback){
        var sql="INSERT INTO `product`(`name`, `quantity`, `price`) VALUES ('"+name+"','"+quantity+"','"+price+"');";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
    updateProduct: function(ID, name, quantity, price, callback){
        var sql="UPDATE `product` SET `name`='"+name+"',`quantity`='"+quantity+"',`price`='"+price+"' WHERE ID = '"+ID+"';";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
    getProductByID: function(ID, callback){
        var sql="SELECT * FROM `product` WHERE `ID` LIKE '"+ID+"';";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },

}
