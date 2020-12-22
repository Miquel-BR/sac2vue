<template>
    <div class="actionCluster">
        <h2>Recoger</h2>
        <teclat :numbers="numbers" :color="'#32A6FF'" @selected="action"></teclat>
    </div>
</template>

<script>

import {pickup} from "./actions";
import Teclat from './teclat.vue'


export default {
    name: "pickup",
    props: ['surehandSkill', 'lonerSkill'],
    components: {
        Teclat
    },
    data:function(){
        return {
            numbers: [2, 3, 4, 5, 6 ]
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new pickup(val, this.surehandSkill, this.lonerSkill );
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT PICK-UP!!");
    }
}
</script>

<style >

</style>
