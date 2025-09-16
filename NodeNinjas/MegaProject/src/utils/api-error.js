class ApiError extends Error {
    constructor(
       statusCode,
       message = "Something went wrong",
       errors = [],
       stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack;
        this.sucess = false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError