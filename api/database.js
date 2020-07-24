const admin = require('firebase-admin');

var serviceAccount = require('./admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://soundcloud-c3feb.firebaseio.com"
});

var db = admin.database();
var userRef = db.ref('users');

const userOperation = {
    addUser(obj,res) {
        var oneUser = userRef.child(obj.roll);
        oneUser.update(obj,(err) => {
            if(err) {
                res.status(300).json({"msg":"Something went wrong","error":err});
    
            }
            else {
                res.status(200).json({"msg":"User created successfully"});
    
            }
        });
    },
    
    demoUser(obj,res) {
        var userRefdemo = db.ref('demousers');
        var oneUser = userRefdemo.child(obj.roll);
        oneUser.push(obj, (err) => {
            if(err) {
                res.status(300).json({"msg":"Something went wrong","error":err});
    
            }
            else {
                res.status(200).json({"msg":"User created successfully"});
    
            }
        })
    },
    
    getUsers(res) {
        userRef.once('value',function(snap) {
            res.status(200).json({"users":snap.val()});
        })
    }
}

module.exports = userOperation;