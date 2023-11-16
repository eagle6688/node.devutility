/**
 * Server business handler.
 */

import collectionUtilities from "utilities-collection";
import httpUtilities from "utilities-http";
import { Logger } from "utilities-common";
import config from "../config.js";

class Service {
    static logger = new Logger('Service.js');

    static #getPageName(request) {
        let path = request.path;
        let array = path.split("/");
        return array[array.length - 1];
    }

    static #getPagePath(pageName) {
        let format = "pages/{page}/index";
        return format.replace(/{page}/, pageName);
    }

    static #getPagePathByRequest(request) {
        let pageName = this.#getPageName(request);
        return this.#getPagePath(pageName);
    }

    static async login(request, response, next) {
        if (collectionUtilities.valueContainElement(config.url.whiteUrls, request.url)) {
            return next();
        }

        let options = config.getRequestOptions_baseData(request.headers.cookie);
        let result = null;

        try {
            result = await httpUtilities.getPromise(options);
        } catch (error) {
            Service.logger.warn(error);
        }

        if (!result || result.statusCode == 0 || result.statusCode == 401) {
            return response.redirect(config.url.login);
        }

        request.data = result;
        next();
    }

    static render(context, data) {
        let request = context[0];
        let response = context[1];

        if (!request.data) {
            data.baseData = request.data;
        }

        let pagePath = this.#getPagePathByRequest(request);
        response.render(pagePath, data);
    }
}

export default Service;