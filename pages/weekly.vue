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
    <h3>weekly page count: {{ count }}</h3>
    <!-- <h3>initDays.d1: {{initDays.d1}}</h3> -->
    <!-- <h3>{{initDays.d1.format('YYYY/MM/DD')}}</h3> -->
    <!-- <h3>{{this.$strLength('123')}}</h3> -->
    <!-- :now="now" -->
    <!-- v-model="now" -->
    <v-container>
      <v-row class="justify-space-between ma-0 px-2 py-0">
        <v-btn icon color="indigo">
          <v-icon>mdi-star</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="debugMode">
          <v-icon>mdi-circle</v-icon>
        </v-btn>
        <v-btn icon color="green">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <WeeklyRawTable
      :debug="debug"
      :ip="ip"
      :propcount="count"
      :now="now"
      :days="days"
      :ymcount="ymCount"
      :ymlist="yearMonthList"
    />
  </div>
</template>

<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
import WeeklyGoodTable from '@/components/WeeklyGoodTable'
import WeeklyRawTable from '@/components/WeeklyRawTable'
import WeeklyTest from '@/components/WeeklyTest'
// import Mixin from '../mixins/mixin.js'

export default {
  // mixins: [Mixin],
  components: {
    WeeklyBase,
    ItemForHour,
    WeeklyGoodTable,
    WeeklyRawTable,
    WeeklyTest,
  },
  data() {
    return {
      debug: true,
      ip: '',
      now: undefined,
      yearMonthList: [],
      ymCount: 7,
      days: [],
      // days: {
      //   d1: '',
      //   d2: '',
      //   d3: '',
      //   d4: '',
      //   d5: '',
      //   d6: '',
      //   d7: '',
      // },
    }
  },
  // 初期データを取得(fetch)
  async fetch() {
    const { ip } = this.$axios.$get('http://icanhazip.com')
    this.ip = '0'
    const now = await this.$dayjs()
    const sow = await this.$dayjs().startOf('week')
    this.now = now.format('YYYY/MM/DD')

    let initDays = {
      d1: sow.format('YYYY/MM/DD/ddd'),
      d2: sow.add(1, 'day').format('YYYY/MM/DD/ddd'),
      d3: sow.add(2, 'day').format('YYYY/MM/DD/ddd'),
      d4: sow.add(3, 'day').format('YYYY/MM/DD/ddd'),
      d5: sow.add(4, 'day').format('YYYY/MM/DD/ddd'),
      d6: sow.add(5, 'day').format('YYYY/MM/DD/ddd'),
      d7: sow.add(6, 'day').format('YYYY/MM/DD/ddd'),
    }
    //let items = []
    let dayCount = 7

    let ym1 = undefined
    let ym2 = undefined
    let cnt = 0
    for (let i = 0; i < dayCount; i++) {
      let item = sow.add(i, 'day').format('YYYY/MM/DD')
      let year = sow.year().toString() //sow.add(i, 'day').format('YYYY')
      let month = (sow.month() + 1).toString() //sow.add(i, 'day').format('MM')
      let yymm = year + '年' + month + '月'
      let day = sow.add(i, 'day').format('DD')
      let dow = '(' + sow.add(i, 'day').format('ddd') + ')'
      let ym = item.substring(0, 7) || undefined
      if (i == 0) {
        ym1 = item.substring(0, 7)
        cnt++
      } else if (ym1 && ym1 != ym) {
        ym2 = item.substring(0, 7)
      } else if (ym1 && ym1 == ym) {
        cnt++
      }
      //
      // 配列の更新では画面に反映されない場合がある
      // その場合は$setを利用する、Vueが監視出来る配列のメソッドを使う
      // https://cloudpack.media/41984
      // Vueが監視出来る配列のメソッドを使う
      // push(), pop(), shift(), unshift(), splice(), sort(), reverse()
      //
      this.days.push({ item, year, month, yymm, day, dow })
    }
    //console.log('ym1=', ym1, ' ym2=', ym2, ' cnt=', cnt)
    console.log(this.days)

    this.ymCount = cnt

    //
    // OLD CODE
    //
    /*
    if (false) {
      // daysセット
      this.days = initDays

      // 同じ月のデータがいくつあるか
      let first = initDays.d1.slice(0, 7)
      let array = []
      for (let i in initDays) {
        array.push(initDays[i].slice(0, 7))
      }

      // 最初の年/月に一致する個数
      let n = array.filter((item) => {
        return item == first
      }).length

      // ymCountセット
      this.ymCount = 4

      // 重複削除(注意IE11だとダメかも)
      let orderedArray = Array.from(new Set(array))

      // ★テスト用に追加
      orderedArray.push('2020/10')
      // yearMonthListセット
      this.yearMonthList = orderedArray

      //let array = Object.values(initDays)
      console.log(
        first,
        ':',
        array,
        ':',
        n,
        ' orderdArray=',
        orderedArray,
        ' size=',
        orderedArray.length
      )
    }
    */
  },
  //fetchOnServer: false,
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
    // fetchではデータへアクセスするには下記を参照すること
    // https://ja.nuxtjs.org/api/pages-fetch
    /*
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
    */
    return null
  },
  computed: {
    count() {
      console.log('Call the computed count')
      return this.$store.state.counter.count
    },
  },
  methods: {
    debugMode() {
      this.debug = !this.debug
      console.log('Call debugMode ', this.debug)
      //this.$set(this.debug, 0, !this.debug)
    },
  },
}
</script>
