import { ref } from "vue";
import { notify } from "@/plugins/roles/shared/utils";
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';

const StaticRoleRepo = useStaticRoleRepo();
const staticRole = reactive({});
const loading = ref(false);

export const useStaticRole = () => {

	/**
	* @param {number} staticRole_id
	*/
	const getStaticRole = async (staticRole_id) => {
		try {
			loading.value = true;
			const result = await StaticRoleRepo.getById({ id: staticRole_id });

			Object.assign(staticRole, result);

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return { staticRole, loading, getStaticRole }
}