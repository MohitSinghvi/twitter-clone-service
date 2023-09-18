const express = require("express")
var app = express()

app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});

var http = require('https');

app.use(express.json());

const cors = require('cors');

const axios = require('axios');
app.use(cors());

app.post('/getTwitterOauth',
    (request, response) =>{

        const options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post('https://api.twitter.com/2/oauth2/token',`code=${request?.body?.code}&grant_type=${'authorization_code'}&client_id=${'MWl5WTRtRlZrRlNNX1BHb1d2NXA6MTpjaQ'}&redirect_uri=${'http://127.0.0.1:4200/create'}&code_verifier=${'challenge'}`,options).then(result => { 
            console.log(result.data);
            response.send(result.data);
        }).catch(function (error) {
            console.log(error);
            response.send(error);
        });
    }  
)


app.post('/create',
    (request, response) =>{
        const fullToken = "Bearer " + request.body.token

        const options = {
            headers: {"Authorization" : `Bearer ${request.body.token}`, "Content-Type": "application/json", "withCredentials": true}
        };
        
        axios.post('https://api.twitter.com/2/tweets',{text: request.body.text},options).then(result => { 
            console.log(result.data);
            response.send(JSON.stringify(result.data));
        }).catch(function (error) {
            console.log(error);
            response.send(error);
        });

    }


    
)

app.post('/delete',
    (request, response) =>{
        const fullToken = "Bearer " + request.body.token

        const options = {
            headers: {"Authorization" : `Bearer ${request.body.token}`, "Content-Type": "application/json", "withCredentials": true}
        };

        axios.delete('https://api.twitter.com/2/tweets/'+request.body.id,options).then(result => { 
            console.log(result.data);
            response.send(JSON.stringify(result.data));
        }).catch(function (error) {
            console.log(error);
            response.send(error);
        });

    }


    
)