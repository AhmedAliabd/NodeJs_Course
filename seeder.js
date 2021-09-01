const fs = require('fs');
const mongoose = require('mongoose');
const color = require('colors');
const dotenv = require('dotenv');


//load end vars
dotenv.config({path: './config/config.env'});

//load module 
const Bootcamp = require('./models/Bootcamp');
const { deleteOne } = require('./models/Bootcamp');

//connect to DB
mongoose.connect(process.env.MONGOOSEDB_URI);

//Read JSON files 

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));


//import into DB
const importData = async () =>
{
    try {
        await Bootcamp.create(bootcamps);
        console.log('data imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err.message);
    }
}

//delete DB
const deleteData = async () =>{
    try {
        await Bootcamp.deleteMany();
        console.log('data deleted successfully'.green);
        process.exit();
    } catch (error) {
        console.log(error.message);
    }
}

if(process.argv[2] === '-import')
{
    importData();
}else if(process.argv[2] === '-delete')
{
    deleteData();
}


