<template>
    <div class="actionCluster container">
        <h2>Dodges</h2>
        <div class="columns is-mobile">
            <div class="column" v-for="n in numbers" @click="action(n)">{{n}}+</div>
        </div>
    </div>
</template>

<script>

import {dodge} from "./actions";

export default {
    name: "dodge",
    props: ['dodgeSkill', 'lonerSkill'],
    components: {},
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
