var path = require ( 'path') ;
var fs = require ( 'fs') ;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('form');
});

router.post('/form', (req, res) => {
    const  credential =  req.body.Password  === '12345' ;
    if( credential ) {
        res.render('admin');
    }
    else {
        res.render('ddx');
    }
})

/* GET home page. */
///router.get('/id', function(req, res, next) {
   // res.render('idslip');
  //});

  /* GET home page. */
router.get('/', function(req, res, next) {
    //render({ title: 'Express' });
    res.send(`<!DOCTYPE html><html><body style="font-size:6rem; margin-top:10rem;text-align: center;"><h1 style="font-size:6rem; margin-top:8rem;text-align: center;">enquiries:</h1>
      <h1 style="font-size:6rem; margin-top:-3rem;text-align: center;">08037722780</h1>
               </html>`)
  });

  router.get('/sch', function(req, res, next) {
    res.render('schooldup');
  });

  var schools = path.join(process.cwd(),'./schools.json')
  var school = JSON.parse(fs.readFileSync(schools,'utf-8'));
  //var accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));
  router.get('/school', function(req, res, next) {
    const data = school;
    res.json(data)
    console.log(data)
  });

  var accountan = path.join(process.cwd(),'./data.json')
  var accounts = JSON.parse(fs.readFileSync(accountan,'utf-8'));
  //var accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));
  
  router.post('/login', function handler(req, res,next) {
      try{
          var foundUser = accounts.find((data) => req.body.Password === data.pine || req.body.ParentPhoneNo === data.ParentPhoneNo);
          if (foundUser ) {
              //req.session.user = foundUser.pine;
                  res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,
                      NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,
                      Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,
                      State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,
                      ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,
                      Status:foundUser.Status,id:foundUser.id,Status:foundUser.Status,pine:foundUser.pine});
              } else {
                  res.render('ddx');
              }
         
      } catch{
          res.send("Internal server error");
          
      }
  });
  router.post('/search', async (req,res) => {
    try{
        var foundUser = accounts.find((data) => req.body.firstName === data.Aname.Name && req.body.MiddleName === data.Aname.Mname && req.body.SurName === data.Aname.Surname && req.body.ParentPhoneNo === data.ParentPhoneNo);
        if (foundUser) {
        //req.session.user = foundUser.pine;
            //res.render('result',{id:foundUser.pine});
            
            res.render('myid',{id:foundUser.pine,firstname:foundUser.Aname.Name,MiddleName:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,ParentPhoneNo:foundUser.ParentPhoneNo});
            //res.send(`<!DOCTYPE html><html><body><h1 style="font-size:6rem; margin-top:8rem;text-align: center;">${foundUser.pine}</h1>
               // </html>`)
        } else {
            res.render('ddx');
        }
   
} catch{
    res.send("Internal server error");
    
}
});

  /* GET home page. */
router.get('/schools', function(req, res, next) {
    res.render('school');
  });
  
  router.get('/getall', function(req, res, next) {
    const data = accounts;
    res.json(data)
  });

  var accountan = path.join(process.cwd(),'./data.json')
  var accounts = JSON.parse(fs.readFileSync(accountan,'utf-8'));
  
  router.get('/:id', function (req, res,next) {
    try{
        var id = req.params.id;
        var foundUser = accounts.find((data) => id === data._id);
        console.log(foundUser);
        if (foundUser ) {
            //req.session.user = foundUser.pine;
            res.render('result', {data:foundUser});
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
  });
  
  

module.exports = router;
