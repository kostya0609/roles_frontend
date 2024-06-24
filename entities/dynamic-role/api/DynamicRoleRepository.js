import { BaseRepository } from "@/plugins/roles/shared/api/BaseRepository";

export class DynamicRoleRepository extends BaseRepository{
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
            nestedEndpoint : 'dynamics/list'
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
            nestedEndpoint : 'dynamics/get'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

	/**
    * @param {{
	*  title: string;
	*  description: string;
	*  is_active: 0 | 1;
	* }} payload
	* @return {Promise<any>}
	*/
   async create(payload) {
	   const result = await this._query({
		   payload,
		   nestedEndpoint : 'dynamics/create'
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
	* }} payload
	* @return {Promise<any>}
	*/
   async update(payload) {
	   const result = await this._query({
		   payload,
		   nestedEndpoint : 'dynamics/update'
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
            nestedEndpoint : 'dynamics/search'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

	/**
    * @param {{
	*  id: number;
	*  check_user_id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async checkRole(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'dynamics/check-role'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

}