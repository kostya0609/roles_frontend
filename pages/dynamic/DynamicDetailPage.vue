<template>
	<Preloader :loading="loading">
		<h3 class="header_h3">Информация по динамической роли c ID - {{ route.params.id }}</h3>
		<el-table
			:data="tableData"
			stripe
			:show-header="false"
			border
		>
			<el-table-column prop="name" />
			<el-table-column prop="value" />
		</el-table>

		<CheckRole @setLoading="setLoading"/>		

		<el-space class="mt-3">
			<ChangeDataButton />
		</el-space>

	</Preloader>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { Preloader } from '@/plugins/roles/shared/ui';
import { notify } from "@/plugins/roles/shared/utils";
import { USE_BACK_BUTTON_KEY } from '@/plugins/roles/shared/symbols';
import { useDynamicRoleRepo } from '@/plugins/roles/entities/dynamic-role/api';
import { ChangeDataButton } from '@/plugins/roles/features/dynamic-role/change-data';
import { CheckRole } from '@/plugins/roles/features/dynamic-role/check-role';

const DynamicRoleRepo = useDynamicRoleRepo();

const route = useRoute();
const loading = ref(false);
const tableData = ref([]);
const useBackButton = inject(USE_BACK_BUTTON_KEY);

const setLoading = (value) => {
	loading.value = value;
}

const getRole = async (id) => {
	try {
		loading.value = true;
		const result = await DynamicRoleRepo.getById({ id });

		tableData.value.push({ name: 'Наименование роли:', value: result.title ?? 'нет данных' });
		tableData.value.push({ name: 'Активность:', value: result.is_active ? 'Да' : 'Нет' });
		tableData.value.push({ name: 'Описание логики работы роли:', value: result.description ?? 'нет данных' });
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
}


await getRole(route.params.id);

useBackButton();

</script>
