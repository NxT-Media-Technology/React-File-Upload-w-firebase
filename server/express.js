// require express / axios: 
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getNodeText } = require('@testing-library/react');
const crypto = require('crypto');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const { param } = require('jquery');
const path = require('path')

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: true }));

// Zorg dat deze gegevens kloppen! 
const db = mysql.createPool({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'react_crud',
})

app.post("/post", (req,res)=> {

    let name = req.body.name;
    let phonenumber = req.body.number;
    let img_description = req.body.img_description;

    const softDelete = 0
    const url = req.body.img_url;
    const imgName = req.body.imgName;
    const coords = req.body.coordinates;
    const anonymous = req.body.anonymous;
    const dateTime = new Date();
    const deleteId = crypto.randomBytes(16).toString("hex");

    if (anonymous) {
        name = "Anonymous";
        phonenumber = "Anonymous";
    }

    // if url length && coords are defined: 
    if(url !== null && coords !== null){
        const sqlInsert = "INSERT INTO location_data (delete_id, name, phonenumber, coordinates, img_url, img_name, img_description, created_at) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [deleteId, name, phonenumber, coords, url, imgName, img_description, dateTime], (err, result) => {

            if(err){
                console.log(err);
                // if there are any connection issues: 
                res.send('Error connecting to the database - data could not be send!');
                return;
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
        html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>mail</title>\n\t<style>img{width:50%;height:50%}a{background-color:#44c767;border-radius:10px;border:1px solid #18ab29;display:inline-block;cursor:pointer;color:#ffffff;font-family:Arial;font-size:17px;padding:10px 15px;text-decoration:none;}</style>\n</head>\n<body>\n\t<h1>New sweep reported!</h1>\n\t<p>Name:" + name + "</p>\n\t<p>Phonenumber: "+ phonenumber + "</p>\n\t<p>Coordinates: "+ coords + "</p>\n\t<p>Date: "+ dateTime + "</p>\n\t<img src=" + url + ">\n\t<p>\n\t<a href='http://localhost:3000/remove?uuid=" + deleteId + "'>Clear this report</a>\n\t</p>\n\t</body>\n</html>",
    };

    transporter.sendMail(mailData, function (err, info) {
       if(err)
         return console.log(err)
    });
});

app.post("/register", (req, res) => {
    let user_name = req.body.username;
    let user_password1 = req.body.password1;
    let user_password2 = req.body.password2;
    console.log('Register route' + user_name + user_password1 + user_password2)

    if (user_name && user_password1 == user_password2) {
        const sqlGetUser = "SELECT * FROM users WHERE username = ?";
        //CHECK OF USER AL BESTAAT IN DE DATABASE
        db.query(sqlGetUser, user_name, (err,result) => {
            if (err) {
                console.log(err)
            } 
            if (result.length > 0) {
                res.send('Username is already taken!')
                console.log('Username is already taken!')
            } else {
                const userToken = crypto.randomBytes(16).toString("hex");
                const sqlRegisterUser = "INSERT INTO users (username, password, token) VALUES (?,?,?)";
                console.log('Making query')

                db.query(sqlRegisterUser, [user_name, user_password1, userToken], (err,result) => {
                if (err) {
                    console.log(result)
                    res.send('Oops something went wrong...')
                } else {
                    res.send('New user created successfully!')
                }
            })   
        };
    })} 
    else {
        res.send('Passwords do not match!')
    }
});

app.post("/login", (req, res, next) => {
    let user_name = req.body.username;
    let user_password = req.body.password;
    console.log('Login route')
    //console.log(req.session.userId)

    if (user_name && user_password){
        const sqlGetUser = "SELECT * FROM users WHERE username = ?";
        //CHECK OF USER BESTAAT
        db.query(sqlGetUser, user_name, (err,result) => {
            if (err) {
                console.log(err)
                res.send('Invalid credentials: user not found');
            } else {
                console.log(result)
                if (result.length > 0) {
                    if (user_name == result[0]['username'] && user_password == result[0]['password']) {
                        const token = true;
                        console.log("name: "+ result[0]['username'] +" pass: " +result[0]['password']);
                        console.log(result[0]);
                        res.send(result[0]);                                 
                    } else {
                        res.send('Invalid credentials: Invalid password')
                    }
                } else {
                    res.send('Invalid credentials: Username not found')
                }
            }
        });
    }
});

function verifyByToken(token, callback) {
    const verifyToken = token
    
    const sqlVerifyToken = "SELECT * FROM users WHERE token = ?";
    db.query(sqlVerifyToken, verifyToken, function(err,result) {
        if (err) {
            return callback(false);
        } else {
            if (result.length == 0) {
                return callback(false);
            } else {
                if (result[0].token == verifyToken) {
                    return callback(true);
                } else {
                    return callback(false);
                }
            }
        }

        
    });
}

app.post("/getdata", (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result){
        isAuthorised = result

        if (isAuthorised) {
            const sqlSelectAllPending = "SELECT * FROM location_data WHERE `is_deleted` = '0' AND `not_found` = '0'";
            db.query(sqlSelectAllPending, (err,result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result)
                }
            });
        } else {res.send('Unauthorised')}
    })  
});



