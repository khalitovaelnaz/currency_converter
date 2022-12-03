<template>
  <div>
    <v-container id="dropdown-example-3">
      <v-overflow-btn
        class="my-2"
        v-model="selectedCurrency"
        :items="$store.getters.items"
        dense
      ></v-overflow-btn>
    </v-container>
    <v-card class="mx-auto" max-width="95%" tile>
      <template v-for="valute in $store.getters.valutes">
        <v-list-item
          v-if="valute['CharCode'] !== $store.state.selectedCurrency"
          :key="valute['ID']"
        >
          <v-list-item-content>
            <v-list-item-title>Валюта: {{ valute["Name"] }}</v-list-item-title>
            <v-list-item-subtitle
              >Значение: {{ valute["Value"] }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Аббревиатура: {{ valute["CharCode"] }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    selectedCurrency: {
      get(){return this.$store.state.selectedCurrency},
      set(value){this.$store.commit("updateSelectedCurrency",value)}
    }
  }
};
</script>
