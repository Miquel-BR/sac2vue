<template>
    <div class="boto">
        <div class="buttons has-addons">
        <button class="button is-small"
             :class="{'is-info': (selected.includes(opt.model))}"
             v-for="opt in options"
             @click="click(opt)"
        >{{opt.name}}</button>
        </div>
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
    mounted: function () {
        let self = this;
        this.options.forEach(function(e,idx){
            if(e.hasOwnProperty('selected')){
                console.log("SELECTED", e);
                self.selected.push(e.model);
                self.$emit(e.model, true);
            }
        });
    }
}
</script>

<style lang="scss">
//@import './../scss/mystyles.scss';

.buttons.has-addons .button{
    &:focus {
        outline: none;
        box-shadow: none !important;
        border-color:rgb(208, 209, 205);
    }
    &.is-info:focus {
        border-color:#3298dc;
    }
}
</style>
