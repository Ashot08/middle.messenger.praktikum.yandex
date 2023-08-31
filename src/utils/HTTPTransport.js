var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["POST"] = "POST";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
function queryStringify(data) {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
export class HTTPTransport {
    get(url, options = { method: METHODS.GET }) {
        if (options.data) {
            url += `?${queryStringify(options.data)}`;
            options.data = {};
        }
        return this.request(url, {
            ...options,
            method: METHODS.GET,
        });
    }
    post(url, options = { method: METHODS.POST }) {
        return this.request(url, options);
    }
    put(url, options = { method: METHODS.PUT }) {
        return this.request(url, options);
    }
    delete(url, options = { method: METHODS.DELETE }) {
        return this.request(url, options);
    }
    request(url, options = { method: METHODS.GET }) {
        const { headers = {}, method, data, } = options;
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
            }
            else {
                xhr.send(data);
            }
        });
    }
}
