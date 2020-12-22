<template>
    <div class="actionCluster container dodge">
        <h2>Esquivar</h2>
        <teclat :numbers="numbers" :color="'#0CFFC2'" @selected="action"></teclat>
    </div>
</template>

<script>

import {dodge} from "./actions";
import Teclat from './teclat.vue'

export default {
    name: "dodge",
    props: ['dodgeSkill', 'lonerSkill'],
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
            let theAction = new dodge(val, this.dodgeSkill, this.lonerSkill);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT DODGE!!");
    }
}
</script>

<style>
</style>
