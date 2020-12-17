<template>
    <div class="actionCluster">
        <h2>Catch</h2>
        <input type="button" value="catch 2+ " @click="addAction('catch2')"/>
        <input type="button" value="catch 3+ " @click="addAction('catch3')"/>
        <input type="button" value="catch 4+ " @click="addAction('catch4')"/>
        <input type="button" value="catch 5+ " @click="addAction('catch5')"/>
        <input type="button" value="catch 6+ " @click="addAction('catch6')"/>
    </div>
</template>

<script>

import {catching} from "./actions";

export default {
    name: "catch",
    props: ['catchSkill', 'lonerSkill'],
    components: {},
    data:function(){
        return {}
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            switch(action) {
                case 'catch2':
                    var theAction = new catching(2, this.catchSkill, this.lonerSkill );
                    break;
                case 'catch3':
                    var theAction = new catching(3,  this.catchSkill, this.lonerSkill );
                    break;
                case 'catch4':
                    var theAction = new catching(4,  this.catchSkill, this.lonerSkill );
                    break;
                case 'catch5':
                    var theAction = new catching(5,  this.catchSkill, this.lonerSkill );
                    break;
                case 'catch6':
                    var theAction = new catching(6,  this.catchSkill, this.lonerSkill );
                    break;
            }
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
