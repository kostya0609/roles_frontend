<template>
	<Preloader :loading="loading">
		<h3 class="header_h3">Информация по статичной роли c ID - {{ route.params.id }}</h3>
		<el-table
			:data="tableData"
			class="mt=2 role-table"
			stripe
			:show-header="false"
			border
		>
			<el-table-column prop="name" />
			<el-table-column>
				<template #default="{ row }">
					<div
						v-if="Array.isArray(row.value)"
						v-for="item in row.value"
						class="mb-3 role-table_col"
					>
						<UserLink :user="item"/>
					</div>
					<span v-else>
						{{ row.value }}
					</span>
				</template>
			</el-table-column>
		</el-table>

		<el-space class="mt-3">
			<ChangeDataButton />
			<DeleteRoleButton
				type="danger"
				@setLoading="setLoading"
			/>
		</el-space>
	</Preloader>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { Preloader, UserLink } from '@/plugins/roles/shared/ui';
import { notify } from "@/plugins/roles/shared/utils";
import { USE_BACK_BUTTON_KEY } from '@/plugins/roles/shared/symbols';
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';
import { ChangeDataButton } from '@/plugins/roles/features/static-role/change-data';
import { DeleteRoleButton } from '@/plugins/roles/features/static-role/delete-role';

const StaticRoleRepo = useStaticRoleRepo();
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
		const result = await StaticRoleRepo.getById({ id });

		tableData.value.push({ name: 'Наименование роли:', value: result.title ?? 'нет данных' });
		tableData.value.push({ name: 'Активность:', value: result.is_active ? 'Да' : 'Нет' });
		tableData.value.push({ name: 'Описание логики работы роли:', value: result.description ?? 'нет данных' });
		tableData.value.push({ name: 'Участники:', value: result.participants.map(item => item.user) ?? 'нет данных' });
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

await getRole(route.params.id);

useBackButton();

</script>

<style scoped>

.role-table ::v-deep(.role-table_col:last-child) {
	margin-bottom: 0px !important;
}

</style>