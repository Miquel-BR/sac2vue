<template>
    <div class="actionCluster">
        <h2>Passes</h2>
        <input type="button" value="pass 2+ " @click="addAction('pass2')"/>
        <input type="button" value="pass 3+ " @click="addAction('pass3')"/>
        <input type="button" value="pass 4+ " @click="addAction('pass4')"/>
        <input type="button" value="pass 5+ " @click="addAction('pass5')"/>
        <input type="button" value="pass 6+ " @click="addAction('pass6')"/>
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

export default {
    name: "passes",
    props: ['passSkill', 'lonerSkill'],
    components: {},
    data:function(){
        return {
            interception: "0",
            interceptionWithPro: false,
            interceptionWithCatch: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            switch(action) {
                case 'pass2':
                    var theAction = new pass(2, this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
                    break;
                case 'pass3':
                    var theAction = new pass(3,  this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
                    break;
                case 'pass4':
                    var theAction = new pass(4,  this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
                    break;
                case 'pass5':
                    var theAction = new pass(5,  this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
                    break;
                case 'pass6':
                    var theAction = new pass(6,  this.passSkill, this.lonerSkill, this.interception, this.interceptionWithPro, this.interceptionWithCatch );
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
