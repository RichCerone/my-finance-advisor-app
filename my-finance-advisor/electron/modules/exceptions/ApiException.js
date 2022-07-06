
/**
 * Thrown if an unexpected result is returned from an API.
 */
class ApiException {
    /**
     * Creates a new ApiException.
     * 
     * @param {int} status The status code of the API response.
     * @param {string} message Message returned from the API.
     */
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    /**
     * Outputs a readable string of the exception.
     * 
     * @returns ApiException as a readable string.
     */
    toString() {
        return `API call failed with status '${this.status}': '${this.message}'`;    
    }
}

module.exports.ApiException = ApiException;