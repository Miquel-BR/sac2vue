<template>
    <div class="actionCluster">
        <h2>Other Action</h2>
        <input type="button" value="action 2+ " @click="addAction('action2')"/>
        <input type="button" value="action 3+ " @click="addAction('action3')"/>
        <input type="button" value="action 4+ " @click="addAction('action4')"/>
        <input type="button" value="action 5+ " @click="addAction('action5')"/>
        <input type="button" value="action 6+ " @click="addAction('action6')"/>
    </div>
</template>

<script>

import {playerAction} from "./actions";

export default {
    name: "otherAction",
    props: ['lonerSkill'],
    components: {},
    data:function(){
        return {}
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            switch(action) {
                case 'action2':
                    var theAction = new playerAction(2, this.lonerSkill);
                    break;
                case 'action3':
                    var theAction = new playerAction(3, this.lonerSkill);
                    break;
                case 'action4':
                    var theAction = new playerAction(4, this.lonerSkill);
                    break;
                case 'action5':
                    var theAction = new playerAction(5, this.lonerSkill);
                    break;
                case 'action6':
                    var theAction = new playerAction(6, this.lonerSkill);
                    break;
            }
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT OTHER ACTION!!");
    }
}
</script>

<style scoped>

</style>