// Get posts by datetime:
app.post('/getPostsByDate', (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result) {
        isAuthorised = result

        if (isAuthorised) {

            const dateFilterType = req.body.dateFilter;
            const currentNavItem = req.body.currentNavItem;
            let selectStmt = "SELECT * FROM location_data WHERE `is_deleted` = '0' AND `not_found` = '0'";
            let newDate = new Date();
            let currentYear = newDate.getFullYear();
            // getMonth() is zero index based: (therefore +1)
            let currentMonth = newDate.getMonth()+1; 
            let yearAndMonth = currentYear + "-" + currentMonth;
            // console.log(currentYear, currentMonth, newDate);

            let params = [0,0];
            console.log(currentNavItem)

            // 0 = pending | 1 = Clean | 2 = Not found
            switch(currentNavItem){
                case 0:
                    params = [0,0];
                break;
                case 1:
                    params = [1,0];
                break;
                case 2:
                    params = [0,1];
                break;
                default:
                    params = [0,0];
            }

            switch(dateFilterType) {
                case 'Oldest':
                    selectStmt = "SELECT * FROM location_data WHERE `is_deleted` = '" + params[0] + "' AND `not_found` = '" + params[1] + "' ORDER BY created_at ASC";
                    break;
                case 'Latest':
                    selectStmt = "SELECT * FROM location_data WHERE `is_deleted` = '" + params[0] + "' AND `not_found` = '" + params[1] + "' ORDER BY created_at DESC";
                    break;
                case 'This-month':
                    selectStmt = "SELECT * FROM location_data WHERE `is_deleted` = ' " + params[0] + "' AND `not_found` = '" + params[1] + "' AND created_at LIKE '%" + yearAndMonth + "%'";
                    break;
                default:
                    selectStmt = "SELECT * FROM location_data WHERE `is_deleted` = '0' AND `not_found` = '0' ORDER BY created_at ASC";
               
            }

            db.query(selectStmt, (err,result) => {
                if (err) {
                    res.send("Oops.. Something went wrong!")
                } else {
                    console.log('success!');
                    res.send(result);
                }
            })
        } else {res.send('Unauthorised')}    
    }) 
});



app.post("/getcleaneddata", (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result){
        isAuthorised = result

        if (isAuthorised) {
            const sqlSelectCleaned = "SELECT * FROM location_data WHERE `is_deleted` = '1'";
            db.query(sqlSelectCleaned, (err,result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result)
                }
            });
        } else { res.send('Unauthorised') }
    })
});

app.post("/getnotfounddata", (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result) {
        isAuthorised = result

        if (isAuthorised) {
            const sqlSelectCleanedNotFound = "SELECT * FROM location_data WHERE `not_found` = '1'";
            db.query(sqlSelectCleanedNotFound, (err,result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result)
                }
            });
        } else res.send('Unauthorised')
    })
});

//REMOVE FROM ADMINPANEL
app.post('/deleteRecord', (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result) {
        isAuthorised = result

        if (isAuthorised) {
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
        } else { res.send('Unauthorised') }
    })
});

app.post('/notfoundrecord', (req, res) => {
    const token = req.body.token
    let isAuthorised = false;

    verifyByToken(token, function(result) {
        isAuthorised = result

        if (isAuthorised) {

            const id = req.body.id
            const sqlSoftDelete = "UPDATE `location_data` SET `not_found` = '1' WHERE `location_data`.`id` = ?";
            db.query(sqlSoftDelete, id, (err,result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send('Item deleted succesfully!')
                    console.log('softdeleted')
                }
            })
        } else { res.send('Unauthorised')}
    })
});

//REMOVE FROM EMAIL
app.post('/remove', (req, res) => {
    const uuid = req.body.uuid;

    const sqlSoftDeleteMail = "UPDATE `location_data` SET `is_deleted` = '1' WHERE `location_data`.`delete_id` = ?";
    db.query(sqlSoftDeleteMail, uuid, (err,result) => {
        if (err) {
            res.send("Oops.. Something went wrong!")
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