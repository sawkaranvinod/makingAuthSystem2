export function generateOTP() {
    return Math.ceil(Math.random*100000 + 1);
}