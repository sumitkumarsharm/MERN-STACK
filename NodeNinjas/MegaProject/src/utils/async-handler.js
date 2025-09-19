function asyncHandler(requestHandler) {
    return function(req,res,next){
        Promise.resolve(requestHandler())
        .catch((err)=>{
            next(err);
        })
    }
}
export {asyncHandler}