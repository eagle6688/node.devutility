import DateTimePart from "../const/DateTimePart.js";

class Extractor4ss {
    getType() {
        return DateTimePart.ss;
    }

    extract(dateTime) {
        return ("0" + dateTime.getSeconds()).slice(-2);
    }
}

export default Extractor4ss;