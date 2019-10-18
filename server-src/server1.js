let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');


let app = express();

app.use(cors());

app.use(bodyParser.json());

let list = [
    {name:"1", mobile:1,email:'1@1.com'}
];

app.get("/", (req, res)=>{
    res.json(list);
});

app.post("/", (req, res)=>{
    let reqObj = req.body;
    if(reqObj.overwrite && reqObj.list){
        list = reqObj.list;
    }else{
        list.push(reqObj.inpObj);
    }

    res.json(list);
});

app.listen(3030, ()=>{
    console.log("Server started on port 3030");
})
