import http from "../http-common";

class WhoisDataService {

    get(id) {
        return http.get(`/whois/${id}`);
    }

    getAll() {
        return http.get(`/whois`);
    }

}

export default new WhoisDataService();