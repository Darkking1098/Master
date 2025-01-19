let response;
(() => {
    function ajax(config) {
        if (!config.url) throw new Error("Request url not defined");
        let xhr = new XMLHttpRequest();
        xhr.timeout = config.timeout || 0;

        // Handling form data
        let formData;

        if (config.form?.MU?.serialize) formData = config.form.MU.serialize();
        else if (config.form instanceof HTMLFormElement)
            formData = new FormData(config.form);
        else formData = new FormData();

        if (typeof formData.MU?.appendData === "function") {
            formData.MU.appendData(config.data ?? {});
        } else if (config.data) {
            for (const key in config.data) {
                formData.append(key, config.data[key]);
            }
        }
        config.modifyData && config.modifyData(formData);

        xhr.open(config.method || "GET", config.url, config.async ?? true);

        for (const key in config.headers ?? {})
            xhr.setRequestHeader(key, config.headers[key]);

        xhr.onloadstart = config.before;
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (config.success) config.success(xhr.response);
                else console.log(xhr);
            } else {
                if (config.error) config.error(xhr, xhr.status, xhr.statusText);
            }
        };
        xhr.onabort = config.abort;
        xhr.onerror = function () {
            if (config.error) config.error(xhr, xhr.status, xhr.statusText);
        };
        xhr.ontimeout = config.onTimeout;
        xhr.onloadend = config.after;

        // Loading methods
        xhr.upload.onloadstart = config.beforeUpload;
        xhr.upload.onloadend = config.afterUpload;
        xhr.upload.onprogress = config.progress;

        xhr.send(formData);
        return xhr;
    }
    function mFetch(config) {
        return new Promise((resolve, reject) => {
            ajax({
                ...config,
                success: (response) => resolve(response),
                error: (xhr, status, statusText) =>
                    reject({ xhr, status, statusText }),
            });
        });
    }

    window.MU.ajax = ajax;
    window.ajax = ajax;
    window.MU.mFetch = mFetch;
    window.mFetch = mFetch;
})();
