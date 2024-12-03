<script>
const Counter = {
    data() {
        return {
            counter: 0
        };
    }
};

const vue = Vue.createApp(Counter).mount('#counter');
</script>

<template>
    <div id="counter">
        Counter: {{ counter }}
    </div>
</template>
