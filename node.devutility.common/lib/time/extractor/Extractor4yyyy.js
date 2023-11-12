import DateTimePart from "../const/DateTimePart.js";

class Extractor4yyyy {
    getType() {
        return DateTimePart.yyyy;
    }

    extract(dateTime) {
        return dateTime.getFullYear();
    }
}

export default Extractor4yyyy;