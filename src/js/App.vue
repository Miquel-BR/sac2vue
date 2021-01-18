<template>

    <section class="section">
        <div class="container">
            <div class="columns is-mobile">
                <div class="column is-one-quarter">
                    <a href="#">
                        <img class="is-hidden-desktop" style="width: 100%;"src="img/irrpb.png"/>
                        <img class="is-hidden-touch" style="width: 100%;"src="https://www.irregularesplanb.com/images/logo.png"/></a>
                </div>
                <div class="column">
                    <div class="titol"><span>BLOOD BOWL</span> PROBABILITY <span>CALCULATOR</span></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns">
                <div class="column  is-half">
                    <div class="columns is-mobile" v-if="result">
                        <div class="column">
                            <h2>Probabilitat sense reroll</h2>
                            <div id="probaNoReroll" >{{result.noReRoll}}%</div>
                        </div>
                        <div class="column">
                            <h2>Probabilitat amb reroll</h2>
                            <div id="probaYesReroll" >{{result.reRoll}}%</div>
                        </div>
                        <div class="column">
                            <div class="buttons">
                            <button class="button is-small is-danger is-outlined" @click="cleanSequence">Reset</button>
                            <button class="button is-small xis-info viewprecent" :class="{'selected': (pintaSeq != null)}" @click="finsSeq(sequencia.length - 2);">%</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="column">
                    <h2 class="playerSkill" @click="showPlayerSkills = !showPlayerSkills">Habilitats <span class="arrow-down"></span></h2>

                    <boto :options="playerOptions"
                          @dodgeSkill="dodgeSkill = $event"
                          @surehandSkill="surehandSkill = $event"
                          @surefeetSkill="surefeetSkill = $event"
                          @passSkill="passSkill = $event"
                          @catchSkill="catchSkill = $event"
                          @proSkill="proSkill = $event"
                          @lonerSkill="lonerSkill = $event"
                          v-if="showPlayerSkills"
                    ></boto>
                </div>

            </div>
        </div>
        <div class="container sequencia">
            <sequencia :sequencia="txtSeq"
                       @delete="deleteSeq"
                       @clickar="clickSeq"
                       @fins="finsSeq"
                       :show="showSeq"
                       :pinta="pintaSeq"
            ></sequencia>
        </div>
        <div class="container">
            <Tabs>
                <Tab name="Accions" :selected="true">
                    <boto :options="actionOptions"
                          :clearSelected="clearActionSelected"
                          :is-alone="true"
                          @esquiva="setAction = 'esquiva'"
                          @recoger="setAction = 'recoger'"
                          @ap="setAction = 'ap'"
                          @atrapar="setAction = 'atrapar'"
                          style="margin-bottom: 0.75rem;"></boto>
                    <teclat :numbers="numbersComp" :color="'#EEEEEE'" @selected="action"></teclat>
                </Tab>
                <Tab name="Pasada">
                    <passes :loner-skill="lonerSkill" :pass-skill="passSkill" @action="addAction"></passes>
                </Tab>
                <Tab name="Block">
                    <block :loner-skill="lonerSkill" @action="addAction"></block>
                </Tab>
                <Tab name="Lesió">
                    <div class="columns">
                        <div class="column">
                            <armor-break @action="addAction"></armor-break>
                        </div>
                        <div class="column">
                            <injury @action="addAction"></injury>
                        </div>
                    </div>
                </Tab>
