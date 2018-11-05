<template>
    <div class="foo">
        <h1 class="header">Fooコンポーネント</h1>
        <p>これはFooコンポーネント</p>
    </div>
</template>

<script>
    export default {
        name: "foo"
    }
</script>

<style>
    p {
        text-decoration: underline;
    }

</style>

<style scoped>
    .foo {
        border: solid 1px green;
        margin: 4px;
        padding: 4px;
    }
    .header {
        font-size: 150%;
    }
</style>