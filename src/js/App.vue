<template>

    <div class="container">
    <section class="section">
        <div class="container">
            <div class="tile is-ancestor">
                <div class="tile is-vertical is-6">
                    <div class="tile is-parent">
                        <article class="tile is-child">
                            <h2>Player</h2>
                            Name: <input type="text" id="playerName" class="playerName" name="playerName" value=""/>
                            <input type="button" value="Change player" class="changePlayer" onclick="changePlayer()" /><br/>
                            Skills:
                            <input type="checkbox" value="" id="dodgeSkill" v-model="dodgeSkill"/><label for="dodgeSkill">Dodge</label>
                            <input type="checkbox" value="" id="surehandSkill" v-model="surehandSkill"/><label for="surehandSkill">Sure hands</label>
                            <input type="checkbox" value="" id="surefeetSkill" v-model="surefeetSkill"/><label for="surefeetSkill">Sure feet</label>
                            <input type="checkbox" value="" id="passSkill" v-model="passSkill"/><label for="passSkill">Pass</label>
                            <input type="checkbox" value="" id="catchSkill" v-model="catchSkill"/><label for="catchSkill">Catch</label>
                            <input type="checkbox" value="" id="proSkill" v-model="proSkill"/><label for="proSkill">Pro *</label>

                            <input type="checkbox" value="" id="lonerSkill" v-model="lonerSkill"/><label for="lonerSkill">Loner</label>
                        </article>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <div v-if="result">
                            <h2>Success percent Without team reroll</h2>
                            <div id="probaNoReroll" >{{result.noReRoll}}%</div>

                            <h2>Success percent With a team reroll</h2>
                            <div id="probaYesReroll" >{{result.reRoll}}%</div>
                        </div>
                        <input type="button" @click="cleanSequence" class="reset" value="reset"/>
                    </article>
                </div>
            </div>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="columns is-multiline">
                <div v-for="(seq, idx) in sequencia" class="column is-2">
                    <div class="notification">
                        <button class="delete" @click="deleteSeq(idx);"></button>
                        <span v-html="seq.toString"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <Tabs>
            <Tab name="Tab 1" :selected="true">
                <div class="columns is-mobile">
                    <div class="column">
                        <dodge :loner-skill="lonerSkill" :dodge-skill="dodgeSkill" @action="addAction"></dodge>
                    </div>
                    <div class="column">
                        <pickup :loner-skill="lonerSkill" :surehand-skill="surehandSkill" @action="addAction"></pickup>
                    </div>
                    <div class="column">
                        <gfi :lonner-skill="lonerSkill" :surefeet-skill="surefeetSkill" @action="addAction"></gfi>
                    </div>
                    <div class="column">
                        <catch :catch-skill="catchSkill" :loner-skill="lonerSkill" @action="addAction"></catch>
                    </div>
                </div>
            </Tab>
            <Tab name="Pases">
                <passes :loner-skill="lonerSkill" :pass-skill="passSkill" @action="addAction"></passes>
            </Tab>
            <Tab name="Block">
                <block :loner-skill="lonerSkill" @action="addAction"></block>
            </Tab>
            <Tab name="Mal">
                <div class="columns">
                    <div class="column">
                <armor-break @action="addAction"></armor-break>
                    </div>
                    <div class="column">
                <injury @action="addAction"></injury>
                </div>
                </div>
            </Tab>
            <Tab name="Other">
                <other-action :loner-skill="lonerSkill" @action="addAction"></other-action>
            </Tab>
        </Tabs>
    </div>

<!--            <div style="clear:both; height: 60px;"></div>


            <div id="storeContainer"><h3>Stored Sequences</h3>...</div>

            <div class="warning">
                Warning: this tool will(should) give you the odds for a precise sequence. It will not demonstrate that Nuffle hates you.
                <br/>
                Warning: this tool is still in development, it may display errors in the calculations. If you do spot any error, please report it to Elyoukey (if you do spot errors you are smart and interested enough to not need more information to track me). Thanks in advance. <br/>
                <br/>
                English not being my mother tongue, this tool may also display English errors, feel free to report those too.
                <br/><br/>


            </div>
            <div class="notices">
                * Pro reroll: the system by default will assume that you are using the pro skill only if there is no team reroll left.
                To change this behavior for an action, use the checkbox in the actionbox. The system will then calculate the odds assuming that you will use the pro skill prior to a reroll but will use the reroll if the pro roll fails.
                It may lead to little odd increase for several sequences (for exemple : action5+ action5+ action3+ action6+ the pro skill should be used on first roll)
                <br/><br/>
                ** Interception: the sequence displays <span class="negative">in red the probability for the pass to NOT be intercepted</span> ( = 1-odd to succeed the interception)
            </div>-->
</template>

<script>

import fullSequence from "./sequence";
import Dodge from './dodge.vue'
import Pickup from './pickup.vue'
import Gfi from './gfi.vue'
import Passes from './passes.vue'
import Catch from './catch.vue'
import OtherAction from './otherAction.vue'
import Block from './block.vue'
import ArmorBreak from './armorBreak.vue'
import Injury from './injury.vue'

import { Tabs, Tab } from '@crow1796/vue-bulma-tabs'

    export default {
        name: 'dice',
        components: {
            Dodge,
            Pickup,
            Gfi,
            Passes,
            Catch,
            OtherAction,
            Block,
            ArmorBreak,
            Injury,
            Tabs,
            Tab
        },
        data:function(){
            return {
                dodgeSkill: false,
                surehandSkill: false,
                surefeetSkill: false,
                passSkill: false,
                catchSkill: false,
                proSkill: false,
                lonerSkill: false,
                sequencia: [],
                full: null,
                result: null,
            }
        },
        props: [],
        computed: {},
        watch: {},
        methods: {
            addAction: function(action){
                console.log("ACTION", action);
                this.sequencia.push(action);

                this.full.addAction(action);
                this.result = this.full.getProba();
            },
            cleanSequence: function(){
                this.full = new fullSequence();
                this.sequencia = [];
                this.result = this.full.getProba();
            },
            deleteSeq: function(idx){
                this.sequencia.splice(idx, 1);
                this.full.removeAction(idx);
                this.result = this.full.getProba();
            }
        },
        created() {

        },
        destroyed() {},
        mounted: function () {
            console.log("HOLA!!");
            this.full = new fullSequence();
        }
    }
</script>

<style lang="scss">
@import './../scss/mystyles.scss';
@import '../scss/variables.scss';


html{
    @font-face {
        font-family: 'dPoly Block Dice';
        src: url('../../font/dPolyBlockDice.woff2') format('woff2'),
        url('../../font/dPolyBlockDice.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @include from($tablet) {
        //overflow-y: hidden !important;
    }
    scroll-behavior: smooth;

    body {background-color: $back_peu;}

    h2 {
        font-family: sans-serif;
        font-size: 1em;
    }
}

</style>
