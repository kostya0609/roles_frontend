<template>
    <el-switch
        :active-text="activeText"
        :inactive-text="inactiveText"
        :active-value=1
        :inactive-value=0
    />
</template>
<script setup>
import { ref } from 'vue';

const activeText = ref('');
const inactiveText = ref('');

defineExpose({
    setActiveText: text => {
        activeText.value = text;
    },
    setInactiveText: text => {
        inactiveText.value = text;
    },
});

</script>