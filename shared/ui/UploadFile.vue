<template>
  <el-upload
    ref="upload"
    class="upload"
    :auto-upload="autoUpload"
    drag
    @exceed="handleExceed"
    @preview="download"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Перенесите файл в эту область или нажмите на иконку <em>загрузки</em>
    </div>

    <template #file="{ file }">
      <slot
        name="file"
        :file="file"
      />
    </template>
  </el-upload>
</template>
<script setup>
import { genFileId } from 'element-plus';
import { ref, defineExpose } from 'vue';

const props = defineProps({
  autoUpload: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits([
  'exceed', 'preview'
])

const upload = ref();

const handleExceed = (files, uploadFiles) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
  props.autoUpload && upload.value.submit();
  emit('exceed', files, uploadFiles);
};

const download = (file) => {
  const link = document.createElement('a');
  link.href = file.url;
  link.download = file.name;
  link.click();
  emit('preview', file);
};

defineExpose({
  ref: upload,
});
</script>