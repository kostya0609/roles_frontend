<template>
    <h4 class="header_h4">Проверить действие роли на пользователе</h4>
    <el-row :gutter="20">
        <el-col :md="12">
            <SearchUser
                v-model="checkUser"
                @change="checkRole"
            />
        </el-col>
        <el-col :md="12">
            <div
                v-for="user in roleUser"
                class="mb-3"
            >
                <UserLink :user="user" />
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { notify } from "@/plugins/roles/shared/utils";
import { useDynamicRoleRepo } from '@/plugins/roles/entities/dynamic-role/api';
import { SearchUser, UserLink } from "@/plugins/roles/shared/ui";

const emit = defineEmits(['setLoading'])

const DynamicRoleRepo = useDynamicRoleRepo();
const route = useRoute();
const checkUser = ref(null);
const roleUser = ref([]);

const checkRole = async () => {
    if(!checkUser.value) return
    try {
        emit('setLoading', true);
        const result = await DynamicRoleRepo.checkRole({ id: route.params.id, check_user_id: checkUser.value.id });
        roleUser.value = result;

    } catch (e) {
        notify.fetchError(e.message);
        throw e;
    } finally {
        emit('setLoading', false);
    }
};

</script>