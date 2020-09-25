<template>
  <div>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      console.log('Call the computed count')
      return this.$store.state.counter.count
    },
  },
  methods: {
    // 「+」ボタンクリック時に呼ばれる
    increment() {
      console.log('Call the methods increment')
      // mutations の increment を呼び出す
      this.$store.commit('counter/increment')
    },
    // 「-」ボタンクリック時に呼ばれる
    decrement() {
      console.log('Call the methods decrement')
      // mutations の decrement を呼び出す
      this.$store.commit('counter/decrement')
    },
  },
}
</script>
