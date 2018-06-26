const express = require("express");
const app = express();

let PORT = 3000;



app.get('/',function(req,res){
     res.sendFile('/dist/index.html', {root: __dirname });
});

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
});
