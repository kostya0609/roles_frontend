<template>
	<h3 class="header_h3">
		Создание статичной роли
	</h3>
	<el-row>
		<el-col :md=12>
			<StaticRoleForm mode="create" />
		</el-col>
	</el-row>
</template>

<script setup>
import { inject } from 'vue';
import { StaticRoleForm } from '@/plugins/roles/widgets/static-role-form';
import { USE_BACK_BUTTON_KEY } from '@/plugins/roles/shared/symbols';

const useBackButton = inject(USE_BACK_BUTTON_KEY);
useBackButton();

</script>