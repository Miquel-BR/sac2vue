<template>
    <div class="columns is-mobile">
        <div class="column"
             :style="{'background-color': increase_brightness(color, (idx +1) * 10)}"
             v-for="(n, idx) in numbers"
             @click="$emit('selected', n)"
        >{{n}}+</div>
    </div>
</template>

<script>


export default {
    name: "teclat",
    props: ['numbers', 'color'],
    components: {},
    data:function(){
        return {}
    },
    computed: {},
    watch: {},
    methods: {
        increase_brightness: function(hex, percent){
            // strip the leading # if it's there
            hex = hex.replace(/^\s*#|\s*$/g, '');

            // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
            if(hex.length == 3){
                hex = hex.replace(/(.)/g, '$1$1');
            }

            var r = parseInt(hex.substr(0, 2), 16),
                g = parseInt(hex.substr(2, 2), 16),
                b = parseInt(hex.substr(4, 2), 16);

            return '#' +
                ((0|(1<<8) + r * (1 - percent / 100)).toString(16)).substr(1) +
                ((0|(1<<8) + g * (1 - percent / 100)).toString(16)).substr(1) +
                ((0|(1<<8) + b * (1 - percent / 100)).toString(16)).substr(1);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
    }
}
</script>

<style lang="scss">
    .column {
        &.c0 {background-color: red;}
    }
</style>
