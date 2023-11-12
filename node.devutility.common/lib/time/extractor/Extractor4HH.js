import DateTimePart from "../const/DateTimePart.js";

class Extractor4HH {
    getType() {
        return DateTimePart.HH;
    }

    extract(dateTime) {
        return ("0" + dateTime.getHours()).slice(-2);
    }
}

export default Extractor4HH;