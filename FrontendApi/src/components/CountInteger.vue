<script>
export default {
    data() { 
        return { 
            counter: 0 
        } 
    }    
}
</script>

<template>
    <button @click="counter++">AI!!! oled mind toksinud {{ counter }} korda. :c</button>
    <div id="counter">
        Counter: {{ counter }}
    </div>
</template>