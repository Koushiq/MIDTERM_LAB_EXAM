var db      = require('./dbconnection');

module.exports = {
    getAllEmp: function(callback){
        var sql="SELECT * FROM `personal_details` ,login_cred where personal_details.u_id = login_cred.id";
        console.log(sql);
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result);
                
            }
            else{
                callback([]);
            }
        });
    },
    addEmployee: function(value, callback){
        var sql="INSERT INTO `login_cred` (`username`, `password`, `type`) VALUES ('"+value.username+"','"+value.password+"','employee');";
        db.getResults(sql,function(result){
            var sql1="INSERT INTO `personal_details`(`u_id`, `name`, `phone`, `gender`, `designation`,`username`) VALUES ('"+result.insertId+"','"+value.name+"','"+value.phone+"','"+value.gender+"','"+value.designation+"','"+ value.username +"');";
            console.log(sql1);
            db.getResults(sql1,function(result1){
                callback(result1);
            });
        });
    },
    getEmployee: function(id, callback){
        var sql="SELECT * FROM `personal_details`, `login_cred` WHERE u_id = '"+id+"'";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },
    updateEmployee: function(id, name, phone, gender, designation, callback){
        var sql="UPDATE `personal_details` SET `name`='"+name+"',`phone`='"+phone+"',`gender`='"+gender+"',`designation`='"+designation+"' WHERE `u_id`='"+id+"';";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
    deleteEmp: function(id, callback){
        var sql="DELETE FROM `login_cred` WHERE ID = '"+id+"'";
        db.getResults(sql,function(result1){ 
            var sql2="DELETE FROM `personal_details` WHERE ID = '"+id+"'";
            db.getResults(sql2,function(result2){
                callback(result2);
            });
        });
    }
}