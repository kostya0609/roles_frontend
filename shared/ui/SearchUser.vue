<template>
  <el-select
    :class="['width-full']"
    filterable
    remote
    reserve-keyword
    :remote-method="search"
    placeholder="Введите ФИО"
    clearable
    :loading="loading"
    value-key="id"
  >
    <el-option
      v-for="item in users"
      :key="item.id"
      :label="item.full_name"
      :value="item"
    />
  </el-select>

</template>
<script setup>
import { ref } from 'vue';
import { useUserRepo } from '@/plugins/roles/shared/api';
import { notify } from '@/plugins/roles/shared/utils';

const props = defineProps({
  options: {
    type: Array,
    default: [],
  }
})

const UserRepo = useUserRepo();

const users = ref(props.options);
const loading = ref(false);

const search = async (query) => {
  if (!query) return;

  try {
    loading.value = true;
    const result = await UserRepo.search(query);

    users.value = result;

  } catch (e) {
    notify.error(e.message);
    throw e;
  } finally {
    loading.value = false;
  }
};

defineExpose({
  setUsers: userList => {
    users.value = userList;
  },
  setUser: (id, full_name, photo = null, link = null) => {
    users.value = [
      {
        value: id,
        label: full_name,
        photo,
        link,
      }
    ];
  },
});
</script>
