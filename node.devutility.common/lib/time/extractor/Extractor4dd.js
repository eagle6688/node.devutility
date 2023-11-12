import DateTimePart from "../const/DateTimePart.js";

class Extractor4dd {
    getType() {
        return DateTimePart.dd;
    }

    extract(dateTime) {
        return ("0" + dateTime.getDate()).slice(-2);
    }
}

export default Extractor4dd;