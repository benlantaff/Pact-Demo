import axios from "axios";
import adapter from "axios/lib/adapters/http";

axios.defaults.adapter = adapter;

export class API {
  constructor(url) {
    if (url === undefined || url === "") {
      url = "http://127.0.0.1:3000";
    }
    if (url.endsWith("/")) {
      url = url.substr(0, url.length - 1);
    }
    this.url = url;
  }

  withPath(path) {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    return `${this.url}${path}`;
  }

  async getAllItems() {
    return axios.get(this.withPath("/items")).then((r) => r.data);
  }

  async getItem(id) {
    return axios.get(this.withPath("/item/" + id)).then((r) => r.data);
  }
}

export default new API("http://127.0.0.1:3000");
