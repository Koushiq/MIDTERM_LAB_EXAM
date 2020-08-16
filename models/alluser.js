var db = require('./db');

module.exports ={
    validate: (user, callback)=>{

		var sql = "select * from alluser where username='"+user.username+"' and password='"+user.password+"'";
		console.log(sql);
		db.getResults(sql, (result)=>{
			if(result.length > 0)
			{
				callback(result);
			}
			else{
				callback([]);
			}
		});
	},

	insertByAdmin: (user,callback)=>{
		var sql= "insert into alluser values('"+user.username+"','"+user.password+"','user') ";
		console.log(sql);
		db.execute(sql, (status)=>{
            if(status)
            {
                callback(true);
            }
            else{
                callback(false);
            }
		});
	},
	deleteUser:(user,callback)=>{
		var sql ="delete from alluser where username='"+user+"' ";
		console.log(sql);
		db.execute(sql, (status)=>{
            if(status)
            {
                callback(true);
            }
            else{
                callback(false);
            }
		});
	}
}