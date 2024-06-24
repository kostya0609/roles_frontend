import { BaseRepository } from "@/plugins/roles/shared/api/BaseRepository";

export class StaticRoleRepository extends BaseRepository {
	constructor() {
        super();
        this.setModule('roles');
    }
    
	/**
    * @param {{
	*   count: number;
	*   page: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async getAll(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'statics/list'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

	/**
    * @param {{
	*  id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async getById(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'statics/get'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

	/**
     * @param {string} query
     * @return Promise<any>
     */
    async search(q) {
        const result = await this._query({
            payload : {q},
            nestedEndpoint : 'statics/search'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }
	
	/**
     * @param {{
	 *  title: string;
	 * 	description: string;
	 *  is_active: 0 | 1;
	 *  participants: [number];
	 * }} payload
     * @return {Promise<any>}
     */
    async create(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'statics/create'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

	/**
    * @param {{
	*  id: number;
	*  title: string;
	*  description: string;
	*  is_active: 0 | 1;
	*  participants: [number];
	* }} payload
	* @return {Promise<any>}
	*/
   async update(payload) {
	   const result = await this._query({
		   payload,
		   nestedEndpoint : 'statics/update'
	   });
	   if (!result.success)
		   throw new Error(result.message);

	   return result.data;
   }

    /**
    * @param {{
	*  id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async delete(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'statics/delete'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

}