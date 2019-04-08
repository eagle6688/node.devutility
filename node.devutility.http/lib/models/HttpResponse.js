function HttpResponse(data, message, httpStatus) {
    this.data = null;
    this.message = '';
    this.statusCode = 0;

    if (data) {
        this.data = data;
    }

    if (message) {
        this.message = message;
    }

    if (httpStatus) {
        this.statusCode = httpStatus;
    }
}

HttpResponse.prototype.isSucceeded = function () {
    return this.statusCode >= 200 && this.statusCode < 400;
};

module.exports = HttpResponse;