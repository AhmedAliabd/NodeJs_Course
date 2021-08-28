class ErrorResponse extends Error
{
    constructor(message,statusCode)
    {
        super(message);
        this.codeStatus = statusCode;
    }
} 

module.exports = ErrorResponse;