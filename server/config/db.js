var mongoose = require('mongoose');
var readLine = require('readline');

var url = "mongodb://vikoapp:nilmar@ds151909.mlab.com:51909/mynight";
mongoose.connect(url);

//var localUrl = "mongodb://localhost:27017/test";
// mongoose.connect(localUrl);

mongoose.connection.on('connected', function () {
    console.log('Connection réalisée avec succes.');
});

mongoose.connection.on('error', function (err) {
    console.log('Érreur:' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Vous avez bien été déconnecté');
});

// SIGINT émulation sur windows
if (process.platform === "win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

// Fonction de confirmation de la fermeture de la bdd
var shutDownConfirmation = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('La déconnection s\'est effectuée par : ' + msg);
        callback();
    });
};

// Écoute de la procédure selon le système qui ferme la connection

// Nodemon SIGUSR2 restart
process.once('SIGUSR2', function () {
    shutDownConfirmation('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Fermeture de l'application'
process.on('SIGINT', function () {
    shutDownConfirmation('app termination', function () {
        process.exit(0);
    });
});

// Fermeture par heroku
process.on('SIGTERM', function () {
    shutDownConfirmation('Heroku app shutdown', function () {
        process.exit(0);
    });
});