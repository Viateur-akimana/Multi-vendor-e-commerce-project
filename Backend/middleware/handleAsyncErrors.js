module.exports = (handleAsync) =>{
    Promise.resolve(handleAsync(req,res,next)).catch(next);
}