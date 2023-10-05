enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type IOptionType = {
  method?: METHODS;
  data?: any;
  headers?: any;
};

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get(url: string): Promise<XMLHttpRequest> {
    return this.request(this.endpoint + url);
  }

  post(url: string, options?: unknown): Promise<XMLHttpRequest> {
    return this.request(this.endpoint + url, { method: METHODS.POST, data: options });
  }

  put(url: string, options: unknown): Promise<XMLHttpRequest> {
    return this.request(this.endpoint + url, { method: METHODS.PUT, data: options });
  }

  delete(url: string, options: unknown): Promise<XMLHttpRequest> {
    return this.request(this.endpoint + url, { method: METHODS.DELETE, data: options });
  }

  request(url: string, options: IOptionType = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    const {
      headers = {},
      method,
      data,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        reject('No method');
        return;
      }

      xhr.open(method, url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        console.log(xhr);
        resolve(xhr);
      };

      Object.keys(headers)
        .forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
