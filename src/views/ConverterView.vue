<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
    <v-text-field
      v-model="converter"
      label="Write currency (ex. 15 usd in rub)"
      :rules="converterRules"
      required
    ></v-text-field>
    <v-btn @click="count" :disabled="!valid">Count</v-btn>
    Result: {{ animatedResult }}
  </v-form>
</template>

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      converter: "",
      result: 0,
      tweenedResult: 0,
      valid: false,
      converterRules: [
        (v) => !!v || "input required",
        (v) => {
          let parse = v.split(" ");
          if (
            parse.length === 4 &&
            !isNaN(parse[0]) &&
            parse[1].length === 3 &&
            parse[2] === "in" &&
            parse[3].length === 3
          ) {
            return true;
          } else {
            return "Некорректный ввод";
          }
        },
      ],
    };
  },
  methods: {
    count() {
      this.validate();
      let parse = this.converter.split(" ");
      let num = parse[0];
      let currencies1 = parse[1].toUpperCase();
      let currencies2 = parse[3].toUpperCase();
      let value = this.$store.state.currencies["Valute"][currencies1]["Value"]
      let value2 = this.$store.state.currencies["Valute"][currencies2]["Value"];
      this.result = (value / value2) * num;
    },
    //валидация средствами Vuetify
    validate() {
      this.$refs.form.validate();
    },
  },
  computed: {
    //для анимации, с использованием gsap
    animatedResult: function () {
      return this.tweenedResult.toFixed(0);
    },
  },
  watch: {
    //для анимации, с использованием gsap
    result: function (newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedResult: newValue });
    },
  },
};
</script>
