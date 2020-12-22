<template>
    <div class="actionCluster armorbreak" style="text-align:left;">
        <h2>Armor Break</h2>
        <div class="buttons has-addons">
            <button class="button" @click="armorvalue = (armorvalue > 0) ? armorvalue - 1 : armorvalue">-</button>
            <button class="button">{{armorvalue}}</button>
            <button class="button" @click="armorvalue = (armorvalue < 12) ? armorvalue = armorvalue + 1 : armorvalue = 12">+</button>
        </div>
        <button class="button" @click="addAction('armorbreak')">Add</button>

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
