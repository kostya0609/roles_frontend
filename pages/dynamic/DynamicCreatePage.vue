<template>
    <h3 class="header_h3">
        Создание динамической роли
    </h3>
    <el-row>
        <el-col :md=12>
            <DynamicRoleForm mode="create" />
        </el-col>
    </el-row>
</template>

<script setup>

import { inject } from "vue";
import { DynamicRoleForm } from '@/plugins/roles/widgets/dynamic-role-form';
import { USE_BACK_BUTTON_KEY } from '@/plugins/roles/shared/symbols';

const useBackButton = inject(USE_BACK_BUTTON_KEY);


useBackButton();
</script>