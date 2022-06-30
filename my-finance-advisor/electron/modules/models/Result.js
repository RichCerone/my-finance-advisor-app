
/**
 * Represents a generic result from the application.
 */
class Result {
    
    /**
     * Creates a new Result.
     * 
     * @param {any} data JavaScript object to return.
     * @param {boolean} isError Whether the result is an error.
     * @param {string} error The error message.
     */
    constructor(data, isError, error) {
        this.data = data;
        this.isError = isError;
        this.error = error;
    }
}

module.exports.Result = Result;