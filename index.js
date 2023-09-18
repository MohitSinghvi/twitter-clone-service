const express = require("express")
var app = express()
app.get("/",function(request,response){
response.send("Hello World!")
})
app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});

// app.listen(PORT, () => {
//     console.log("Server Listening on PORT:", port);
//   });

var http = require('https');
// const axios = require('axios');
// var client = http.createClient(3000, 'https://api.twitter.com/2');


app.use(express.json());

const cors = require('cors');

const axios = require('axios');
app.use(cors());
// app.post('/getTwitterOauth',
//     (request, response) =>{

//         // const options = {
//         //     hostname: 'api.twitter.com',
//         //     path: '2/oauth2/token',
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/x-www-form-urlencoded',
//         //     }
//         // };

//         const options = {
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//         };

//         axios({
//             method:'post',
//             url:'https://api.twitter.com/2/oauth2/token',
//             data: `code=${request?.body?.code}&grant_type=${'authorization_code'}&client_id=${'MWl5WTRtRlZrRlNNX1BHb1d2NXA6MTpjaQ'}&redirect_uri=${'http://127.0.0.1:4200/'}&code_verifier=${'challenge'}`,
//             options
//         })
//         .then(function (res) {
//             response.send(JSON.stringify(res.data));
//         })
//         .catch(function (error) {
//             console.log(error);
//             response.send(error);
//         });


//         // const req = http.request(options, (res) => {
//         //     let data = '';
        
//         //     console.log('Status Code:', res.statusCode);
        
//         //     res.on('data', (chunk) => {
//         //         data += chunk;
//         //     });
        
//         //     res.on('end', () => {
//         //         // console.log('Body: ', JSON.parse(data));
//         //         response.send(data);
//         //     });
        
//         // }).on("error", (err) => {
//         //     console.log("Error: ", err.message);
//         // });

//         // req.write(`code=${request?.body?.code}&grant_type=${'authorization_code'}&client_id=${'MWl5WTRtRlZrRlNNX1BHb1d2NXA6MTpjaQ'}&redirect_uri=${'http://127.0.0.1:4200/'}&code_verifier=${'challenge'}`);
//         // req.end();
        

        
    

//     }
// )

// axios.post('http://yourapi.com',{somekey:'some value'},auth).then(result => { 
//  console.log(result.data)
// })

app.post('/getTwitterOauth',
    (request, response) =>{

        const options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };

        // axios({
        //     method:'post',
        //     url:'https://api.twitter.com/2/tweets',
        //     data: {text: request.body.text},
        //     options
        // })
        // .then(function (res) {
        //     response.send(JSON.stringify(res.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     response.send(error);
        // });

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

        // axios({
        //     method:'post',
        //     url:'https://api.twitter.com/2/tweets',
        //     data: {text: request.body.text},
        //     options
        // })
        // .then(function (res) {
        //     response.send(JSON.stringify(res.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     response.send(error);
        // });

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

        // axios({
        //     method:'post',
        //     url:'https://api.twitter.com/2/tweets',
        //     data: {text: request.body.text},
        //     options
        // })
        // .then(function (res) {
        //     response.send(JSON.stringify(res.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     response.send(error);
        // });

        axios.delete('https://api.twitter.com/2/tweets/'+request.body.id,options).then(result => { 
            console.log(result.data);
            response.send(JSON.stringify(result.data));
        }).catch(function (error) {
            console.log(error);
            response.send(error);
        });

    }


    
)