import Extractor4yyyy from "./Extractor4yyyy.js";
import Extractor4MM from "./Extractor4MM.js";
import Extractor4dd from "./Extractor4dd.js";
import Extractor4HH from "./Extractor4HH.js";
import ExtractorFormm from "./ExtractorFormm.js";
import Extractor4ss from "./Extractor4ss.js";
import Extractor4SSS from "./Extractor4SSS.js";

class Extractors {
    static map = new Map();

    static {
        this.#setExtractor(new Extractor4yyyy());
        this.#setExtractor(new Extractor4MM());
        this.#setExtractor(new Extractor4dd());
        this.#setExtractor(new Extractor4HH());
        this.#setExtractor(new ExtractorFormm());
        this.#setExtractor(new Extractor4ss());
        this.#setExtractor(new Extractor4SSS());
    }

    static #setExtractor(extractor) {
        this.map.set(extractor.getType(), extractor);
    }

    static getExtractor(type) {
        return this.map.get(type);
    }
}

export default Extractors;