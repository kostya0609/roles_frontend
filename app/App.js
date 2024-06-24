import { routes } from '@/plugins/roles/pages';
import { USE_BACK_BUTTON_KEY, API_OPTIONS_KEY } from '@/plugins/roles/shared/symbols';

export default {
    /**
     * @param {import('vue').App} app
     * @param {{
	 *  API: {
	 *      DEV_URL: string
	 *      PROD_URL: string
	 *  }
	 * registerRoutes: (routes: any[]) => void
	 * prefix: ?string
	 * useBackButton: (any) => void
	 * }} options 
	 * 
	 * @returns {void}
	*/
	install(app, { registerRoutes, prefix, useBackButton, ...options }) {
		options.API = options.API || {};
		registerRoutes(routes, prefix);

		app.provide(USE_BACK_BUTTON_KEY, useBackButton);
		app.provide(API_OPTIONS_KEY, options.API);
	}
};