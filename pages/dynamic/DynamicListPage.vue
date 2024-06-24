<template>
	<div>
		<el-row :gutter="15">
			<el-col :md=12>
				<Pagination
					class="mb-2"
					:total="total"
					@update="getAll"
					ref="paginationUpRef"
				/>
			</el-col>
			<el-col :md=12>
				<SearchRole
					class="mb-2"
					v-model="selectRole"
					@clear="getAll"
				/>
			</el-col>
		</el-row>

		<el-table
			:data="roles"
			class="mb-2"
		>
			<el-table-column
				prop="_actions"
				label=""
				width="100"
			>
				<template #default="{ row }">
					<el-space>
						<!-- TODO: Исправить ссылку, чтобы можно было подставлять префикс конкретного модуля -->
						<el-button
							type="primary"
							icon="Edit"
							@click="$router.push('dynamics/detail/' + row.id)"
						/>
					</el-space>
				</template>
			</el-table-column>
			<el-table-column
				prop="id"
				label="ID"
				width="50"
			/>
			<el-table-column
				prop="title"
				label="Название"
			/>
			<el-table-column
				prop="description"
				label="Описание логики работы"
			/>
		</el-table>

		<Pagination
			:total="total"
			@update="getAll"
			ref="paginationDownRef"
		/>
	</div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useDynamicRoleRepo } from '@/plugins/roles/entities/dynamic-role/api';
import { Pagination } from '@/plugins/roles/shared/ui'
import { SearchRole } from '@/plugins/roles/entities/dynamic-role/ui'

const DynamicRoleRepo = useDynamicRoleRepo();
const selectRole = ref(null);
const roles = ref([]);
const total = ref(0);
const sort = reactive({name:'id', order: 'asc'})

const paginationUpRef = ref();
const paginationDownRef = ref();

const getAll = async (currentPage = 1, pageSize = 10) => {
	let result = await DynamicRoleRepo.getAll({
		page: currentPage,
		count: pageSize,
		sort,
	});
	roles.value = result.items;
	total.value = result.total;
};

await getAll();

const resetPaginations = () => {
	paginationUpRef.value.reset();
	paginationDownRef.value.reset();
	total.value = 1;
}

const getById = async () => {
	let result = await DynamicRoleRepo.getById({
		id: selectRole.value
	});
	roles.value = [result];

	resetPaginations();
}

watch([
	() => selectRole.value,

], () => {
	if (selectRole.value) getById(selectRole.value);
})

</script>