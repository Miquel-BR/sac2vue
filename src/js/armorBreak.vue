<template>
    <div class="actionCluster armorbreak" style="text-align:left;">
        <h2>Armor Break</h2>

        <input type="button" value="-" class="armordown" @click="armorvalue = (armorvalue > 0) ? armorvalue - 1 : armorvalue" />
        <input type="text" id="armorvalue" v-model="armorvalue" disabled="disabled"/>
        <input type="button" value="+" class="armorup" @click="armorvalue = (armorvalue < 12) ? armorvalue = armorvalue + 1 : armorvalue = 12" />
        <br/><br/>
        <input type="button" value="add" class="add" @click="addAction('armorbreak')" />
    </div>
</template>

<script>

import {armorbreak} from "./actions";

export default {
    name: "armorBreak",
    props: [],
    components: {},
    data:function(){
        return {
            armorvalue: 8
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            var theAction = new armorbreak(this.armorvalue);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT ARMOR BREAK!!");
    }
}
</script>

<style scoped>

</style>
