const { connect, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

// Connect establishes a connection to a mongoDB database
connect(connectionString, {
    
    //indicates that the MongoDB driver should use the new conenction string parser to parse the connectionString
    useNewUrlParser: true,

    // an option that enables the use of the new Server Discovery and Monitoring engine
    useUnifiedTopology: true,
});

module.exports = connection;