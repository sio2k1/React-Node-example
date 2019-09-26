const about_data = require('./about_content.json');
var path = require('path')
//const knexfile = require('./knexfile');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname,'sdb.db')
  }
});


//knex = require('knex')(knexfile);


//knex.raw("exec pages_get_page ''").then(result => { console.log(result); }).catch(error => { console.log(error); });
/*knex.raw("exec pages_get_page :x1",{x1:'test'}).then(

  (rows) => {
    for (row of rows) {
        console.log(row['response']);
    }
  }

).catch(error => { console.log(error); });*/



knex.select().table('users').then(
  (rows) => {
    for (row of rows) {
        console.log(row['id']);
    }
  }
);

/*
knex('users').where({
  id: 1
}).select('id','username','password').then(
  (rows) => {
    for (row of rows) {
        console.log(row['response']);
    }
  }
).catch(error => { console.log(error); });;
*/

//.then(
  //(version) => console.log(version));

const express = require('express');
let app = express()

app.use('/about',  (req, res, next) =>  {
  res.send('about')

  next();
})
// 'Call sp_start(?,?)',[req.params.headerId, @outmsg]
app.use('/pages',  async (req, res, next) =>  {
  if (req.query.name=="about_data")
  {
    res.send(about_data);
  } else
  {
    let resp="111";
    await knex.raw("exec pages_get_page :x1",{x1:req.query.name}).then(

      (rows) => {
        
        resp=rows[0]['response'];
        /*for (row of rows) {
          resp=row['response'];
        }*/
      }
    
    ).catch(error => { console.log(error); });


    res.send(resp);
  }
  next();
})
/*
app.use('/pages/:name', function(req, res, next) {

  res.send(req.params.name);
  
  if (req.params.name=="about_data")
  {
    res.send(about_data);
  } else
  {
    res.send("P");
  }
  
  next();
})
*/

 app.listen(3000, 
     () => {console.log('Open at localhost:3000')}
 )
