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
        await axios.post(process.env.GET_TOKEN_URI, user)
        .then(response => {
            if (response.status === 201) {
                result =  new Result(token, false, "");
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
                result = new Result(404, true, "The credentials are invalid.");
            }
            else {
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

/**
 * Gets the accounts by user.
 * 
 * @param {string} user The user to search accounts by.
 * @returns Result from the API call.
 */
async function GetAccountsByUser(user) {
    let result;
    const token = process.env.TOKEN;

    try {
        await axios.get(`${process.env.ACCOUNTS_URI}?account_owner_id=${user}`, {headers: {"Authorization": `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
                result = new Result(response.data, false, "");
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
                result = new Result(404, true, `Could not find any accounts by user '${user}'`);
            }
            else {
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

/**
 * Updates the account.
 * 
 * @param {*} account The account object to update.
 * @returns Result from API call.
 */
async function UpdateAccount(account) {
    let result;
    const token = process.env.TOKEN;

    try {
        await axios.put(process.env.ACCOUNTS_URI, account, {headers: {"Authorization": `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
                result = new Result(response.data, false, "");
            }
        })
        .catch(error => {
            if (error.response.status === 400) {
                result = new Result(error.response.data, true, "At least one field was invalid updating the account.");
            }
            else {
                result = new Result(error.response.status, true, error.message);
            }
        });
    }
    catch (e) {
        console.log("here catch");
        console.error(e);
        result = new Result("", true, e.message);
    }

    return result;
}

module.exports.GetToken = GetToken;
module.exports.GetAccountsByUser = GetAccountsByUser;
module.exports.UpdateAccount = UpdateAccount;