const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err)=>{
  if(err) return console.error(err.message);


  console.log("Connection is successful!");
})

// db.run('CREATE TABLE auth(api_keys)');
const sql = 'SELECT * from auth';

db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message);
    console.log(rows)
})

db.close((err)=>{
    if(err) return console.error(err.message);
});
// const sql = "INSERT INTO auth (api_keys) values('545022ca38adf1a623d921fd7ee888f19f792abd');"

// db.run(sql, [], (err) => {
//     if(err) return console.error(err.message);
// })

// db.close((err)=>{
//     if(err) return console.error(err.message);
// });