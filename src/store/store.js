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

import Carto from 'cartodb/carto.min.js';
import * as Query from '../js/querys'
import * as Utils from '../js/utils'
import * as Estils from '../js/estils'
import _ from "lodash";
import Menu from "../js/menus.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        //lang: null
        client: null,
        source: null,
        map: null,
        capitolSelected: null,
        anySelected: null,
        districteSelected: null,
        barriSelected: null,
        estil: null,
        popup: null,
        filtres: {
            any: null,
            dte: null,
            bar: null
        },
        taulaFiltre: null,
        llegendaFiltre: null,
        categoryDtw: null,
        dataview: null,
        graficaDC: null,
        historicDC: null,
        grafNivell: 'barnom',
        changeSourceFlag: true,
        changeFilterFlag: true,
        countFilter: null,
        contentFilter: null,
        filter: null,
        resetMenusFlag: true,
    },
    getters:{
        getClient:(state, getters) => {return state.client},
        getSource:(state, getters) => {return state.source},
        getMap: (state) => {return state.map},
        getCapitolSelected: (state) => {return state.capitolSelected},
        getAnySelected: (state) => {return state.anySelected},
        getDistricteSelected: (state) => {return state.districteSelected},
        getBarriSelected: (state) => {return state.barriSelected},
        getEstil: (state) => {return state.estil},
        getPopup: (state) => {return state.popup},
        getFiltres: (state) => {return state.filtres},
        getCategoryDtw: (state) => {return state.categoryDtw},
        getDataview: (state) => {return state.dataview},
        getTaulaFiltre: (state) => {return state.taulaFiltre},
        getLlegendaFiltre: (state) => {return state.llegendaFiltre},
        getGraficaDC: (state) => {return state.graficaDC},
        getHistoricDC: (state) => {return state.historicDC},
        getGrafNivell: (state) => {return state.grafNivell},
        getChangeSrcFlag: (state) => {return state.changeSourceFlag},
        getChangeFltFlag: (state) => {return state.changeFilterFlag},
        getCountFilter: (state) => {return state.countFilter},
        getContentFilter: (state) => {return state.contentFilter},
        getFilter: (state) => {return state.filter},
        getResetMenuFlag: (state) => {return state.resetMenusFlag},
    },
    mutations:{
        setClient: (state, payload) => {state.client = payload},
        setSource:(state, payload) => {state.source = payload},
        setMap: (state, payload) => {state.map = payload},
        setCapitolSelected: (state, payload) => {state.capitolSelected = payload},
        setAnySelected: (state, payload) => {state.anySelected = payload},
        setDistricteSelected: (state, payload) => {state.districteSelected = payload},
        setBarriSelected: (state, payload) => {state.barriSelected = payload},
        setEstil: (state, payload) => {state.estil = payload},
        setPopup: (state, payload) => {state.popup = payload},
        setFiltreAny: (state, payload) => {state.filtres.any = payload},
        setFiltreDte: (state, payload) => {state.filtres.dte = payload},
        setFiltreBarri: (state, payload) => {state.filtres.bar = payload},
        setCategoryDtw: (state, payload) => {state.categoryDtw = payload},
        setDataview: (state, payload) => {state.dataview = payload},
        setTaulaFiltre: (state, payload) => {state.taulaFiltre = payload},
        setLlegendaFiltre: (state, payload) => {state.llegendaFiltre = payload},
        setGraficaDC: (state, payload) => {state.graficaDC = payload},
        setHistoricDC: (state, payload) => {state.historicDC = payload},
        setGrafNivell: (state, payload) => {state.grafNivell = payload},
        changeSrcFlag: (state) => {state.changeSourceFlag = !state.changeSourceFlag},
        changeFltFlag: (state) => {state.changeFilterFlag = !state.changeFilterFlag},
        setCountFilter: (state, payload) => {state.countFilter = payload},
        setContentFilter: (state, payload) => {state.contentFilter = payload},
        setFilter: (state, payload) => {state.filter = payload},
        changeResetMenuFlag: (state) => {state.resetMenusFlag = !state.resetMenusFlag}
    },


    actions:{
        addFiltreSource: function ({dispatch, commit, state}, obj){
            let self = this;
            dispatch('removeAllLayers');

            dispatch('removeAllDataviews');
            commit('setDataview', null);
            commit('setCountFilter', 0);
            commit('setFilter', obj.filtre);

            // Reset Menu
            commit('setCapitolSelected', null);
            commit('setAnySelected', null);
            commit('setDistricteSelected', null);
            commit('setBarriSelected', null);

            let estil = new Carto.style.CartoCSS(Estils.defaultColors2);
            let source =  new Carto.source.SQL(obj.query);

            let newLayer = new Carto.layer.Layer(source, estil);
            newLayer.setFeatureClickColumns(['refcat']);
            newLayer.on('featureClicked', function(ev){
                console.log(ev);
                Query.getByRefcatFiltered(Menu, ev.data.refcat, obj.filtre).then(function(resp){
                    console.log("BY REFCAT", resp);

                    let groupByCapitol = _.groupBy(_.flatten(resp), 'capitol');
                    _.forEach(groupByCapitol, function(v, k){
                        groupByCapitol[k] = _.groupBy(groupByCapitol[k], '_any');
                    });
                    console.log(groupByCapitol);

                    commit('setContentFilter', groupByCapitol);
                });
            }).on('featureOver', function(ev){
            }).on('featureOut', function(ev){
            });

            // Carreguem la nova layer
            this.state.client.addLayer(newLayer);

            //Afegim el dataview per fer el count del filtre
            const dataviews = this.getters.getClient.getDataviews();
            let categoryDw = new Carto.dataview.Category(source, 'refcat', {
                operation: Carto.operation.COUNT,
                operationColumn: 'refcat',
                limit: 1000
            });
            this.getters.getClient.addDataview(categoryDw);
            categoryDw.on('dataChanged', newData => {
                console.log("COUNT FILTER", newData);
                commit('setCountFilter', newData.count);
            });

        },
        updateSource: function({dispatch, commit, state}){
            let self = this;
            dispatch('removeAllLayers');

            // Creo estil segons selecció i menu
            let estil = Estils.createStylePunt(state.capitolSelected);
            commit('setEstil', new Carto.style.CartoCSS(estil));

            // Carrega el source com dataset
            commit('setSource', new Carto.source.Dataset(this.getters.getCapitolSelected.taula));

            //AFEGIM FILTRES DE MENU SI N'HI HA
            dispatch('updateFiltres');

            // Carrego el DATAVIEW segons filtre del menu
            if (this.getters.getCategoryDtw){
                this.getters.getClient.removeDataview(this.getters.getCategoryDtw);
            }
            let categoryDw = new Carto.dataview.Category(this.getters.getSource, this.getters.getCapitolSelected.column, {
                operation: Carto.operation.COUNT,
                operationColumn: this.getters.getCapitolSelected.column,
                limit: 1000
            });
            commit('setCategoryDtw', categoryDw);
            this.getters.getClient.addDataview(this.getters.getCategoryDtw);
            this.getters.getCategoryDtw.on('dataChanged', newData => {
                console.log("DATAVIEW GRAF", newData); // CategoryData object

                if (!this.getters.getLlegendaFiltre) {
                    console.log("ACTUALITZO DATAVIEW");
                    commit('setDataview', newData);
                }
            });

            // AFEGIM FILTRE DE TAULA SI N'HI HA (PER LES TAULES 6 i 7)
            if(this.getters.getTaulaFiltre){
                this.getters.getSource.removeFilter(this.getters.getTaulaFiltre);
            }
            let cap = _.filter(Menu, ['table', this.getters.getCapitolSelected.taula]);
            let filtre = _.filter(cap[0].filters, ['column', this.getters.getCapitolSelected.column]);
            console.log("HI HA FILTE DE CAPA?", filtre);
            if (filtre[0].hasOwnProperty('filtre')){
                console.log("ENTRO AL FILTRE DE CAPA");
                commit('setTaulaFiltre', new Carto.filter.Category(filtre[0].filtre.name, {eq: filtre[0].filtre.valor}));
                this.getters.getSource.addFilter(this.getters.getTaulaFiltre);
            }


            // Carregem la nova layer amb l'estil previament creat
            let newLayer = new Carto.layer.Layer(this.getters.getSource, this.getters.getEstil);
            newLayer.setFeatureClickColumns(['codiohb']);
            newLayer.on('featureClicked', function(ev){
                console.log(ev);
                Utils.createPopupContent(self.getters.getCapitolSelected.taula,
                    self.getters.getAnySelected,
                    ev.data.codiohb).
                then(function(content){
                    console.log("CONTENT", content);
                    self.state.popup.setContent(content);
                    self.state.popup.setLatLng(ev.latLng);
                    if (!self.state.popup.isOpen()){
                        self.state.popup.openOn(self.state.map);
                    }
                });
            }).on('featureOver', function(ev){
            }).on('featureOut', function(ev){
            });

            // Carreguem la nova layer
            this.state.client.addLayer(newLayer);

            this.getters.getSource.on('queryChanged', function(ev){
                console.log("PARO WAITING");
            });

            dispatch('actualitzemGrafiques');
            commit('changeSrcFlag');

        },

        actualitzemGrafiques: function({dispatch, commit}){
            let cap = _.filter(Menu, ['table', this.getters.getCapitolSelected.taula]);
            let filter = _.filter(cap[0].filters, ['column', this.getters.getCapitolSelected.column]);
            let sumatori = filter[0].radiusWidth;

            dispatch('actualitzemGrafica', {sum: sumatori});
            dispatch('actualitzemHistoric', {sum: sumatori});
        },


        actualitzemGrafica: function({dispatch, commit}, obj){
            let self = this;
            let sql = `
                        SELECT ${this.getters.getGrafNivell}, 
                        sum(${obj.sum})
                        from ${this.getters.getCapitolSelected.taula}
                        where _any = ${this.getters.getAnySelected}
                        group by ${this.getters.getGrafNivell}
                        order by ${this.getters.getGrafNivell}`;

            Query.executeQuery(sql).then((dades)=> {
                let dc = Utils.convertDadesGraficsToDataCollection(dades, this.getters.getGrafNivell, false);
                commit('setGraficaDC', dc);
                console.log(dc);
            });
        },

        actualitzemHistoric: function({dispatch, commit}, obj){
            let self = this;
            let sql =`
                        SELECT ${this.getters.getGrafNivell}, 
                            _any, 
                            sum(${obj.sum})
                        FROM ${this.getters.getCapitolSelected.taula}
                        group by ${this.getters.getGrafNivell}, _any 
                        order by ${this.getters.getGrafNivell}`;

            Query.executeQuery(sql).then((dades) => {
                console.log(dades);
                let dc = Utils.convertDadesgraficsToDCHistoric(dades, self.getters.getGrafNivell);
                commit('setHistoricDC', dc);
                console.log(dc);
            });
        },

        setGrafNivell: function({dispatch, commit}, obj){
            commit('setGrafNivell', obj.amb);
            dispatch('actualitzemGrafiques');
        },

        setLlegendaFiltre: function ({dispatch, commit}, obj){
            let cap = _.find(Menu, ['table', this.getters.getCapitolSelected.taula]);
            let filtre = _.find(cap.filters, ['column', this.getters.getCapitolSelected.column]);
            let op = _.find(filtre.options, ['name', obj.cat.name]);
            console.log("LL", op);

            if(this.getters.getLlegendaFiltre){
                this.getters.getSource.removeFilter(this.getters.getLlegendaFiltre);
            }
            commit('setLlegendaFiltre', new Carto.filter.Category(filtre.column, {eq: op.name}));

            this.getters.getSource.addFilter(this.getters.getLlegendaFiltre);
        },
        cleanLlegendaFiltre: function({dispatch, commit}){
            if(this.getters.getLlegendaFiltre){
                this.getters.getSource.removeFilter(this.getters.getLlegendaFiltre);
            }
            commit('setLlegendaFiltre', null);
        },

        removeAllLayers: function({commit, state}){
            _.forEach(state.client.getLayers(), function(l){
                state.client.removeLayer(l);
            });
        },

        removeAllDataviews: function({commit, state}){
            let self = this;
            _.forEach(this.getters.getClient.getDataviews(), function(d){
                self.getters.getClient.removeDataview(d).then(() => {
                    console.log('Dataviews removed');
                })
                    .catch(cartoError => {
                        console.error(cartoError.message);
                    });
            });
        },

        addAnyFilter: function({dispatch, commit}){
            if (this.getters.getFiltres.any){
                this.getters.getSource.removeFilter(this.getters.getFiltres.any);
            }

            if(this.getters.getAnySelected) {
                commit('setFiltreAny', new Carto.filter.Category('_any', {eq: this.getters.getAnySelected}));
                dispatch('updateFiltres');
            } else {
                commit('setFiltreAny', null);
            }

            let cap = _.filter(Menu, ['table', this.getters.getCapitolSelected.taula]);
            let filter = _.filter(cap[0].filters, ['column', this.getters.getCapitolSelected.column]);
            let sumatori = filter[0].radiusWidth;
            dispatch('actualitzemGrafica', {sum: sumatori});
        },

        addDteFilter: function({dispatch, commit}){
            if (this.getters.getFiltres.dte){
                this.getters.getSource.removeFilter(this.getters.getFiltres.dte);
            }

            if(this.getters.getDistricteSelected) {
                commit('setFiltreDte', new Carto.filter.Category('dtenum', {eq: this.getters.getDistricteSelected.dtenum}));
                dispatch('updateFiltres');
            } else {
                commit('setFiltreDte', null);
            }
        },

        addBarriFilter: function({dispatch, commit}){
            if (this.getters.getFiltres.bar){
                this.getters.getSource.removeFilter(this.getters.getFiltres.bar);
            }

            if(this.getters.getBarriSelected) {
                commit('setFiltreBarri', new Carto.filter.Category('barnum', {eq: this.getters.getBarriSelected.barnum}));
                dispatch('updateFiltres');
            } else {
                commit('setFiltreBarri', null);
            }
        },

        updateFiltres: function({dispatch, commit}){

            if (this.getters.getFiltres.any) {
                this.getters.getSource.addFilter(this.getters.getFiltres.any);
            }
            if (this.getters.getFiltres.dte) {
                this.getters.getSource.addFilter(this.getters.getFiltres.dte);
            }
            if (this.getters.getFiltres.bar) {
                this.getters.getSource.addFilter(this.getters.getFiltres.bar);
            }

            dispatch('cleanLlegendaFiltre');
            console.log("FILTRES", this.getters.getSource.getFilters());
        },

    }
})
