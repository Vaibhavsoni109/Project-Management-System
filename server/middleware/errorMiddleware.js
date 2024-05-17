const routeNotFound=(req,res,next)=>
    {
        const error =new error(`ROute not found :${req.originUrl}`);
        res.status(404);
        next(error);

    }
    const erroHandler=(err,rq,res,next)=>
        {
let statusCode=res.statusCode ===200?500:res.statusCode;
let message=err.message;

if(err.name==="CastError" && err.kind ==="ObjectId")
    {
        statusCode=404;
        message="resource not found"
    }

    res.status(statusCode).json({
        message:message,
        stack:process.env.NODE_ENV !=="production"? null :err.stack,
    })

        }
export {routeNotFound,erroHandler};