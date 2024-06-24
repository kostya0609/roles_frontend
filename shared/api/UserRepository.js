import {BaseRepository} from "./BaseRepository";

export class UserRepository extends BaseRepository {
    constructor() {
        super('users', 'v2');
    }

    /**
     * nestedEndpoint?: string
     * @returns {module:url.URL}
     */
    _buildUrl(nestedEndpoint){
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {string} query
     * @return Promise<any>
     */
    async search(query) {
        const result = await this._query({
            payload : {query},
            nestedEndpoint : 'search'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }
}