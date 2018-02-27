<template  lang="pug">
  .warning
    h2 {{message}}
</template>

<script>
  export default {
    name: "warning",
    props: {message:{default: 'Введите ID пользователя'}},
  }
</script>

<style scoped lang="scss">
  .warning h1 {
    margin-left: 2px;
  }
</style>
