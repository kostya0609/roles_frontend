<template>
  <Preloader :loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      label-width="auto"
      label-position="left"
      ref="form"
      class="form"
    >
      <el-form-item
        label="Наименование роли"
        class="form__item"
        prop="title"
      >
        <el-input
          v-model="formData.title"
          placeholder="Наименование роли"
        />
      </el-form-item>

      <el-form-item
        label="Активность"
        class="form__item"
        prop="is_active"
      >
        <Switch v-model="formData.is_active" />
      </el-form-item>

      <el-form-item
        label="Описание логики работы роли"
        class="form__item"
        prop="description"
      >
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="5"
          placeholder="Введите текст"
        />
      </el-form-item>

      <el-form-item
        label="Участники"
        class="form__item"
        prop="users"
      >
      
        <SearchUser
          v-model="findUser"
          @change="addUser"
          class="form__input"
        />

        <el-table
          :data="formData.users"
          class="mt=2"
        >

          <el-table-column prop="_user">
            <template #default="{ row }">
              <UserLink :user="row" />
            </template>

          </el-table-column>

          <el-table-column
            prop="_actions"
            width="60"
          >
            <template #default="{ row }">
              <el-space>
                <el-button
                  type="danger"
                  icon="Delete"
                  @click="deleteUser(row)"
                />
              </el-space>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>

      <el-button
        type="primary"
        @click="submit"
      >
        Сохранить данные
      </el-button>

    </el-form>
  </Preloader>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Preloader, Switch, SearchUser, UserLink } from "@/plugins/roles/shared/ui";
import { notify } from "@/plugins/roles/shared/utils";
import { ElMessageBox } from "element-plus";
import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';

const props = defineProps({
  mode: String,
  data: {
    type: Object,
    required: false,
    default: null,
  },
});

const StaticRoleRepo = useStaticRoleRepo();
const loading = ref(false);
const router = useRouter();
const form = ref();

const rules = reactive({
  title: { required: true, message: 'Необходимо ввести наименование роли' },
  description: { required: true, message: 'Необходимо ввести описание логики работы роли' },
  users: { required: true, message: 'Необходимо указать Участников', trigger: 'blur' },
});

const formData = reactive({
  id: null,
  title: null,
  description: null,
  is_active: 1,
  users: [],
});

const findUser = ref(null);

const addUser = () => {
  let exists = formData.users.find(el => el.id === findUser.value.id);
  if (exists) {
    notify.error('Участник уже выбран');
    return
  }
  formData.users.push(findUser.value);
  findUser.value = null;
};

const deleteUser = (row) => {
  ElMessageBox.confirm(`Вы уверены, что хотите удалить участника - ${row.full_name}?`)
    .then(() => {
      formData.users = formData.users.filter(el => el.id !== row.id);
    })
    .catch(() => { })
};

const submit = async () => {
  form.value.validate(async (isValid) => {
    if (!isValid) return;

    let formDataToSend = Object.assign({}, formData);
    formDataToSend.users = formDataToSend.users.map(el => el.id);

    try {
      loading.value = true;
      const id = props.mode === 'create' ? await StaticRoleRepo.create(formDataToSend) : await StaticRoleRepo.update(formDataToSend);

      router.push('/admin/roles/statics/detail/' + id);

    } catch (e) {
      notify.fetchError(e.message);
      throw e;
    } finally {
      loading.value = false;
    }

  });
};

if (props.mode === 'edit') {

  const {
    id,
    title,
    description,
    is_active,
    participants,
  } = props.data;

  formData.id = id;
  formData.title = title;
  formData.description = description;
  formData.is_active = is_active;
  formData.users = participants.map(item => item.user)
};

watch([() => formData.users.length], () => {
  form.value.validateField(['users'], () => null);
})

</script>

<style
  scoped
  lang="scss"
>
.form {
  &__item {}

  &__sub-item {
    flex: 1;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  &__select {
    flex: 1 1 300px;
  }

  &__input {
    flex: 1 1 300px;
  }
}
</style>
