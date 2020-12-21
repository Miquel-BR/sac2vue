<template>
    <div class="columns is-mobile boto">
        <div class="column border"
             :class="{selected: (selected.includes(opt.model))}"
             v-for="opt in options"
             @click="click(opt)"
        >{{opt.name}}</div>
    </div>
</template>

<script>


export default {
    name: "boto",
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    components: {},
    data:function(){
        return {
            selected: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        click: function(opt){
            console.log("CLICK", opt);
            if(this.selected.includes(opt.model)){
                let idx = this.selected.indexOf(opt.model)
                this.selected.splice(idx, 1);
                this.$emit(opt.model, false);
            } else {
                this.selected.push(opt.model);
                this.$emit(opt.model, true);
            }
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {}
}
</script>

<style lang="scss">


    .teclat {
        font-family: 'Gutcruncher';
    }

    .teclat span.bbfont{
        font-family: 'dPoly Block Dice';

        &.no {font-family: 'Gutcruncher';}
    }
    .border {
        border-width: 2px;
        border-style: solid;
        border-color: #1D71B8;

        &.selected {
            background-color: red;
        }
    }
</style>
