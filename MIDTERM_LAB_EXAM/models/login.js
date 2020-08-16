var db      = require('./dbconnection');

module.exports = {
    getCredentials: function(username,password,callback){
        var sql="SELECT * from login_cred WHERE username ='"+username+"' and password ='"+password+"'";
        console.log(sql);
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result);
            }
            else{
                callback([]);
            }
        });
    }   
}