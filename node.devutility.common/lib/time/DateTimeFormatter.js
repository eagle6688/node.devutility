import BaseValidator from "../validator/BaseValidator.js";
import DateTimePart from "./const/DateTimePart.js";
import Extractors from "./extractor/Extractors.js";

class DateTimeFormatter extends BaseValidator {
    constructor(formatter) {
        super();
        this.formatter = formatter;
        this.#verify();
    }

    #verify() {
        super.requireString(this.formatter, 'formatter', 'parameter');
    }

    format(dateTime) {
        let result = this.formatter;
        result = this.#formatPart(result, dateTime, DateTimePart.yyyy);
        result = this.#formatPart(result, dateTime, DateTimePart.MM);
        result = this.#formatPart(result, dateTime, DateTimePart.dd);
        result = this.#formatPart(result, dateTime, DateTimePart.HH);
        result = this.#formatPart(result, dateTime, DateTimePart.mm);
        result = this.#formatPart(result, dateTime, DateTimePart.ss);
        result = this.#formatPart(result, dateTime, DateTimePart.SSS);
        return result;
    }

    #formatPart(formatter, dateTime, part) {
        let regExp = new RegExp(part, "g");
        let extractor = Extractors.getExtractor(part);

        if (!extractor) {
            throw new Error("Extractor not found, part: '" + part + "'.");
        }

        let value = extractor.extract(dateTime);
        return formatter.replace(regExp, value);
    }
}

export default DateTimeFormatter;