export class BaseRepository {
    /** @var {string} _url адрес api */
    _url = process.env.NODE_ENV == 'production' ? `${window.location.origin}/api` : 'http://localhost';


    /** @var {string} _version версия api на бэке */
    _version = 'v1';

    /** @var {string} _module название модуля, с которым будем работать */
    _module = 'sed';

    /** @var {string} _endpoint сущность, над которой будем работать */
    _endpoint = '';

    /** @var {string} _submodule имя подмодуля */
    _submodule = '';

    /**
     * @param {string} endpoint
     * @param {string} version
     */
    constructor(endpoint = '', version = 'v1') {
        this._endpoint = endpoint;
        this._version = version;
    }

    setModule(module) {
        this._module = module;
        return this;
    }

    setSubmodule(submodule) {
        this._submodule = submodule;
        return this;
    }

    setEndpoint(endpoint) {
        this._endpoint = endpoint;
        return this;
    }

    setVersion(version) {
        this._version = version;
        return this;
    }

    setProdUrl(url) {
        if (process.env.NODE_ENV === 'production') {
            this._url = url;
        }

        return this;
    }

    setDevUrl(url) {
        if (process.env.NODE_ENV === 'development') {
            this._url = url;
        }

        return this;
    }

    /**
     * @param {string} nestedEndpoint 
     * @returns {URL}
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._module}/${this._version}${this._endpoint ? '/' + this._endpoint : ''}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
    * @param {string} nestedEndpoint 
    * @returns {URL}
    */
    _buildSubmoduleUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._module}/${this._submodule}/${this._version}${this._endpoint ? '/' + this._endpoint : ''}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {{
     * 	method?: 'GET'|'POST'|'PATCH'|'DELETE'
     * 	nestedEndpoint?: string
     * 	payload?: object
     * 	options?: object
     * }} param0
     * @returns {Promise<{ success: boolean, data?: any, message?:string, notify : { title:string, message?: string, type:string, duration?: string}}>}
     */
    async _query({
        method = 'POST',
        nestedEndpoint = '',
        payload = null,
        options = { download_file: false },
        params = {},
    } = {}) {

        const url = this._submodule ? this._buildSubmoduleUrl(nestedEndpoint) : this._buildUrl(nestedEndpoint);

        let init = { method };

        if (params) {
            Object
                .entries(params)
                .forEach(([name, value]) => {
                    if (value) {
                        url.searchParams.append(name, value);
                    }
                });
        }

        if (payload) {
            let isFormData = payload instanceof FormData;

            if(isFormData) {
                payload.append('token', window._token)
                payload.append('user_id', window._userId)
            } else {
                payload.token = window._token;
                payload.user_id = window._userId;
            }   

            init = {
                ...init,
                body: isFormData ? payload : JSON.stringify(payload, function (key, val) {
                    return (typeof val === 'function') ? '' + val : val;
                }),
                headers: isFormData ? {} : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
            };
        }

        const response = await fetch(url.href, init);

        return options.download_file ? response : await response.json();
    }

}