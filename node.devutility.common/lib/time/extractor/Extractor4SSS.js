import DateTimePart from "../const/DateTimePart.js";

class Extractor4SSS {
    getType() {
        return DateTimePart.SSS;
    }

    extract(dateTime) {
        return ("00" + dateTime.getMilliseconds()).slice(-3);
    }
}

export default Extractor4SSS;