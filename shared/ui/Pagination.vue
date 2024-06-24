<template>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    />
</template>
<script setup>
import { ref } from 'vue';

defineProps({
    total: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits(['update']);

const currentPage = ref(1);

const pageSize = ref(10);

const handleCurrentChange = (val) => {
    currentPage.value = val;
    emit('update', currentPage.value, pageSize.value);
};

const handleSizeChange = (val) => {
    pageSize.value = val;
    emit('update', currentPage.value, pageSize.value);
};

const reset = () => {
	currentPage.value = 1;
    pageSize.value = 10;
};

defineExpose({
  setCurrentPage: page => {
    currentPage.value = page;
  },
  setPageSize: size => {
    pageSize.value = size;
  },
  reset,
});

</script>