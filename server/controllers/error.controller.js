function handleError(req, res) {
    // generic error handler (not used widely in this project, kept for completeness)
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({ error: 'An unexpected error occurred.' });
}

function getErrorMessage(err) {
    // Normalize different error shapes (Mongoose ValidationError, MongoServerError etc.)
    if (!err) return 'Unknown error';

    // If it's a Mongo duplicate key error
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue || {}).join(', ');
        return `Duplicate value for field(s): ${field}`;
    }

    // Mongoose validation errors
    if (err.name === 'ValidationError' && err.errors) {
        const messages = Object.values(err.errors).map(e => e.message);
        return messages.join('; ');
    }

    // If it's an Error instance
    if (err.message) return err.message;

    // Fallback to string conversion
    return String(err);
}

// Export the controller functions
export default {
    handleError,
    getErrorMessage
};
    