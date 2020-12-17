<template>
    <div class="actionCluster">
        <h2>Passes</h2>
        <teclat :numbers="numbers" :color="'#CC32FF'" @selected="action"></teclat>
        <br/>
        <b>Interception **:</b>
        <input class="interception" type="radio" value="interception No" checked="checked" name="interception" id="interceptionNo" />
        <label class="interceptionLabel" for="interceptionNo" checked="checked">No</label>
        <br/>
        Roll:
        <input  class="interception" type="radio" value="2" name="interception" id="interception2" v-model="interception"/>
        <label class="interceptionLabel" for="interception2">2+</label>
        <input class="interception" type="radio" value="3" name="interception" id="interception3" v-model="interception"/>
        <label class="interceptionLabel" for="interception3">3+</label>
        <input class="interception" type="radio" value="4" name="interception" id="interception4"v-model="interception" />
        <label class="interceptionLabel" for="interception4">4+</label>
        <input class="interception" type="radio" value="5" name="interception" id="interception5" v-model="interception"/>
        <label class="interceptionLabel" for="interception5">5+</label>
        <input class="interception" type="radio" value="6" name="interception" id="interception6" v-model="interception"/>
        <label class="interceptionLabel" for="interception6">6+</label>
        <br/>
        Skills :
        <input class="interception" type="checkbox" value="interception with Pro skill" name="interceptionPro" id="interceptionWithPro" v-model="interceptionWithPro"/>
        <label class="interceptionLabel" for="interceptionWithPro" checked="checked">Pro</label>
        <input class="interception" type="checkbox" value="interception with Catch skill" name="interceptionCatch" id="interceptionWithCatch" v-model="interceptionWithCatch"/>
        <label class="interceptionLabel" for="interceptionWithCatch" checked="checked">Catch</label>
    </div>
</template>

<script>

import {pass} from "./actions";
import Teclat from "./teclat.vue";

export default {
    name: "passes",
    props: ['passSkill', 'lonerSkill'],
    components: {
        Teclat
    },
    data:function(){
        return {
            interception: "0",
            interceptionWithPro: false,
            interceptionWithCatch: false,
            numbers: [2, 3, 4, 5, 6 ]
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new pass(val, this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
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
