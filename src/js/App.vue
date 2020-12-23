<template>

    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-half">
                    <h2>Player Skills</h2>
                    <boto :options="playerOptions"
                          @dodgeSkill="dodgeSkill = $event"
                          @surehandSkill="surehandSkill = $event"
                          @surefeetSkill="surefeetSkill = $event"
                          @passSkill="passSkill = $event"
                          @catchSkill="catchSkill = $event"
                          @proSkill="proSkill = $event"
                          @lonerSkill="lonerSkill = $event"></boto>
                </div>
                <div class="column">
                    <div v-if="result">
                        <h2>Success percent Without team reroll</h2>
                        <div id="probaNoReroll" >{{result.noReRoll}}%</div>

                        <h2>Success percent With a team reroll</h2>
                        <div id="probaYesReroll" >{{result.reRoll}}%</div>
                    </div>
                    <input type="button" @click="cleanSequence" class="reset" value="reset"/>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns is-multiline is-mobile">
                <div v-for="(seq, idx) in sequencia" class="column is-6-mobile is-2">
                    <div class="notification">
                        <button class="delete" @click="deleteSeq(idx);"></button>
                        <span v-html="seq.toString"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <Tabs>
                <Tab name="Tab 1" :selected="true">
                    <div class="columns">
                        <div class="column">
                            <boto :options="actionOptions"
                                  :clearSelected="clearActionSelected"
                                  :is-alone="true"
                                  @esquiva="setAction = 'esquiva'"
                                  @recoger="setAction = 'recoger'"
                                  @ap="setAction = 'ap'"
                                  @atrapar="setAction = 'atrapar'"></boto>
                            <teclat :numbers="numbersComp" :color="'#BBBBBB'" @selected="action"></teclat>
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
    </section>

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
import Boto from './boto.vue'
import Teclat from './teclat.vue'

import { Tabs, Tab } from '@crow1796/vue-bulma-tabs'
import {catching, dodge, gfi, pickup, playerAction} from "./actions";

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
            Boto,
            Teclat,
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
                numbers: [2, 3, 4, 5, 6 ],
                setAction: '',
                clearActionSelected: true,
                playerOptions: [
                    {
                        name: 'Esquiva',
                        model: 'dodgeSkill',
                    },
                    {
                        name: 'Manos Seguras',
                        model: 'surehandSkill',
                    },
                    {
                        name: 'Pies Firmes',
                        model: 'surefeetSkill',
                    },
                    {
                        name: 'Pase Seguro',
                        model: 'passSkill',
                    },
                    {
                        name: 'Recoger',
                        model: 'catchSkill',
                    },
                    {
                        name: 'Pro',
                        model: 'proSkill',
                    },
                    {
                        name: 'Solitario',
                        model: 'lonerSkill',
                    }
                ],
                actionOptions: [
                    {
                        name: 'Esquiva',
                        model: 'esquiva',
                    },
                    {
                        name: 'Recoger',
                        model: 'recoger',
                    },
                    {
                        name: 'A Por ellos',
                        model: 'ap',
                    },
                    {
                        name: 'Atrapar',
                        model: 'atrapar',
                    },
                ]
            }

        },
        props: [],
        computed: {
            numbersComp: function(){
                return (this.setAction == 'ap') ? [2, 3] : this.numbers;
            }
        },
        watch: {},
        methods: {
            action: function(val){
                console.log("ACTION VAL", val);
                if (this.setAction == 'esquiva'){
                    this.addAction(new dodge(val, this.dodgeSkill, this.lonerSkill));
                } else if (this.setAction == 'recoger'){
                    this.addAction(new pickup(val, this.surehandSkill, this.lonerSkill ));
                } else if (this.setAction == 'ap'){
                    this.addAction(new gfi(val, this.surefeetSkill, this.lonerSkill));
                } else if (this.setAction == 'atrapar'){
                    this.addAction(new catching(val, this.catchSkill, this.lonerSkill ));
                } else {
                    this.addAction(new playerAction(val, this.lonerSkill))
                }
                this.setAction= '';
                this.clearActionSelected = !this.clearActionSelected;
            },
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

    body {
        background-color: $back_peu;
        font-family: sans-serif;
        font-size: 12px;

        .tabs {font-size: 12px;}
    }

    h2 {
        font-family: sans-serif;
        font-size: 1em;
    }


}

</style>
