exports.createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

exports.handleError = (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            error: {
                status: err.status || 500,
                message: err.message || "Internal Server Error"
            }
        })
}
