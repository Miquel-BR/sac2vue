<template>
    <div class="actionCluster injury" style="text-align:left;">
        <h2>Injury Roll</h2>
        <input class="" type="checkbox" value="" name="injuryStun" v-model="injuryStun" id="injuryStun" />
        <label class="injuryLabel" for="injuryStun" checked="checked">stun</label>
        <input class="" type="checkbox" value="" name="injuryKO" id="injuryKO" v-model="injuryKO"/>
        <label class="injuryLabel" for="injuryKO" checked="checked">KO</label>
        <input class="" type="checkbox" value="" name="injuryCas" id="injuryCas" v-model="injuryCas" />
        <label class="injuryLabel" for="injuryCas" checked="checked">CAS</label>
        <br/><br/>
        <input type="button" value="add" class="add" @click="addAction('injury')" />
    </div>
</template>

<script>

import {injury} from "./actions";

export default {
    name: "injury",
    props: [],
    components: {},
    data:function(){
        return {
            injuryStun: false,
            injuryKO:false,
            injuryCas:false
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            var theAction = new injury(this.injuryStun, this.injuryKO, this.injuryCas);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT INJURY!!");
    }
}
</script>

<style scoped>

</style>
