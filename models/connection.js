const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        // MongoDB Connection
        const Connect = await Mongoose.connect(
            process.env.MONGODB_CLIENT,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )

        console.log("MongoDB connected : " + Connect.connection.host)
    } catch(err) {
        console.log(err)
    }
}

module.exports = ConnectDB