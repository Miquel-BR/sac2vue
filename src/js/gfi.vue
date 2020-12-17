<template>
    <div class="actionCluster">
        <h2>Go For It</h2>
        <input type="button" value="gfi 2+ " @click="addAction('gfi2')"/>
        <input style="width:120px" type="button" value="gfi 3+ (blizzard)" @click="addAction('gfi3')"/>
    </div>
</template>

<script>

import {gfi} from "./actions";

export default {
    name: "gfi",
    props: ['surefeetSkill', 'lonerSkill'],
    components: {},
    data:function(){
        return {}
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            switch(action) {
                case 'gfi2':
                    var theAction = new gfi(2, this.surefeetSkill, this.lonerSkill);
                    break;
                case 'gfi3':
                    var theAction = new gfi(3, this.surefeetSkill, this.lonerSkill);
                    break;
            }
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

<style scoped>

</style>
