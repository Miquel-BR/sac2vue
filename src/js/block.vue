<template>
    <div class="actionCluster block" style="text-align:left;">
        <div class="columns">
            <div class="column is-half">
                <b>Block</b>
                <div class="columns daus">
                    <div class="column" @click="daus(-3)" :class="(dice == -3) ? 'selected' : ''" style="color:red;"><span class="bbfont">igh</span></div>
                    <div class="column" @click="daus(-2)" :class="(dice == -2) ? 'selected' : ''" style="color:red;"><span class="bbfont">hi</span></div>
                    <div class="column" @click="daus(1)" :class="(dice == 1) ? 'selected' : ''"><span class="bbfont">j</span></div>
                    <div class="column" @click="daus(2)" :class="(dice == 2) ? 'selected' : ''"><span class="bbfont">hh</span></div>
                    <div class="column" @click="daus(3)" :class="(dice == 3) ? 'selected' : ''"><span class="bbfont">hji</span></div>
                </div>
            </div>
            <div class="column">
                <b>Success</b>
                <div class="columns">
                    <div class="column bbfont roll is-1" @click="pow('blockSuccessSkull')" :class="{selected: (success.includes('blockSuccessSkull'))}">h</div>
                    <div class="column bbfont roll is-1" @click="pow('blockSuccessPowSkull')" :class="{selected: (success.includes('blockSuccessPowSkull'))}">k</div>
                    <div class="column bbfont roll is-1" @click="pow('blockSuccessPush')" :class="{selected: (success.includes('blockSuccessPush'))}">g</div>
                    <div class="column bbfont roll is-1" @click="pow('blockSuccessStumble')" :class="{selected: (success.includes('blockSuccessStumble'))}">j</div>
                    <div class="column bbfont roll is-1" @click="pow('blockSuccessDown')" :class="{selected: (success.includes('blockSuccessDown'))}">i</div>
                </div>
            </div>
        </div>
        <button class="button" @click="addAction('block')">Add</button>
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
            success: ['blockSuccessStumble','blockSuccessDown'],
            powSelected: [],
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
        },
        pow: function(act){
            if(this.success.includes(act)){
                let idx = this.success.indexOf(act)
                this.success.splice(idx, 1);
            } else {
                this.success.push(act);
            }
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT BLOCK!!");
    }
}
</script>

<style lang="scss">

.block {
    .bbfont {
        font-family: 'dPoly Block Dice';

        &.roll {font-size: 4em;}
    }

    .daus {
        font-size: 2em;
        line-height: 2.1em;
        text-align: center;
    }

    .selected {
        color: dodgerblue !important;
    }
}
</style>
