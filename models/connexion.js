var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}
var dbname = 'KeyDo';

mongoose.connect('mongodb+srv://Admin:admin@cluster0.n05jq.mongodb.net/KeyDo?retryWrites=true&w=majority',
    options,
    function(err){
        if (!err) {
            console.log('Connexion à la base de données '+ dbname +' est OK');
        } else {
        console.log(err);
    }
}
);

module.exports = mongoose