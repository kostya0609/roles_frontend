<template>
    <el-switch
        :active-text="activeText"
        :inactive-text="inactiveText"
        :active-value=true
        :inactive-value=false
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