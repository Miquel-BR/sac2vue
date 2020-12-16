<template>
    <form id="sac" name="sac">
        <div id="maincontent">
            <h1>Samba Action Calculator</h1>
            <!-- PLAYER -->
            <div class="player" >
                <h2>Player</h2>
                Name: <input type="text" id="playerName" class="playerName" name="playerName" value=""/>
                <input type="button" value="Change player" class="changePlayer" onclick="changePlayer()" /><br/>
                Skills:
                <input type="checkbox" value="" id="dodgeSkill" /><label for="dodgeSkill">Dodge</label>
                <input type="checkbox" value="" id="surehandSkill" /><label for="surehandSkill">Sure hands</label>
                <input type="checkbox" value="" id="surefeetSkill" /><label for="surefeetSkill">Sure feet</label>
                <input type="checkbox" value="" id="passSkill" /><label for="passSkill">Pass</label>
                <input type="checkbox" value="" id="catchSkill" /><label for="catchSkill">Catch</label>
                <input type="checkbox" value="" id="proSkill" /><label for="proSkill">Pro *</label>

                <input type="checkbox" value="" id="lonerSkill" /><label for="lonerSkill">Loner</label>
                <br/>

            </div>
            <!-- ACTIONS -->
            <div class="actionCluster">
                <h2>Dodges</h2>
                <input type="button" value="dodge 2+ " onclick="addAction('dodge2')"/>
                <input type="button" value="dodge 3+ " onclick="addAction('dodge3')"/>
                <input type="button" value="dodge 4+ " onclick="addAction('dodge4')"/>
                <input type="button" value="dodge 5+ " onclick="addAction('dodge5')"/>
                <input type="button" value="dodge 6+ " onclick="addAction('dodge6')"/>
                <br/>

            </div>
            <div class="actionCluster">
                <h2>Pick-up</h2>
                <input type="button" value="Pick-up 2+ " onclick="addAction('pickup2')"/>
                <input type="button" value="Pick-up 3+ " onclick="addAction('pickup3')"/>
                <input type="button" value="Pick-up 4+ " onclick="addAction('pickup4')"/>
                <input type="button" value="Pick-up 5+ " onclick="addAction('pickup5')"/>
                <input type="button" value="Pick-up 6+ " onclick="addAction('pickup6')"/>
                <br/>

            </div>

            <div class="actionCluster">
                <h2>Go For It</h2>
                <input type="button" value="gfi 2+ " onclick="addAction('gfi2')"/>
                <input style="width:120px" type="button" value="gfi 3+ (blizzard)" onclick="addAction('gfi3')"/>
                <br/>

            </div>


            <div class="actionCluster">
                <h2>Passes</h2>
                <input type="button" value="pass 2+ " onclick="addAction('pass2')"/>
                <input type="button" value="pass 3+ " onclick="addAction('pass3')"/>
                <input type="button" value="pass 4+ " onclick="addAction('pass4')"/>
                <input type="button" value="pass 5+ " onclick="addAction('pass5')"/>
                <input type="button" value="pass 6+ " onclick="addAction('pass6')"/>
                <br/>
                <b>Interception **:</b>
                <input class="interception" type="radio" value="interception No" checked="checked" name="interception" id="interceptionNo" />
                <label class="interceptionLabel" for="interceptionNo" checked="checked">No</label>
                <br/>
                Roll:
                <input  class="interception" type="radio" value="interception 2+" name="interception" id="interception2" />
                <label class="interceptionLabel" for="interception2">2+</label>
                <input class="interception" type="radio" value="interception 3+" name="interception" id="interception3" />
                <label class="interceptionLabel" for="interception3">3+</label>
                <input class="interception" type="radio" value="interception 4+" name="interception" id="interception4" />
                <label class="interceptionLabel" for="interception4">4+</label>
                <input class="interception" type="radio" value="interception 5+" name="interception" id="interception5" />
                <label class="interceptionLabel" for="interception5">5+</label>
                <input class="interception" type="radio" value="interception 6+" name="interception" id="interception6" />
                <label class="interceptionLabel" for="interception6">6+</label>
                <br/>
                Skills :
                <input class="interception" type="checkbox" value="interception with Pro skill" name="interceptionPro" id="interceptionWithPro" />
                <label class="interceptionLabel" for="interceptionWithPro" checked="checked">Pro</label>
                <input class="interception" type="checkbox" value="interception with Catch skill" name="interceptionCatch" id="interceptionWithCatch" />
                <label class="interceptionLabel" for="interceptionWithCatch" checked="checked">Catch</label>

            </div>


            <div class="actionCluster">
                <h2>Other Action</h2>
                <input type="button" value="action 2+ " onclick="addAction('action2')"/>
                <input type="button" value="action 3+ " onclick="addAction('action3')"/>
                <input type="button" value="action 4+ " onclick="addAction('action4')"/>
                <input type="button" value="action 5+ " onclick="addAction('action5')"/>
                <input type="button" value="action 6+ " onclick="addAction('action6')"/>
            </div>

            <div class="actionCluster">
                <h2>Catch</h2>
                <input type="button" value="catch 2+ " onclick="addAction('catch2')"/>
                <input type="button" value="catch 3+ " onclick="addAction('catch3')"/>
                <input type="button" value="catch 4+ " onclick="addAction('catch4')"/>
                <input type="button" value="catch 5+ " onclick="addAction('catch5')"/>
                <input type="button" value="catch 6+ " onclick="addAction('catch6')"/>
                <br/>

            </div>
            <div class="actionCluster block" style="text-align:left;">
                <h2>Blocks</h2>
                <b>Dice</b>
                <br/>
                <br/>
                <input type="radio" name="nbDice" class="nbDice" id="nbDiceM3" value="-3"/><label for="nbDiceM3">-3D</label>
                <input type="radio" name="nbDice" class="nbDice" id="nbDiceM2" value="-2"/><label for="nbDiceM2">-2D</label>
                <input type="radio" name="nbDice" class="nbDice" id="nbDice1" value="1" checked="checked"/><label for="nbDice1">1D</label>
                <input type="radio" name="nbDice" class="nbDice" id="nbDice2" value="2"/><label for="nbDice2">2D</label>
                <input type="radio" name="nbDice" class="nbDice" id="nbDice3" value="3"/><label for="nbDice3">3D</label>
                <br/><br/>
                <b>Success</b>
                <br/><br/>
                <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessSkull" value="1"/><label for="blockSuccessSkull"><img src="img/dice/skull.jpg" alt="skull"/></label>
                <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessPowSkull" value="1"/><label for="blockSuccessPowSkull"><img src="img/dice/powskull.jpg" alt="powskull"/></label>
                <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessPush" value="2"/><label for="blockSuccessPush"><img src="img/dice/push.jpg" alt="push"/></label>
                <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessStumble" checked="checked" value="1"/><label for="blockSuccessStumble"><img src="img/dice/stumbles.jpg" alt="stumbles"/></label>
                <input type="checkbox" class="successDice" name="blockSuccess" id="blockSuccessDown" checked="checked" value="1"/><label for="blockSuccessDown"><img src="img/dice/pow.jpg" alt="pow"/></label>

                <br/>
                <br/>
                <input type="button" value="add" class="add" onclick="addAction('block')" />
            </div>

            <div class="actionCluster armorbreak" style="text-align:left;">
                <h2>Armor Break</h2>

                <input type="button" value="-" class="armordown" onclick="if($('armorvalue').value>1)$('armorvalue').value--" />
                <input type="text" id="armorvalue" value="8" disabled="disabled"/>
                <input type="button" value="+" class="armorup" onclick="if($('armorvalue').value<12)$('armorvalue').value++" />
                <br/><br/>
                <input type="button" value="add" class="add" onclick="addAction('armorbreak')" />
            </div>
            <div class="actionCluster injury" style="text-align:left;">
                <h2>Injury Roll</h2>
                <input class="" type="checkbox" value="" name="injuryStun" id="injuryStun" />
                <label class="injuryLabel" for="injuryStun" checked="checked">stun</label>
                <input class="" type="checkbox" value="" name="injuryKO" id="injuryKO" />
                <label class="injuryLabel" for="injuryKO" checked="checked">KO</label>
                <input class="" type="checkbox" value="" name="injuryCas" id="injuryCas" />
                <label class="injuryLabel" for="injuryCas" checked="checked">CAS</label>
                <br/><br/>
                <input type="button" value="add" class="add" onclick="addAction('injury')" />
            </div>

            <div style="clear:both; height: 60px;"></div>
            <h2>Sequence</h2>
            <div id="sequence">Choose actions to display the sequence</div>

            <h2>Success percent Without team reroll</h2>
            <div id="probaNoReroll" >100%</div>

            <h2>Success percent With a team reroll</h2>
            <div id="probaYesReroll" >100%</div>
            <input type="button" onclick="theSequence = new fullSequence();showResult();" class="reset" value="reset"/>
            <input type="button" onclick="storeSequence();" class="reset" value="Store"/>

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
            </div>
        </div>
    </form>
</template>

<script>


    export default {
        name: 'dice',
        components: {},
        data:function(){
            return {}
        },
        props: [],
        computed: {},
        watch: {},
        methods: {},
        created() {},
        destroyed() {},
        mounted: function () {
            console.log("HOLA!!");
        }
    }
</script>

<style lang="scss" scoped>
    @import './../scss/mystyles.scss';
    @import '../scss/variables.scss';


    html{

        body {background-color: $back_peu;}
    }

</style>
