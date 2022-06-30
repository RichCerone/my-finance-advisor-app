const axios = require("axios").default;
const {Result} = require("../models/Result");

/**
 * Gets the token for the validated user.
 * 
 * @param {any} user JavaScript object representing the user data.
 * @returns Result of the API call.
 */
async function GetToken(user) {
    let result;
    const token = process.env.TOKEN;
    
    try {
        // TODO: Replace hardcoded URI with something from a template.
        await axios.post(process.env.GET_TOKEN_URL, user)
        .then(response => {
            if (response.status === 201) {
                result =  new Result(token, false, "");
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
                result = new Result(404, true, "The credentials are invalid.");
            }
            else
            {
                result = new Result(error.response.status, true, error.message);
            }
        });
    }
    catch (e) {
        console.error(e);
        result = new Result("", true, e.message);
    }

    return result;
}

module.exports.GetToken = GetToken;