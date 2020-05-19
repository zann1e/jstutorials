import http from "../http-common";

class WhoisDataService {

    get(id) {
        return http.get(`/whois/${id}`);
    }

}

export default new WhoisDataService();