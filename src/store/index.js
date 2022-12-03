import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: {},
    selectedCurrency: "RUB",
  },
  getters: {
    items: (state) => {
      let items = [];
      for (let valute in state.currencies["Valute"]) {
        items.push(valute);
      }
      return items;
    },
    valutes: (state) => {
      let valutes = { ...state.currencies["Valute"] };
      let valueCurrency = 0;
      if (Object.entries(valutes).length) {
        valueCurrency =
          state.selectedCurrency === "RUB"
            ? valutes.RUB["Value"]
            : valutes[state.selectedCurrency]["Value"];
      }
      for (let valute in valutes) {
        valutes[valute]["Value"] = valutes[valute]["Value"] / valueCurrency;
      }
      return valutes;
    },
  },
  mutations: {
    setCurrencies(state, currencies) {
      currencies["Valute"].RUB = {
        "ID": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "CharCode": "RUB",
      };
      state.currencies = currencies;
    },
    updateSelectedCurrency(state, value) {
      state.selectedCurrency = value;
    },
  },
  actions: {
    getCurrencies({ commit }) {
      fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => response.json())
        .then((currencies) => commit("setCurrencies", currencies));
    },
  },
  modules: {},
});
