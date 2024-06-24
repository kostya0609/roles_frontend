import { inject } from "vue";
import { API_OPTIONS_KEY } from '@/plugins/roles/shared/symbols';

export const useRepoDecorator = (repoClass) => {
	const API_OPTIONS = inject(API_OPTIONS_KEY);
	
	const repo = new repoClass();

	API_OPTIONS.DEV_URL && repo.setDevUrl(API_OPTIONS.DEV_URL);
	API_OPTIONS.PROD_URL && repo.setProdUrl(API_OPTIONS.PROD_URL);

	return repo;
};