
    /* ---------------------------- ATOMIC ODDS --------------------------------------------- */
    //actions object

    import fullSequence from "./sequence";

export function playerAction(x, isLoner)
{
    this.isLoner = isLoner;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    this.toString = 'Acció '+x+'+'+tLoner;
}

export function dodge(x, hasSkill, isLoner)
{
    this.canUseDodgeSkill = hasSkill;
    this.isLoner = isLoner;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let wDodge = (hasSkill)?'<span class="hab">esquivar </span>':'';
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    this.toString = 'Esquivar <span class="num">'+x+'+</span> '+wDodge+tLoner;
}

export function pass(x, hasSkill, isLoner, interception, interceptionWithPro, interceptionWithCatch)
{
    this.canUsePassSkill = hasSkill;
    this.isLoner = isLoner;

    //add the interception odd
    let baseInterceptionOdd = 1;

    if(interception != "0"){
        baseInterceptionOdd = (parseInt(interception) - 1) / 6;
    }

    let interceptionOdd = baseInterceptionOdd;
    //interceptor has the pro skill
    if(interceptionWithPro)interceptionOdd = baseInterceptionOdd*( 1/2 + baseInterceptionOdd/2 );
    //interceptor has the catch skill
    if(interceptionWithCatch)interceptionOdd = baseInterceptionOdd*baseInterceptionOdd;

    this.interceptionOdd = interceptionOdd;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let wSkill = (hasSkill)?'<span class="hab">pasada segura</span>':'';
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
console.log(interceptionOdd);
    let rInterceptionOdd =  Math.round(interceptionOdd*1000)/10;
    let tInterceptionOdd = ( interceptionOdd!=1 )? ' <span class="negative">(<span class="is-hidden-touch">int:</span>'+rInterceptionOdd+'%)</span>':'';
    this.toString = 'Pasada <span class="num">'+x+'+</span> '+wSkill+tLoner+tInterceptionOdd;
}

export function catching(x, hasSkill, isLoner)
{
    this.canUseCatchSkill = hasSkill;
    this.isLoner = isLoner;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let wSkill = (hasSkill)?'<span class="hab">agafar </span>':'';
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    this.toString = 'Agafar <span class="num">'+x+'+ '+wSkill+tLoner;
}
export function pickup(x, hasSkill, isLoner)
{
    this.canUseSurehandSkill = hasSkill;
    this.isLoner = isLoner;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let wSkill = (hasSkill)?'<span class="hab">recollir </span>':'';
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    this.toString = 'Recollir <span class="num">'+x+'+</span> '+wSkill+tLoner;
}


export function gfi(x, hasSurefeet, isLoner)
{

    this.canUseSurefeetSkill = hasSurefeet;
    this.isLoner = isLoner;
    this.probaNoReroll = (7-x)/6;
    this.probaYesReroll = ((x-1)/6)*((7-x)/6);
    let wDodge = (hasSurefeet)?'<span class="hab">peus ferms </span>':'';
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    this.toString = 'AP <span class="num">'+x+'+</span> '+wDodge+tLoner;
}

export function block(nbDice, nbSuccess, isLoner)
{
    this.isLoner = isLoner;

    switch(nbDice)
    {
        case -3:
            this.probaNoReroll = nbSuccess*nbSuccess*nbSuccess/216;
            break;
        case -2:
            this.probaNoReroll = nbSuccess*nbSuccess/36;
            break;
        case 1:
            this.probaNoReroll = nbSuccess / 6;
            break;
        case 2:
            this.probaNoReroll = ( ( 12 * nbSuccess ) - ( nbSuccess*nbSuccess ) ) /36;
            break;
        case 3:
            this.probaNoReroll = ( (108*nbSuccess)-(18*nbSuccess*nbSuccess)+(nbSuccess*nbSuccess*nbSuccess) )/216;
            break;
    }
    this.probaYesReroll = (1-this.probaNoReroll)*this.probaNoReroll;
    let tLoner = (isLoner)?'<span class="hab solitario">solitari</span>':'';
    let clas = (nbDice== -3 || nbDice== -2) ? "num vermell" : "num";
    this.toString = 'Block <span class="'+clas+'">'+nbDice+'D</span> ('+nbSuccess+'*)'+tLoner;
}

export function armorbreak(armorValue)
{
    let armorvalue = 1*armorValue;
    var proba;
    proba = 1;
    switch(armorvalue )
    {
        case 1:proba = 1;break;
        case 2:proba = 35/36;break;
        case 3:proba = 33/36;break;
        case 4:proba = 30/36;break;
        case 5:proba = 26/36;break;
        case 6:proba = 21/36;break;
        case 7:proba = 15/36;break;
        case 8:proba = 10/36;break;
        case 9:proba = 6/36;break;
        case 10:proba = 3/36;break;
        case 11:proba = 1/36;break;
        case 12:proba = 0;
    }
    this.cannotUseReroll=true;
    this.probaNoReroll=proba;
    this.probaYesReroll = (1-this.probaNoReroll)*this.probaNoReroll;
    var ar = 1*armorvalue+1;
    this.toString = 'AT <span class="num">'+ar+'+</span>';
}

export function injury(stunChecked, koChecked, casChecked)
{
    if( !stunChecked && !koChecked && !casChecked){
        this.probaNoReroll=this.probaYesReroll = 0;
        this.toString = 'No injury roll specified, you have to roll injuries, this is bloodbowl we are talking about';
        return;
    }
    let proba = 0;
    let injuryText = '';
    if( stunChecked )
    {
        proba+= 21/36;
        injuryText += 'atordit ';
    }
    if( koChecked )
    {
        proba+= 9/36;
        injuryText += 'KO ';
    }
    if( casChecked )
    {
        proba+= 6/36;
        injuryText += 'lesió ';
    }
    this.cannotUseReroll=true;
    this.probaNoReroll=proba;
    this.probaYesReroll = (1-this.probaNoReroll)*this.probaNoReroll;
    this.toString = 'lesió <span class="num">('+injuryText+')</span>';
}
