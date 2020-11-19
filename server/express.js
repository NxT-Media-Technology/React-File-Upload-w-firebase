// require express / axios: 
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getNodeText } = require('@testing-library/react');

// Zorg dat deze gegevens kloppen! 
const db = mysql.createPool({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'react_crud',
})


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: true }));

app.post("/post", (req,res)=> {

    let name = req.body.name;
    let phonenumber = req.body.number;
    let img_description = "";

    const softDelete = null
    const url = req.body.img_url;
    const coords = req.body.coordinates;
    const anonymous = req.body.anonymous;
    const dateTime = new Date();

    if (anonymous) {
        name = "";
        number = "";
    }

    // if url length && coords are defined: 
    if((url !== null) && (coords !== null)){
        const sqlInsert = "INSERT INTO location_data (name, phonenumber, coordinates, img_url, img_description, created_at) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsert, [name, phonenumber, coords, url, img_description, dateTime], (err, result) => {

            if(err){
                console.log(err);
                // if there are any connection issues: 
                res.send('Error connecting to the database - data could not be send!');
            }
            console.log('Record has been stored succesfully!');
            res.send('Your submission has been added to the database!');
        });
    }
    else{
        res.send('Missing coordinates or image input!');
    }
});


app.post("/getdata", (req, res) => {

    const sqlSelectAll = "SELECT * FROM location_data WHERE is_deleted IS NULL ";
    db.query(sqlSelectAll, (err,result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

// Run the server on port 3001 (ONLY listens on 3001)
app.listen(3001, () => {
    console.log("running on 3001");

});