import DateTimePart from "../const/DateTimePart.js";

class ExtractorFormm {
    getType() {
        return DateTimePart.mm;
    }

    extract(dateTime) {
        return ("0" + dateTime.getMinutes()).slice(-2);
    }
}

export default ExtractorFormm;