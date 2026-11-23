const errorHandler =(err, req, res, next)=>{
   const statusCode = res.statusCode ? res.statusCode : 500;
   res.status(statusCode);
   res.json({
    stack : process.env.NODE_ENV === "dev" ? err.stack : "",
    message: err.message
   })
}

module.exports = {
    errorHandler
}