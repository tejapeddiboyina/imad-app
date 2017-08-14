var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
        <meta name="viewport" content="width=device-width", intial-scale=1" />
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

app.get('/:articlename', function(req,res){
    var articlename = req.params.articlename;
    res.send(creatTemp(articles[articlename]));
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
