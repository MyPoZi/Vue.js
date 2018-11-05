<template>
    <div id="root">
        <h1 class="header">Rootコンポーネント</h1>
        <p>これはRootコンポーネント</p>
        <foo></foo>
        <bar></bar>
    </div>
</template>

<script>
    import Foo from "./foo";
    import Bar from "./bar";
    export default {
        name: "Root",
        components: {Bar, Foo}
    }
</script>

<style>
    #root {
        border: solid 1px blue;
        margin: 4px;
        padding: 4px;
    }
    .header {
        font-size: 200%;
    }

</style>