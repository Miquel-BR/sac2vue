<template>
    <div class="actionCluster">
        <div class="columns">
            <div class="column is-one-fifth">Interception</div>
            <div class="column">
                <teclat :is-selectable="true" :numbers="numbersInter" :color="'#FFCCCC'" @selected="interception"></teclat>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-fifth">Skills</div>
            <div class="column">
                <boto :options="options" @interceptionWithPro="skillsPro" @interceptionWithCatch="skillsCatch"></boto>
            </div>
        </div>

        <h2>Passes</h2>
        <teclat :numbers="numbers" :color="'#CC32FF'" @selected="action"></teclat>
    </div>
</template>

<script>

import {pass} from "./actions";
import Teclat from "./teclat.vue";
import Boto from "./boto.vue"

export default {
    name: "passes",
    props: ['passSkill', 'lonerSkill'],
    components: {
        Teclat,
        Boto
    },
    data:function(){
        return {
            interceptionVal: 0,
            interceptionWithPro: false,
            interceptionWithCatch: false,
            numbers: [2, 3, 4, 5, 6 ],
            numbersInter: [0, 2, 3, 4, 5, 6 ],
            options: [
                {
                    name: 'Pro',
                    model: 'interceptionWithPro',
                },
                {
                    name: 'Catch',
                    model: 'interceptionWithCatch',
                }
            ],
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new pass(val, this.passSkill, this.lonerSkill,
                this.interceptionVal, this.interceptionWithPro, this.interceptionWithCatch );
            this.$emit('action', theAction);
        },
        interception: function(val){
            this.interceptionVal = val;
        },
        skillsPro: function(val){
            this.interceptionWithPro = val;
        },
        skillsCatch: function(val){
            this.interceptionWithCatch = val;
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT GFI!!");
    }
}
</script>

<style>

</style>
