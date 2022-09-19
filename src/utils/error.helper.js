module.exports.HttpResponseError = function({ httpCode, msg }) {
    this.httpCode=httpCode;
    this.msg=msg;
}