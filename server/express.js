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

    const softDelete = 0
    const url = req.body.img_url;
    const imgName = req.body.imgName;
    const coords = req.body.coordinates;
    const anonymous = req.body.anonymous;
    const dateTime = new Date();

    if (anonymous) {
        name = "Anonymous";
        phonenumber = "Anonymous";
    }

    // if url length && coords are defined: 
    if((url !== null) && (coords !== null)){
        const sqlInsert = "INSERT INTO location_data (name, phonenumber, coordinates, img_url, img_name, img_description, created_at) VALUES (?,?,?,?,?,?,?)";
        db.query(sqlInsert, [name, phonenumber, coords, url, imgName, img_description, dateTime], (err, result) => {

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

    //IMPORT MAIL FROM TXTFILE

    //SEND MAIL
    var nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
       auth: {
            user: 'sweepit.clean51@gmail.com',
            pass: 'cleansweep123',
         },
    secure: true,
    requireTLS: true,
    });

    const mailData = {
        from: 'sweepit.clean51@gmail.com',  //SENDER ADDRESS
        to: 'simons.reno@gmail.com',        //RECEIVERS
        subject: 'Cleansweep new report',
        text: '',
        html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>mail</title>\n\t<style>img{width:50%}</style>\n</head>\n<body>\n\t<h1>New sweep reported!</h1>\n\t<p>Name:" + name + "</p>\n\t<p>Phonenumber: "+ phonenumber + "</p>\n\t<p>Coordinates: "+ coords + "</p>\n\t<p>Date: "+ dateTime + "</p>\n\t<img src=" + url + ">\n</body>\n</html>",
    };

    transporter.sendMail(mailData, function (err, info) {
       if(err)
         return console.log(err)
    });
});


app.post("/getdata", (req, res) => {

    const sqlSelectAll = "SELECT * FROM location_data WHERE is_deleted = 0 ";
    db.query(sqlSelectAll, (err,result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

app.post('/deleteRecord', (req, res) => {
    const id = req.body.id
    const sqlSoftDelete = "UPDATE `location_data` SET `is_deleted` = '1' WHERE `location_data`.`id` = ?";
    db.query(sqlSoftDelete, id, (err,result) => {
        if (err) {
            res.send(err)
        } else {
            res.send('Item deleted succesfully!')
            console.log('softdeleted')
        }
    })
});

// Run the server on port 3001 (ONLY listens on 3001)
app.listen(3001, () => {
    console.log("running on 3001");
});