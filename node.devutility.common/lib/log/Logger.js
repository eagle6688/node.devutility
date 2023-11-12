/**
 * Logger
 * 
 * @author: Aldwin Su
 * @date: 2023-11-11 14:58:00
 * @Copyright: 2018 Aldwin Su. All rights reserved.
 */

import DateTimeFormatter from "../time/DateTimeFormatter.js";
import LogLevel from "./const/LogLevel.js";

class Logger {
    constructor(file, dateTimeFormatter) {
        this.file = file;

        if (!this.file) {
            this.file = "Default";
        }

        if (!dateTimeFormatter) {
            dateTimeFormatter = "yyyy-MM-dd HH:mm:ss.SSS";
        }

        this.dateTimeFormatter = new DateTimeFormatter(dateTimeFormatter);
    }

    static create(file, dateTimeFormatter) {
        return new Logger(file, dateTimeFormatter);
    }

    #getDateTimeString(dateTime) {
        return this.dateTimeFormatter.format(dateTime);
    }

    #createHeader(dateTime, level) {
        let dateTimeString = this.#getDateTimeString(dateTime);
        let value = "";
        value += "[" + dateTimeString + "] ";
        value += "[" + level + "] ";
        value += "[" + this.file + "] - ";
        return value;
    }

    #log(level, message, ...optionalParams) {
        let header = this.#createHeader(new Date(), level);
        message = header + message;
        console.log(message, ...optionalParams);
    }

    debug(message, ...optionalParams) {
        this.#log(LogLevel.DEBUG, message, ...optionalParams);
    }

    info(message, ...optionalParams) {
        this.#log(LogLevel.INFO, message, ...optionalParams);
    }

    warn(message, ...optionalParams) {
        this.#log(LogLevel.WARN, message, ...optionalParams);
    }

    error(message, ...optionalParams) {
        this.#log(LogLevel.ERROR, message, ...optionalParams);
    }
}

export default Logger;