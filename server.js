var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config ={
  user: 'tejapeddiboyina7',
  database: 'tejapeddiboyina7',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};
var app = express(); 
app.use(morgan('combined'));

var articles = {
    'article-one':{
        title : 'article One | teja peddiboyina',
        heading : 'article-One',
        date : 'aug 14 , 2017',
        content : '<p>teja\'s article one</p>',
    },
     'article-two':{
        title : 'article two | teja peddiboyina',
        heading : 'article-two',
        date : 'aug 14 , 2016',
        content : '<p>teja\'s article two</p>',
    },
     'article-three':{
        title : 'article three | teja peddiboyina',
        heading : 'article-three',
        date : 'aug 14 , 2015',
        content : '<p>teja\'s article three</p>',
    }
};

function createTemp(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemp =`
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width", initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
      </head>
      <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <div>
                <h3>${heading}</h3>
            </div>
            <div>
                ${date}
            </div>
             <div>
                ${content}
            </div>
        </div>
      </body>
    </html>`;
    return htmlTemp;
    }
    
    var pool = new Pool(config);
    app.get('/test-db', function(req, res){
       // make aselect request
       // return a response with the results
       pool.query('SELECT * FROM test', function(err, result){
           if(err){
               res.status(500).send(err.toString());
           }else{
               res.send(JSON.stringify(result.rows));
           }
       });
    });
    
    var counter = 0;
    app.get('/counter',function(req, res){
        counter++;
        res.send(counter.toString());
    });
    
    
    

app.get('/:articlename', function(req,res){
    var articlename = req.params.articlename;
    res.send(createTemp(articles[articlename]));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
