import mongoose
    from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongodb connected sucessfully')
        })
        connection.on('error', (err) => {
            console.log('Mongodb connection error.Please make sure Mongodb is running.' + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);

    }
}