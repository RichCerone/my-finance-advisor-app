/**
 * Thrown if a prop passed to a component is invalid
 */
class InvalidPropException {

    /**
     * Creates a new InvalidPropException.
     * 
     * @param {string} message Message to return.
     */
    constructor(message) {
        this.message = message;
    }
}

export default InvalidPropException;