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
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { Preloader, Switch } from "@/plugins/roles/shared/ui";
import { notify } from "@/plugins/roles/shared/utils";
import { useDynamicRoleRepo } from '@/plugins/roles/entities/dynamic-role/api';

const props = defineProps({
  mode: String,
  data: {
    type: Object,
    required: false,
    default: null,
  },
});

const DynamicRoleRepo = useDynamicRoleRepo();
const loading = ref(false);
const router = useRouter();
const form = ref();

const rules = reactive({
  title: { required: true, message: 'Необходимо ввести наименование роли' },
  description: { required: true, message: 'Необходимо ввести описание логики работы роли' },
});

const formData = reactive({
  id: null,
  title: null,
  description: null,
  is_active: 1,
});

const submit = async () => {
  form.value.validate(async (isValid) => {
    if (!isValid) return;

    try {
      loading.value = true;
      const id = props.mode === 'create' ? await DynamicRoleRepo.create(formData) : await DynamicRoleRepo.update(formData);

      router.push('/admin/roles/dynamics/detail/' + id);

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
  } = props.data;

  formData.id = id;
  formData.title = title;
  formData.description = description;
  formData.is_active = is_active;
};

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
