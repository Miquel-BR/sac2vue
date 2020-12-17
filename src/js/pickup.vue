<template>
    <div class="actionCluster">
        <h2>Pick-up</h2>
        <input type="button" value="Pick-up 2+ " @click="addAction('pickup2')"/>
        <input type="button" value="Pick-up 3+ " @click="addAction('pickup3')"/>
        <input type="button" value="Pick-up 4+ " @click="addAction('pickup4')"/>
        <input type="button" value="Pick-up 5+ " @click="addAction('pickup5')"/>
        <input type="button" value="Pick-up 6+ " @click="addAction('pickup6')"/>
    </div>
</template>

<script>

import {pickup} from "./actions";

export default {
    name: "pickup",
    props: ['surehandSkill', 'lonerSkill'],
    components: {},
    data:function(){
        return {}
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            switch(action) {
                case 'pickup2':
                    var theAction = new pickup(2, this.surehandSkill, this.lonerSkill );
                    break;
                case 'pickup3':
                    var theAction = new pickup(3, this.surehandSkill, this.lonerSkill );
                    break;
                case 'pickup4':
                    var theAction = new pickup(4, this.surehandSkill, this.lonerSkill );
                    break;
                case 'pickup5':
                    var theAction = new pickup(5, this.surehandSkill, this.lonerSkill );
                    break;
                case 'pickup6':
                    var theAction = new pickup(6, this.surehandSkill, this.lonerSkill );
                    break;
            }
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

<style scoped>

</style>
