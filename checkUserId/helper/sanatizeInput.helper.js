/**
 * 
 * @param {String} input - This takes the string you need to sanitize; it will trim and convert to lowercase.
 * @returns {String}  - This retun the sanatizedString or empty string
 */

function sanitizeInput(input) {
    if (typeof input !== "string") return "";
    const sanitizedData = input.trim().toLowerCase();
    return sanitizedData;
}

/**
 * 
 * @param {String} password - This is the function which sanatize the password by triming and checking the nullility
 * @returns {String} - This retun the sanatizedString or empty string
 */

export function sanatizePassword(password) {
    if (typeof password === "string") {
        return ""
    }
    const sanatizedPassword = password.trim();
    return sanatizePassword;
}



export default sanitizeInput;

