<template>
    <div class="actionCluster">
        <h2>Atrapar</h2>
        <teclat :numbers="numbers" :color="'#FF26A8'" @selected="action"></teclat>
    </div>
</template>

<script>

import {catching} from "./actions";
import Teclat from './teclat.vue'


export default {
    name: "catch",
    props: ['catchSkill', 'lonerSkill'],
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
            var theAction = new catching(val, this.catchSkill, this.lonerSkill );
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT CATCH!!");
    }
}
</script>

<style scoped>

</style>
