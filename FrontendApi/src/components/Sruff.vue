<template>
    <div id="counter">
        Counter: {{ counter }}
    </div>
</template>

<script>

const Counter = {
    data() { return {counter: 0} }
}

const vue = Vue.CreateApp(Counter).mount('#counter')

</script>