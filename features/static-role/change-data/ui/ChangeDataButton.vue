<template>
    <el-button
        :type="type"
        @click="handleClick"
    >
        <slot>
            Изменить роль
        </slot>
    </el-button>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

defineProps({
    type: {
        type: String,
        default: 'primary',
    }
});

const handleClick = () => {
    router.push('/admin/roles/statics/edit/' + route.params.id);
};
</script>