<!--                <Tab name="Altre">-->
<!--                    <other-action :loner-skill="lonerSkill" @action="addAction"></other-action>-->
<!--                </Tab>-->
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
import Sequencia from './sequencia.vue'

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
            Tab,
            Sequencia
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
                showPlayerSkills: true,
                showSeq: [],
                pintaSeq: null,
                playerOptions: [
                    {
                        name: 'Esquivar',
                        model: 'dodgeSkill',
                    },
                    {
                        name: 'Mans Segures',
                        model: 'surehandSkill',
                    },
                    {
                        name: 'Peus Ferms',
                        model: 'surefeetSkill',
                    },
                    {
                        name: 'Pasada Segura',
                        model: 'passSkill',
                    },
                    {
                        name: 'Agafar',
                        model: 'catchSkill',
                    },
                    {
                        name: 'Pro',
                        model: 'proSkill',
                    },
                    {
                        name: 'Solitari',
                        model: 'lonerSkill',
                    }
                ],
                actionOptions: [
                    {
                        name: 'Esquivar',
                        model: 'esquiva',
                        selected: true
                    },
                    {
                        name: 'Recollir',
                        model: 'recoger',
                    },
                    {
                        name: 'A Per ells',
                        model: 'ap',
                    },
                    {
                        name: 'Agafar',
                        model: 'atrapar',
                    },
                ]
            }

        },
        props: [],
        computed: {
            numbersComp: function(){
                return (this.setAction == 'ap') ? [2, 3] : this.numbers;
            },
            txtSeq: function(){
                let retorn = []
                this.sequencia.forEach(function(e, idx){
                    retorn.push(e.toString);
                });
                return retorn;
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
                //this.setAction= '';
                //this.clearActionSelected = !this.clearActionSelected;
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
                this.showSeq = [];
                this.pintaSeq = null;
            },
            deleteSeq: function(idx){
                this.sequencia.splice(idx, 1);
                this.full.removeAction(idx);
                this.result = this.full.getProba();
                //this.showSeq = [];
                //this.pintaSeq = null;
            },
            clickSeq: function(idx){
                console.log("CLICK SEQ", idx);
                this.pintaSeq = null;
                let idxs = this.showSeq.map(function(ele){
                    return ele.idx
                });
                if (!idxs.includes(idx)) {
                    let seq = new fullSequence();
                    let sp = this.sequencia.slice(idx, idx + 1);
                    seq.addAction(sp[0]);
                    let proba = seq.getProba();
                    console.log("PROB", proba);
                    this.showSeq = [];
                    this.showSeq.push({idx: idx, proba: proba});
                } else {
                    this.showSeq = [];
                }
            },
            finsSeq: function(idx){
                console.log("FINS SEQ", idx);
                let idxs = this.showSeq.map(function(ele){
                    return ele.idx
                });
                console.log(idxs);
                if (!idxs.includes(idx)) {
                    this.pintaSeq = idx;
                    this.showSeq = [];
                    for (let f = 0; f <= idx; f++){
                        let seq = new fullSequence();
                        let sp = this.sequencia.slice(0, f + 1);
                        seq.addActions(sp);
                        let proba = seq.getProba();
                        console.log("PROB", proba);
                        this.showSeq.push({idx: f, proba: proba});
                    }
                } else {
                    this.showSeq = [];
                    this.pintaSeq = null;
                }
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

    .titol {
        font-family: 'Gutcruncher';
        text-align: center;
        font-size: 6.5vw;

        @include from($tablet) {
            font-size: 2.6vw;
        }

        span {color: $irrpb;}
    }

    h2 {
        font-family: sans-serif;
        font-size: 1em;
    }

    .playerSkill {
        position: relative;
        cursor: pointer;

        .arrow-down {
            width: 0;
            height: 0;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-top: 3px solid #000;
            position: absolute;
            margin-left:2px;
            top:2px;
        }
    }
}

.button.viewprecent {
    border-color: $selected;
    color: $selected;

    &.selected,
    &:hover {
        background-color: $selected;
        color: white;
    }
    &:focus {
        outline: none;
        box-shadow: none !important;
        border-color:$selected;
    }
    &.is-info:focus {
        border-color:#3298dc;
    }
}


.button.is-outlined {
    &:hover,
    &:focus,
    &:active,
    &:visited {
        &::after {
            border-color: transparent transparent #fff #fff !important;
        }
    }
}

</style>
