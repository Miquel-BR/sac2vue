<template>
    <div class="actionCluster">
        <h2>Go For It</h2>
        <teclat :numbers="numbers" :color="'#F25454'" @selected="action"></teclat>
    </div>
</template>

<script>

import {gfi} from "./actions";
import Teclat from "./teclat.vue";

export default {
    name: "gfi",
    props: ['surefeetSkill', 'lonerSkill'],
    components: {
        Teclat
    },
    data:function(){
        return {
            numbers: [2, 3 ]
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new gfi(val, this.surefeetSkill, this.lonerSkill);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT GFI!!");
    }
}
</script>

<style >

</style>
