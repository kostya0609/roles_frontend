<template>
    <el-button
        :type="type"
        @click="handleClick"
    >
        <slot>
            Удалить роль
        </slot>
    </el-button>
</template>
<script setup>

import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';
import { notify } from "@/plugins/roles/shared/utils";

const route = useRoute();
const router = useRouter();

defineProps({
    type: {
        type: String,
        default: 'primary',
    }
});

const emit = defineEmits(['setLoading'])

const StaticRoleRepo = useStaticRoleRepo();
const handleClick = async () => {
    try {
        await ElMessageBox.confirm(`Вы уверены, что хотите удалить роль c ID ${route.params.id} - ?`);
        emit('setLoading', true);
        await StaticRoleRepo.delete({ id: route.params.id });

        router.push('/admin/roles/statics');
    } catch (e) {
        if (e !== 'cancel') {
            notify.fetchError(e.message);
            throw e;
        }
    } finally {
        emit('setLoading', false);
    }
};

</script>