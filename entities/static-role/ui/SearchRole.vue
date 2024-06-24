<template>
  <el-select
    :class="['width-full']"
    filterable
    remote
    reserve-keyword
    :remote-method="search"
    placeholder="Поиск роли по названию"
    clearable
    :loading="loading"
  >
    <el-option
      v-for="item in roles"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { ref } from 'vue';
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';
import { notify } from '@/plugins/roles/shared/utils';

const StaticRoleRepo = useStaticRoleRepo();
const roles = ref([]);
const loading = ref(false);

const search = async (q) => {
  if (!q) return;

  try {
    loading.value = true;
    const result = await StaticRoleRepo.search(q);

    roles.value = result;
  } catch (e) {
    notify.error(e.message);
    throw e;
  } finally {
    loading.value = false;
  }
};

</script>
