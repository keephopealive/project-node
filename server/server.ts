// npm install --save body-parser express mongoose mongoose-validator mysql socket.io express-flash express-session express-validator
// npm install --save-dev @types/express debug supports-color ts-node typescript

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Path ============ 
const path = require('path');

// ============ Mongoose + BlueBird Promises ============ 
require('./config/mongoose.config')();

// ============ Port ============ 
app.set('port', process.env.PORT || 9000);

// ============ View Engine ============ 
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ Express Validator ============ 
app.use(require('express-validator')());

// ============ Express Session ============ 
import * as session from "express-session";
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'SESSION_SECRET',
    // store: new MongoStore({
    //     url: mongoUrl,
    //     autoReconnect: true
    // })
}));

// ============ Express Flash ============ 
import * as flash from "express-flash";
app.use(flash());

// ============ Passport ============ 
import * as passport from "passport";
app.use(passport.initialize());
app.use(passport.session());


// ============ Server Config ============ 
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

// ============ Socket Config ============ 
import * as socketIo from 'socket.io';
const io = socketIo.listen(server);

// ============ Static Routes ============ 
app.use(express.static(
    path.join(__dirname, "public"),
    { maxAge: 31557600000 }
));

// ============ HTTP Routes ============ 
require('./config/routes.config')(app, io);

// ============ Socket Routes ============ 
// require('./config/sockets.config')(io);
io.sockets.on('connection', function(socket) { 


    socket.on('button_clicked', (data) => {
        // User.find({},function(){
        //     io.emit('update')
        // })
    });

});


export default app;
