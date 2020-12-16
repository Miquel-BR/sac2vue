/**
 * Com enllaçar promise dins del vuex
 *
 *
 *dispatch('findMaxMin').then((maxMin) => {
    console.log("MAX MN", maxMin);
    for (const o of obj) {
        console.log("SEND DADES HIST", o, obj[0].ter_nom);
        this.dispatch('getDadesHistoric', o.ter_nom).then((resp) => {
            console.log("add territori", o.ter_nom)
            console.log("resp add", resp);
            setTimeout(function() {
                dispatch('addGraficHistoric', {dades: resp, maxMin: maxMin});
            }, 500);

        });
    }
});
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../js/router';

import * as Query from '../js/querys'
import * as Utils from '../js/utils'
import * as Estils from '../js/estils'
//import {convertDadesGraficsToDataCollection} from "../js/utils";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        client: null,
        source: null,
        dimensions: null,
        menus: null,
        indSelected: null,
        subtemaSelected: null,
        anySelected: null,
        periodeSelected: null,
        nivellSelected: null,
        territorisSelected: [],
        territorisAll: [],
        graficaDetall: null,
        graficaDetallDC: null,
        graficaHistoric: null,
        graficaHistoricDC: null,
        graficaHistoricDCTotal: null,
        lang:'ca',
        buckets: null,
        fillColor: [],
        fillBucketColors:[],
        dimPeriode: null,
        traduccions: {ca: [], es: [], en: []},
        informacio: {},
        estil: null,
        sumadorDades: 0,
        graficaControl: true,
        showExplicacio: false,
        txtExplicacio: '',
    },
    getters:{
        getLang:(state, getters) => {return state.lang},
        getClient: (state, getters) => { return state.client},
        getSource: (state, getters) => { return state.source},
        getDimensions:(state, getters) => {return state.dimensions},
        getIndDimensions:(state , getters) => (ind) => {return  state.dimensions[ind];},
        getNowDimensions:(state, getters) => {return state.dimensions[state.indSelected]},
        getNowAnys:(state, getters) => {return Object.keys(getters.getNowDimensions)},
        getNowPer:(state, getters) => {
            return Object.keys(getters.getNowDimensions[state.anySelected])
        },
        getNowNivell:(state, getters) => {
            return getters.getNowDimensions[state.anySelected][state.periodeSelected];
        },
        getIndSelected:(state, getters) => {return state.indSelected},
        getAnySelected:(state, getters) => {return state.anySelected},
        getPerSelected:(state, getters) => {return state.periodeSelected},
        getNivellSelected:(state, getters) => {return state.nivellSelected},
        getTerritorisSelected: (state, getters) => {return state.territorisSelected},
        getLastTerritoriSelected: (state, getters) => {return state.territorisSelected[state.territorisSelected.length - 1]},
        getMenus: (state, getters) => {return state.menus},
        getGraficaDetall: (state, getters) => {return state.graficaDetall},
        getGraficaDetallDC: (state, getters) => {return state.graficaDetallDC},
        getGraficaHistoric: (state, getters) => {return state.graficaHistoric},
        getGraficaHistoricDC: (state, getters) => {return state.graficaHistoricDC},
        getGraficaHistoricDCTotal: (state, getters) => { return state.graficaHistoricDCTotal},
        getBuckets: (state, getters) => {return state.buckets},
        getFillColor: (state, getters) => {return state.fillColor},
        getDimPeriode: (state, getters) => {return state.dimPeriode},
        getNameIndSelected: (state, getters) => {
            if (state.menus) {

                state.subtemaSelected = Utils.findSubtema(state.menus, state.indSelected);

                let inds = Utils.flatternNestedObject(state.menus);
                return inds[state.indSelected];
            } else {
                return null;
            }
        },
        getSubtemaIndSelected: (state, getters) => {return state.subtemaSelected},
        getBucketColors: (state, getters)=>{return state.fillBucketColors},
        getLangs: (state, getters) => { return Object.keys(state.traduccions);},
        getIdiomes: (state, getters) => {
            //return Object.keys(state.traduccions);
            return {
                'ca': 'Català',
                'es': 'Castellano',
                'en': 'English'
            }
        },
        getTraduccio:(state, getters)=>{
            return state.traduccions[state.lang];
        },
        getInformacions:(state, getters)=>{
            if (state.lang && state.informacio) {
                return state.informacio[state.lang];
            } else {
                return null;
            }
        },
        getInformacio: (state, getters) => {
            if (state.lang &&  Object.keys(state.informacio).length !== 0) {
                return state.informacio[state.lang][state.indSelected];
            } else {
                return null;
            }
        },
        getEstil: (state, getters) => {
            return state.estil;
        },
        getSumadorDades: (state) => {
            return state.sumadorDades;
        },
        getGraficaControl: (state) => {
            return state.graficaControl;
        },
        getShowExplicacio: (state) => {return state.showExplicacio;},
        getTxtExplicacio: (state) => {return state.txtExplicacio;},
    },
    mutations:{
        setLang: (state, l) => {state.lang = l},
        setClient: (state, c) => {state.client = c},
        setSource: (state, s) => {state.source = s},
        setDimensions:(state, d) => {state.dimensions = d;},
        setMenus: (state, m) => {state.menus = m;},
        setIndicador:(state, ind) => {state.indSelected = ind},
        setAny: (state, any) => {state.anySelected = any},
        setPeriode:(state, periode) => {state.periodeSelected = periode},
        setNivell:(state, nivell) => {state.nivellSelected = nivell},
        setTerritoris: (state, territori) => {
            state.territorisSelected = territori;
        },
        selAllTerritoris: (state, territoris) => {state.territorisAll = territoris},
        addTerritori: (state, territori) => {state.territorisSelected.push(territori)},
        setGraficaDetall:(state, valors) => {state.graficaDetall = valors},
        setGraficaDetallDC:(state, valors) => {state.graficaDetallDC = valors},
        setGraficaHistoric: (state, valors) => {state.graficaHistoric = valors},
        setGraficaHistoricDC: (state, valors) => {state.graficaHistoricDC = valors},
        setGraficaHistoricDCTotal: (state, valors) => {state.graficaHistoricDCTotal = valors},
        setBuckets: (state, valors) => {state.buckets =valors},
        setFillColor: (state, valors) => {state.fillColor = valors},
        setDimPeriode: (state, valors) => {state.dimPeriode = valors},
        setBucketColors: (state, valors) => {state.fillBucketColors= valors},
        setTraduccions: (state, valors) => {
            console.log("SET TRADUCCIONS", valors);
            state.traduccions[valors.idi] = valors.text;
        },
        setInformacio: (state, valors) => {state.informacio = valors;},
        setEstil: (state, valors) => { state.estil = valors;},
        setSumadorDades: (state, valor) => {state.sumadorDades = valor},
        setGraficaControl: (state, valor) => {state.graficaControl = valor},
        setShowExplicacio: (state, valor) => {state.showExplicacio = valor},
        toggleShowExplicacio: (state) => {state.showExplicacio = !state.showExplicacio;},
        setTxtExplicacio: (state, valor) => {state.txtExplicacio = valor},
    },


    actions:{
        updateRoute: function({ commit, state }, obj = {}){
            let newRoute =  '/' + state.lang + '/' + state.indSelected + '/' + state.anySelected + '/' + state.periodeSelected + '/' + state.nivellSelected;
            console.log("UPDATE ROUTE", newRoute);
            if(newRoute != Router.currentRoute.fullPath) {
                Router.push('/' + state.lang + '/' + state.indSelected + '/' + state.anySelected + '/' + state.periodeSelected + '/' + state.nivellSelected).catch((err) => {
                    console.error("UPDATE ROUTE ERROR", err)
                });
            }
        },
        /*
        Per solventar el problema del echo dels selectors, en comptes de canviar un per un
        els valors i anar fent una query de cadasqun. Al fer la primera query
        ja comprovo la resta de valors , faig la primera query bona i amb els resultats
        reomplo els selecteds i coloco els bons.
        Per un altre costat el selector nomes $emet valor quan cliques els botons, i així
        ens estalviem el echo
         */
        updateSource: function({commit, state}){

            let dim = this.getters.getDimensions[this.getters.getIndSelected];

            let any = (this.getters.getAnySelected in dim) ? this.getters.getAnySelected : Object.keys(dim)[0];

            let per = (this.getters.getPerSelected in dim[any]) ? this.getters.getPerSelected :  Object.keys(dim[any])[0];

            let niv = (dim[any][per].includes(this.getters.getNivellSelected)) ? this.getters.getNivellSelected : dim[any][per][0];

            console.log("UPDATE SOURCE - CRIDA SQL " + this.getters.getIndSelected + " and val_any = " + any + " and val_per_id = " + per + " NIVELL " + niv);

            commit('setAny', any);
            commit('setPeriode', per);
            commit('setNivell', niv);

            let query;
            switch(this.getters.getNivellSelected){
                case 'Municipi':
                    query = Query.municipi;
                    break;
                case 'Districte':
                    query = Query.districte;
                    console.log("DISTRICTE", query);
                    break;
                case 'Barri':
                    query = Query.barri;
                    break;
                case 'Parcela':
                    query = Query.parcela;
                    break;
            }

            this.getters.getSource.setQuery(query +  "where ind_codi = " + this.getters.getIndSelected + " and val_any = " + this.getters.getAnySelected + " and val_per_id = " + this.getters.getPerSelected + " LIMIT 1000");
            console.log("ARRANCO WAITING");
            commit('setGraficaControl', false);

            this.dispatch('getDades');
            this.dispatch('cleanGraficaHistoric');
            //this.dispatch('checkGraficaHistoric');

            this.getters.getSource.on('queryChanged', function(ev){
                console.log("PARO WAITING");
                commit('setGraficaControl', true);
            });


        },
        setIndByRoute: function({dispatch, commit}, obj){
           //commit('setLang', obj.lang_route);

            commit('setIndicador', obj.ind_route);
            commit('setAny', obj.any_route);
            commit('setPeriode', obj.per_route);
            commit('setNivell', obj.nivell_route);
            dispatch('updateSource');
            dispatch('changeLang', {l: obj.lang_route})
        },
        setIndicadorDefault: function({ commit, state }, obj){
            commit('setIndicador', obj.ind);
            commit('setAny', this.getters.getNowAnys[this.getters.getNowAnys.length - 1]);
            commit('setPeriode', this.getters.getNowPer[0]);
            commit('setNivell', this.getters.getNowNivell[0]);
            this.dispatch('updateRoute');
            this.dispatch('updateSource');
        },
        setIndicador: function({commit, state}, obj){
            commit('setIndicador', obj.ind);

            let dim = this.getters.getDimensions[this.getters.getIndSelected];
            console.log("CHANGE INDICADOR", dim);
            let any = _.max(Object.keys(dim));
            console.log("ANY", any);
            commit('setAny', any);
            let per = _.min(Object.keys(dim[any]));
            console.log("PERIODE", per);
            commit('setPeriode', per);

            let niv = (dim[any][per][0] == "Parcela") ? dim[any][per][1] : dim[any][per][0];
            console.log("NIVELL", niv);
            commit('setNivell', niv);

            this.dispatch('updateRoute');
            this.dispatch('updateSource');
        },
        setAny: function({commit, state}, obj){
            if(obj.any != state.anySelected) {
                commit('setAny', obj.any);
                this.dispatch('updateRoute');
                this.dispatch('updateSource');
            }

        },
        setPeriode: function({commit, state}, obj){
            if(obj.per != state.periodeSelected) {
                commit('setPeriode', obj.per);
                this.dispatch('updateRoute');
                this.dispatch('updateSource');
            }
        },
        setNivell: function({commit, state}, obj){
            if(obj.nivell != state.nivellSelected) {
                commit('setNivell', obj.nivell);
                this.dispatch('updateRoute');
                this.dispatch('updateSource');
            }
        },
        cleanTerritoris: function({commit, state}){
            commit('setTerritoris', []);
            let dc = _.clone(state.graficaDetallDC);
            dc.datasets[0].backgroundColor.forEach(function(part, index, arr){
                arr[index] = "#999999";
            });
            commit('setGraficaDetallDC',dc);

            let dcc = _.cloneDeep(state.graficaHistoricDC);
            dcc.datasets = [];
            commit('setGraficaHistoricDC', dcc);
        },
        addAllTerritoris: function({commit, state}){
            let dct = _.cloneDeep(state.graficaHistoricDCTotal);
            let dc = _.cloneDeep(state.graficaHistoricDC);
            dc.datasets = dct.datasets;
            commit('setGraficaHistoricDC', dc);

            commit('setTerritoris', _.clone(state.territorisAll));
            console.log(state.territorisSelected);

            let dcc = _.clone(state.graficaDetallDC);
            dcc.datasets[0].backgroundColor = Estils.randomColors.slice(0, dcc.datasets[0].data.length);
            commit('setGraficaDetallDC',dcc);

        },
        /**
            El funcionament del click a les gràfiques es el seguent:
            Si clikem afegim la barra sinó esta ja seleccionada, si esta seleccionada
            la treiem de la seleccio, SEMPRE MENYS SI ESTAN TOTS CLICKATS.
            Si estan tots clickats el primer que clickem serà l'unic clickat, es a dir,
            deseleccionem tot i seleccionem nomes el clickat.
         **/
        clickTerritori: function({commit, state}, obj){
            console.log("CLICK TERR", obj, state.territorisSelected);
            if (!state.territorisSelected.includes(obj.terr) ||
                // O estas tots clickats i és el primer que clickem (si selected == all)
                (_.isEqual(state.territorisSelected.sort(), state.territorisAll.sort()))) {

                if (_.isEqual(state.territorisSelected.sort(), state.territorisAll.sort())){
                    // Si és primer click, deseleccionem tots
                    this.dispatch('cleanTerritoris');
                }

                commit('addTerritori', obj.terr);
                console.log("RAMDOM COLOR", Estils.randomColors[obj.idx]);
                this.dispatch('hightlightGraficaIdx', {
                    idx: obj.idx,
                    color: Estils.randomColors[obj.idx]
                });
                this.dispatch('addGraficHistoric', obj);

            } else {

                let idx = state.territorisSelected.indexOf(obj.terr);
                this.dispatch('hightlightGraficaIdx', {idx: obj.idx, color: '#999999'});
                state.territorisSelected.splice(idx, 1);
                this.dispatch('subsGraficHistoric', {idx: idx});
            }
        },
        findMaxMin: async function({state}){
            return Utils.findMaxMin(state.indSelected, state.periodeSelected, state.nivellSelected).then(maxMin => {
                console.log("MAX MIN FIND", maxMin);
                return (maxMin);
            });
        },
        initTerritori: async function({dispatch, commit}, obj){
            console.log("DADES ARRIBADES A INIT TER", obj);
            let ters = _.map(obj, 'ter_nom');
            let ter = "("
            _.forEach(ters, function(t, k){
                if(k > 0){
                    ter = ter + ", ";
                }
                ter = ter + "'" + Utils.escapeSQL(t) + "'";
            });
            ter = ter + ")";

            Query.executeQuery(Query.getDades + "where ind_codi = " + this.getters.getIndSelected + " and val_per_id = " + this.getters.getPerSelected + " and ter_nivell = '"+this.getters.getNivellSelected+"' and ter_nom in " + ter + " order by ter_nom").then((dades) => {
                console.log("INIT TERRITORI", dades);
                let dc = Utils.convertAllTerr(dades);
                commit('setGraficaHistoricDC', dc);
                commit('setGraficaHistoricDCTotal', _.cloneDeep(dc));
                let territoris = _.uniq(_.map(dades, 'ter_nom'));
                console.log("TERRITORIS", territoris);
                commit('setTerritoris', territoris);
                commit('selAllTerritoris', _.clone(territoris));
            });

        },
        addTerritoriFromMap: function({commit, state}, obj){
            let ters = _.map(state.graficaDetall, 'ter_nom');
            let idx = ters.indexOf(obj.terr);
            this.dispatch('clickTerritori', {terr: obj.terr, idx: idx});
        },
        getDades: async function({commit, state}, obj){
            Query.executeQuery(Query.getDades + "where ind_codi = " + this.getters.getIndSelected + " and val_any = " + this.getters.getAnySelected + " and val_per_id = " + this.getters.getPerSelected + " and ter_nivell = '"+this.getters.getNivellSelected+"' order by ter_nom LIMIT 1000").then((dades) => {
                console.log("GET DADES", dades, dades.length);

                let gg = this.getters.getEstil;
                if (dades.length > 3 && dades.length <= 10) {
                    console.log("ESTILS: ", Estils.getEstil(dades.length - 2));
                    gg.setContent(Estils.getEstil(dades.length - 2));
                } else if (dades.length <= 3) {
                    console.log("ESTILS: ", Estils.getEstil(dades.length));
                    gg.setContent(Estils.getEstil(dades.length));
                } else {
                    console.log("ESTILS: ", Estils.getEstil(10));
                    gg.setContent(Estils.getEstil(10));
                }



                commit('setGraficaDetall', dades);
                commit('setGraficaDetallDC', Utils.convertDadesGraficsToDataCollection(dades, 'ter_nom', false));
                 //this.dispatch('setTerritori', {terr: dades[0].ter_nom});
                this.dispatch('sumarDades', dades);
                let colors = Estils.randomColors.slice(0, dades.length);
                console.log("COLORS BARRES", colors);
                this.dispatch('changeBackgroundColor', colors);
                this.dispatch('initTerritori', dades);
            });
        },
        subsGraficHistoric: function({commit, state}, obj){
            let dc = _.cloneDeep(state.graficaHistoricDC);
            dc.datasets.splice(obj.idx, 1);
            //dc.datasets[obj.idx]._meta[1].hidden = true;
            console.log("SUB DATA", dc.datasets, obj);

            commit('setGraficaHistoricDC', dc);

        },
        addGraficHistoric: function({dispatch, commit, state}, obj){
            let dct = _.cloneDeep(state.graficaHistoricDCTotal);
            let dc = _.cloneDeep(state.graficaHistoricDC);
            let ters = _.map(dct.datasets, 'label');
            let idx = _.findIndex(ters, function(t){return t == obj.terr});
            let dataset = dct.datasets.splice(idx, 1);
            dc.datasets.push(dataset[0]);
            commit('setGraficaHistoricDC', dc);
        },
        cleanGraficaHistoric: function({commit, state}){
            commit('setTerritoris', []);
            commit('setFillColor', []);
            //commit('setGraficaHistoric', null);
            commit('setGraficaHistoricDC', null);
        },
        checkGraficaHistoric: function({commit, state}){
            console.log("CHECK GRAFIC: ", state.territorisSelected);
        },
        setBuckets: function({commit, state}, obj){
            commit('setBuckets', obj);
        },
        setDimPeriode: function({commit, state}, obj){
            commit('setDimPeriode', obj);
        },
        changeBackgroundColor: function({commit, state}, colors){
            if(state.fillColor.length == 0){
                state.fillColor = _.clone(colors);
            }
            //colors[0] = Estils.colorsGrafiques[0];
            let dc = _.clone(state.graficaDetallDC);
            dc.datasets[0].backgroundColor = colors;
            commit('setGraficaDetallDC', dc);
        },
        clearIndicador: function({commit, state}){
            commit('setIndicador', null);
        },
        hightlightGraficaIdx: function({commit, state}, obj){
            let dc = _.clone(state.graficaDetallDC);
            dc.datasets[0].backgroundColor[obj.idx] = obj.color;
            commit('setGraficaDetallDC',dc);
        },
        changeLang: ({commit, dispatch, state}, obj) => {
            console.log("CHANGE LANG ACTION", obj);
            commit('setLang', obj.l);
            let txt = state.traduccions[obj.l];
            dispatch('updateRoute');
            let i18n = Utils.selectToJSONMenus(txt);
            commit('setMenus', i18n);

        },
        sumarDades: ({commit}, obj) =>{
            let valors = _.map(obj, 'val_valor');
            let sum = _.sum(valors);
            console.log("SUMADOR DADES", valors, sum);
            commit('setSumadorDades', sum);
        },
        cloneDC: ({dispatch, commit, state})=>{
            let dc = _.cloneDeep(state.graficaDetallDC);
            commit('setGraficaDetallDC', dc)
        },
    }
})
