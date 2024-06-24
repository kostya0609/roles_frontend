<template>
    <div>
        <el-link
            :underline="false"
            :href="user.link"
            target="_blank"
            class="photo"
            :style="`background-image: url('${user.photo ?? '/assets/img/no_photo.png'}');`"
        />
        <el-link
            :underline="false"
            :href="user.link"
            target="_blank"
        >
            {{ user.full_name }}
        </el-link>
    </div>
</template>

<script setup>

defineProps({
    user: {
        type: Object,
        required: true
    },
})

</script>

<style>
.photo {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-size: cover;
    margin-right: 5px;
}
</style>