function sendResponse(res, statusCode, message, data) {
    const responseData = {};
    if (message) {
        responseData.Message = message;
    }
    if (data) {
        responseData.data = data;
    }

    return res.status(200).json({
        StatusCode: statusCode,
        ...responseData,
    });
}


module.exports = { sendResponse };
