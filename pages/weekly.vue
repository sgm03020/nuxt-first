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
    <h3>weekly page count: {{count}}</h3>
    <!-- <h3>initDays.d1: {{initDays.d1}}</h3> -->
    <h3>{{initDays.d1.format('YYYY/MM/DD')}}</h3>
    <WeeklyRawTable :ip="ip" :propcount="count" :now="now" />
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
  data() {
    return {
      initDays: {
          d1: undefined,
          d2: undefined,
          d3: undefined,
          d4: undefined,
          d5: undefined,
          d6: undefined,
          d7: undefined,
      }        
    }   
  },
  // 初期データを取得
  async asyncData({ $axios, $dayjs }) {
    // asyncData という nuxt 特有の機能において
    //console.log("asyncData...");
    //const ip = await $axios.$get('http://icanhazip.com')
    //return { ip }
    // now: 本日
    // sow: 週初(start of week)
    // data()では宣言しているが、asyncDataでは使えないので
    // ここで再宣言する
    // https://stackoverflow.com/questions/62015904/access-data-object-in-asyncdata-nuxt
    // APIによると、asyncDataはクライアント側のロード後にデータにマージされます。
    // つまり、ページの戻り値オブジェクトにアクセスできます。
    //
    // しかし、このような場合はfetch()で対応するのがよいようだ
    // fetchではthis.が効く

    let initDays = {
      d1: undefined,
      d2: undefined,
    }
    const [ip, now, sow] = await Promise.all([
      $axios.$get('http://icanhazip.com'),
      $dayjs().format('YYYY/MM/DD'),
      $dayjs().startOf('week'),
    ])

    // asyncDataではthisは禁止(インスタンス生成より先に実行されるから)
    //this.initDays.d1 = sow.add(1,'day').format('YYYY/MM/DD')
    console.log("sow=", sow.format('YYYY/MM/DD'))
    console.log("next=",sow.add(1,'day').format('YYYY/MM/DD'))
    initDays.d1 = sow
    initDays.d2 = sow.add(1,'day')
    initDays.d3 = sow.add(2,'day')
    initDays.d4 = sow.add(3,'day')
    initDays.d5 = sow.add(4,'day')
    initDays.d6 = sow.add(5,'day')
    initDays.d7 = sow.add(6,'day')
    return { ip, now, initDays}
  },
  computed: {
    count() {
      console.log('Call the computed count')
      return this.$store.state.counter.count
    },
  },
}
</script>

