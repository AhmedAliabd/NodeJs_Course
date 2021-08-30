const { compile } = require('morgan');
let ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err,req,res,next)=>
{
    let error = {... err};
    error.message = err.message; // in case no if statement met we can reference the original message 
    // console.log(err);    
    if(err.name === 'CastError')
    {
        error = new ErrorResponse(`Resources not found with id of ${err.value}`,404);
    }

    if(err.code === 11000)
    {
        error = new ErrorResponse('Duplicate field value entered',400)
    }

    if(err.name === 'ValidationError')
    {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400)

    }
    res.status(error.codeStatus || 500).json({
            success : false,
            error: error.message || 'server Error'
        })





    // console.log(err.name);
    
    
}

module.exports = errorHandler;