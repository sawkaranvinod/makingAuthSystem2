import sanitizeInput from "./sanatizeInput.helper.js";
function checkBodySchema(body) {
    if (!Object.keys(body)) {
       return null 
    };
    if (!body.email) {
        return null;
    };
    const {email} = body;
    const sanatizedData = sanitizeInput(email);
    if (!sanatizedData) {
       return null; 
    }

    return {email:sanatizedData};
};
export default checkBodySchema;