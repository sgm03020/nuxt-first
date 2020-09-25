<!--
<template>
  <WeeklyBase />
</template>
-->
<template>
  <div class="container">
    <!-- <WeeklyBase /> -->
    <!-- <ItemForHour /> -->
    <!-- <WeeklyGoodTable /> -->
    <!-- <WeeklyTest /> -->
    <h2>{{count}}</h2>
    <WeeklyRawTable :ip="ip" :propcount="count"/>
  </div>
</template>

<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
import WeeklyGoodTable from '@/components/WeeklyGoodTable'
import WeeklyRawTable from '@/components/WeeklyRawTable'
import WeeklyTest from '@/components/WeeklyTest'

export default {
  components: {
    WeeklyBase,
    ItemForHour,
    WeeklyGoodTable,
    WeeklyRawTable,
    WeeklyTest,    
  },
  async asyncData({ $axios }) {
    // asyncData という nuxt 特有の機能において
    //console.log("asyncData...");
    const ip = await $axios.$get('http://icanhazip.com')
    return { ip }
  },
  computed: {
    count() {
      console.log('Call the computed count')
      return this.$store.state.counter.count
    },
  },  
}
</script>

