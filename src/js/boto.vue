<template>
    <div class="columns boto is-mobile is-multiline">
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
        },
        isAlone: {
            type: Boolean,
            required: false,
            default: false
        },
        clearSelected: {
            type: Boolean,
            required: false
        },
    },
    components: {},
    data:function(){
        return {
            selected: []
        }
    },
    computed: {},
    watch: {
        clearSelected: function(newVal, oldVal){
            this.selected = new Array();
        }
    },
    methods: {
        click: function(opt){
            console.log("CLICK", opt);
            if(!this.selected.includes(opt.model)){
                if(this.isAlone){
                    this.selected = new Array();
                }
                this.selected.push(opt.model);
                this.$emit(opt.model, true);
            } else {
                let idx = this.selected.indexOf(opt.model);
                this.selected.splice(idx, 1);
                this.$emit(opt.model, false);
            }
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {}
}
</script>

<style lang="scss">
@import './../scss/mystyles.scss';

    .teclat {
        font-family: 'Gutcruncher';
    }

    .teclat span.bbfont{
        font-family: 'dPoly Block Dice';

        &.no {font-family: 'Gutcruncher';}
    }
    .border {
        //border-width: 2px;
        //border-style: solid;
        //border-color: #1D71B8;

        &.selected {
            color: $selected;
        }
    }
</style>
