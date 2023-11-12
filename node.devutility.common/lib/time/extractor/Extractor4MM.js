import DateTimePart from "../const/DateTimePart.js";

class Extractor4MM {
    getType() {
        return DateTimePart.MM;
    }

    extract(dateTime) {
        return ("0" + (dateTime.getMonth() + 1)).slice(-2);
    }
}

export default Extractor4MM;