"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerError = void 0;
class ControllerError {
    constructor(msg, httpCode) {
        this.msg = msg;
        this.httpCode = httpCode;
    }
}
exports.ControllerError = ControllerError;
