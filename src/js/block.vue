<template>
    <div class="actionCluster block" style="text-align:left;">
        <h2>Blocks</h2>
        <b>Dice</b>
        <br/>
        <br/>
        <div class="columns">
            <div class="column" @click="daus(-3)" :class="(dice == -3) ? 'selected' : ''">-&nbsp;<span class="bbfont">6&nbsp;6&nbsp;6</span></div>
            <div class="column" @click="daus(-2)" :class="(dice == -2) ? 'selected' : ''">-&nbsp;<span class="bbfont">6&nbsp;6</span></div>
            <div class="column" @click="daus(1)" :class="(dice == 1) ? 'selected' : ''"><span class="bbfont">6</span></div>
            <div class="column" @click="daus(2)" :class="(dice == 2) ? 'selected' : ''"><span class="bbfont">6&nbsp;6</span></div>
            <div class="column" @click="daus(3)" :class="(dice == 3) ? 'selected' : ''"><span class="bbfont">6&nbsp;6&nbsp;6</span></div>
        </div>
        <br/><br/>
        <b>Success</b>
        <br/><br/>
        <div class="columns">
            <div class="column bbfont">g</div>
        </div>
        <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessSkull" value="blockSuccessSkull" v-model="success"/><label for="blockSuccessSkull"><img src="img/skull.jpg" alt="skull"/></label>
        <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessPowSkull" value="blockSuccessPowSkull" v-model="success"/><label for="blockSuccessPowSkull"><img src="img/powskull.jpg" alt="powskull"/></label>
        <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessPush" value="blockSuccessPush" v-model="success"/><label for="blockSuccessPush"><img src="img/push.jpg" alt="push"/></label>
        <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessStumble" value="blockSuccessStumble" v-model="success"/><label for="blockSuccessStumble"><img src="img/stumbles.jpg" alt="stumbles"/></label>
        <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessDown" value="blockSuccessDown" v-model="success"/><label for="blockSuccessDown"><img src="img/pow.jpg" alt="pow"/></label>

        <br/>
        <br/>
        <input type="button" value="add" class="add" @click="addAction('block')" />
    </div>
</template>

<script>

import {block} from "./actions";

export default {
    name: "block",
    props: ['lonerSkill'],
    components: {},
    data:function(){
        return {
            dice: null,
            success: ['blockSuccessStumble','blockSuccessDown']
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            let nbDice = parseInt(this.dice);

            //number of success on the block die
            var nbSuccess = 0;
            this.success.forEach(function (ele,idx, arr){
                if (ele == 'blockSuccessPush'){
                    nbSuccess = nbSuccess + 2;
                } else {
                    nbSuccess = nbSuccess + 1;
                }
            });

            var theAction = new block(nbDice,nbSuccess, this.lonerSkill);

            this.$emit('action', theAction);
        },
        daus: function(val){
            this.dice = val;
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT BLOCK!!");
    }
}
</script>

<style>
.bbfont {
    font-family: 'dPoly Block Dice';
}

.selected {
    border: 1px solid red;
}

</style>
