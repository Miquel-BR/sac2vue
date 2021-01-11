<template>
    <div class="columns is-mobile teclat">
        <div class="column dau"
             :class="{selected: (isSelectable && selected == n)}"
             :style="[(!isSelectable) ? {'background-color': increase_brightness(color, (idx) * 10)} : {}]"
             v-for="(n, idx) in numbers"
             @click="click(n)"
        ><span class="bbfont" :class="(n != 0) ? '' : 'no'">{{(n != 0) ? n : 'NO'}}</span></div>
    </div>
</template>

<script>


export default {
    name: "teclat",
    props: {
        numbers: {
            type: Array,
            required: true
        },
        color: {
            type: String,
            required: false,
            default: '#333333'
        },
        isSelectable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {},
    data:function(){
        return {
            selected: 0,
        }
    },
    computed: {},
    watch: {},
    methods: {
        click: function(val){
            if(!this.isSelectable) {
                this.selected = val;
                this.$emit('selected', val);
            } else {
                this.selected = val;
                this.$emit('selected', val);
            }
        },
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
@import './../scss/mystyles.scss';

    .teclat {
        font-family: 'Gutcruncher';

        .dau {
            text-align: center;
            font-size: 2em;
            &.selected {
                color:$selected;
            }

            &:hover {
                cursor:pointer;
                span.bbfont {color:$selected;}
            }
        }
        .border {
            border-width: 2px;
            border-style: solid;

            &.sselected {
               // background-color: red;
            }
        }

        span.bbfont{
            font-family: 'dPoly Block Dice';

            &.no {font-family: 'Gutcruncher';}

            &:hover{
                color: $selected;
            }
        }
    }


</style>
