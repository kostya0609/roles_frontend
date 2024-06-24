<template>
    <Preloader :loading="loading">
        <h3 class="header_h3">
            Редактирование статичной роли c ID - {{ route.params.id }}
        </h3>
        <el-row>
            <el-col :md=12>
                <StaticRoleForm
                    mode="edit"
                    :data="role"
                />
            </el-col>
        </el-row>
    </Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Preloader } from '@/plugins/roles/shared/ui';
import { ref, inject } from "vue";
import { StaticRoleForm } from '@/plugins/roles/widgets/static-role-form';
import { notify } from "@/plugins/roles/shared/utils";
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';
import { USE_BACK_BUTTON_KEY } from '@/plugins/roles/shared/symbols';

const StaticRoleRepo = useStaticRoleRepo();

const route = useRoute();
const loading = ref(false);
const role = ref(null);
const useBackButton = inject(USE_BACK_BUTTON_KEY);

const getRole = async (id) => {
    try {
        loading.value = true;
        const result = await StaticRoleRepo.getById({ id });
        role.value = result;
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