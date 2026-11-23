const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const data = await mongoose.connect(process.env.MONGO_DB_URL);

        console.log(`MongoDB Host: ${data.connection.host}`);
        console.log(`Database Name: ${data.connection.name}`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDb;