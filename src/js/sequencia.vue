<template>
    <div class="sequencia columns is-multiline is-mobile is-gapless">
        <div v-for="(seq, idx) in sseq" :key="idx"
             class="column is-one-third-mobile is-2-tablet is-2-desktop">
            <div class="notification" @click="clickSeq(idx)" style="margin: 0.5rem;" :style="{'background-color': color(idx)}">
                <button class="delete is-small" @click.stop="deleteSeq(idx);"></button>
                <!--div class="arrow-right" @click.stop="finsSeq(idx)"></div-->
                <span v-html="seq"></span>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "sequencia",
    props: {
        sequencia: {
            type: Array,
            required: true
        },
        show: {
            type: Array,
            required: false,
        },
        pinta: {
            type: Number,
            required: false,
        }
    },
    components: {},
    data:function(){
        return {
            sssseq: []
        }
    },
    computed: {
       sseq: function(){
           let self =this;
           let r = [];
           this.sequencia.forEach(function(e, idx){
               r.push(e);
           });
           if (this.show.length != 0){

               this.show.forEach(function(ele, idx){

                       let k = ele.idx;
                       let v = ele.proba;
                       r[k] = `${Math.round(v.noReRoll*100)/100}%&nbsp;&nbsp;&nbsp;${Math.round(v.reRoll*100)/100}%<span class="num">&nbsp;</span>`;
               });
           }
           return r;
       },
    },
    watch: {},
    methods: {
        color: function(idx){
            if(this.pinta == null || this.pinta < idx){
                return 'whitesmoke';
            } else {
                let passos = 100 / (this.sequencia.length - idx +2);
                return this.increase_brightness('#3298DC', (this.pinta + 2 - idx) * passos);
            }
        },
        deleteSeq: function(idx){
            this.$emit('delete', idx);

        },
        clickSeq: function(idx){
            this.$emit('clickar', idx);
        },
        finsSeq: function (idx){
            this.$emit('fins', idx);
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
                ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT SEQUENCIA!!");
    }
}
</script>

<style lang="scss">
@import './../scss/mystyles.scss';
@import '../scss/variables.scss';

.arrow-right {
    position: absolute;
    right: 0.75rem;
    bottom: 0.5rem;

    cursor:pointer;

    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;

    border-left: 6px solid hsl(204, 86%, 53%);
}

.sequencia .notification{
    margin: 0.5rem;
    padding-left: 0.5rem;
    font-size: 0.60rem;
    white-space: nowrap;
    position: relative;

    @include from($tablet) {
        padding-left: 1.5rem;
    }

    .num {
        font-size: 0.80rem;
        font-weight: bold;

        &.vermell {
            color:red;
        }
    }

    .hab {
        color: $selected;
        font-size: 0.55rem;
        position: absolute;
        display: block;

        &.solitario {
            top: 0.1rem;
            color: red;
        }
    }

}

</style>
