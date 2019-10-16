let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');


let app = express();

app.use(cors());

app.use(bodyParser.json());

let list = [];

app.get("/", (req, res)=>{
    resp.json(list);
});

app.post("/", (req, res)=>{
    let reqObj = req.body;
    if(reqObj.overwrite && reqObj.list){
        list = reqObj.list;
        resp.json(list);
    }else{
        list.push(reqObj);
        resp.json(reqObj);
    }
        
});

app.listen(3030, ()=>{
    console.log("Server started on port 3030");
})
