console.log('node.js Hello world');

var express = require('express');
var mysql = require('mysql');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var pool = mysql.createPool({
  connection: 10,
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs290_hamarg',
  password : '8125',
  database : 'cs290_hamarg'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(express.static('public'));

app.get('/',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts", function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  console.log(['get', context]);
  });
});

app.post('/', function(req,res,next){
  console.log(req.query);
  var context = {};
  pool.query("INSERT INTO workouts(`name`) VALUES (?)", ['test'], function(err, result){
    if (err) {
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home', context);
  console.log(['post', context]);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl+C to terminate.');
});