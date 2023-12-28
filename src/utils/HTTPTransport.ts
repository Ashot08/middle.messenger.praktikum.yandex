import { queryString } from './queryString';

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/', queryParams: PlainObject = {}): Promise<Response> {
    const query = queryString(queryParams);
    path += query ? `?${query}` : '';
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(
    path: string,
    data: unknown,
    type = 'application/json',
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    }, type);
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(
    url: string,
    options: Options = { method: Method.Get },
    type = 'application/json',
  ):
    Promise<Response> {
    const {
      method,
      data,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (type === 'multipart/form-data') {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', type);
        if (method === Method.Get || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
