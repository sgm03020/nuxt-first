<template>
  <v-container>
    <h2>確認画面</h2>
    <v-row class="justify-space-between ma-2 pa-2">
      <v-btn @click="back">前の画面</v-btn>
      <nuxt-link to="/">Topへ戻る</nuxt-link>
      <button class="btn btn-next">次</button>
    </v-row>
  </v-container>
</template>


<script>
export default {
  methods: {
    returnTop() {
      this.$router.push('/')
    },
    back() {
      this.$router.back()
    },
  },
}
</script>
