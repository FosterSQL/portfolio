const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    db: process.env.MONGODB_URI || "mongodb+srv://diegoyo16lol_db_user:Diego20300827@cluster0.fhom4lj.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') 
        + '/portfolio'
};

export default config;