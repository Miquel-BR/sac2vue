<template>
    <div class="actionCluster">
        <div class="columns">
            <div class="column is-three-fifths">
                <div class="columns">
                    <div class="column is-one-fifth"><b style="line-height: 3em;">Interception</b></div>
                    <div class="column">
                        <teclat :is-selectable="true" :numbers="numbersInter" :color="'#FFCCCC'" @selected="interceptionVal = $event"></teclat>
                    </div>
                </div>
            </div>
            <div class="column is-two-fifths">
                <div v-if="interceptionVal != 0" class="columns is-mobile">
                    <div class="column is-one-fifth"><b style="line-height: 2rem;">Skills</b></div>
                    <div class="column">
                        <boto :options="options" @interceptionWithPro="interceptionWithPro = $event" @interceptionWithCatch="interceptionWithCatch = $event"></boto>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-three-fifths">
                <teclat :numbers="numbers" :color="'#CC32FF'" @selected="action"></teclat>
            </div>
        </div>
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
