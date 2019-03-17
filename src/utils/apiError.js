/**
 * The service error type module
 * @module
 */

'use strict';

/**
 * Represents a service error.
 * @class
 */
export default class ApiError {
    /**
     * @constructor
     * @param {Number} statusCode the Http status code for JavaScript error.
     * @param {Object} messages the response object
     * @param {Error} innerError The original native JavaScript error.
     */
    constructor(errorType, messages, innerError, statusCode) {
        this.statusCode = statusCode;

        /** @member {Object} messages Collection of error messages. */
        this.messages = messages;

        /** @member {Error} innerError The original native JavaScript error. */
        this.innerError = innerError;
    }
}
