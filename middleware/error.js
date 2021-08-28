const errorHandler = (err,req,res,next)=>
{
    const error = {...err};
    console.log(error);
    
    res.status(err.codeStatus || 500).json({
        success : false,
        error: err.message || 'server Error'
    })
}

module.exports = errorHandler;