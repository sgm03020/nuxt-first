<!--
<template>
  <WeeklyBase />
</template>
-->

<!-- 1. 週間予約カレンダー -->
<template>
  <div class="container ma-0 pa-0">
    <!-- <WeeklyBase /> -->
    <!-- <ItemForHour /> -->
    <!-- <WeeklyGoodTable /> -->
    <!-- <WeeklyTest /> -->
    <h3>weekly page count: {{ count }}</h3>
    <h4>isConfirm:{{ this.isConfirm }}</h4>
    <!-- <h3>initDays.d1: {{initDays.d1}}</h3> -->
    <!-- <h3>{{initDays.d1.format('YYYY/MM/DD')}}</h3> -->
    <!-- <h3>{{this.$strLength('123')}}</h3> -->
    <!-- :now="now" -->
    <!-- v-model="now" -->
    <!-- v-if="!isConfirm"  -->
    <transition name="fade" mode="out-in">
      <div v-if="!isConfirm">
        <v-container class="ma-0 pa-0">
          <v-row class="justify-space-between ma-0 px-2 py-0">
            <v-btn icon color="indigo" @click="weeklyUpdate(sow, 0)">
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="debugMode">
              <v-icon>mdi-circle</v-icon>
            </v-btn>
            <v-btn icon color="green" @click="weeklyUpdate(sow, 1)">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-row>
        </v-container>
        <!-- 要点 -->
        <!-- 1. 日の情報だけ持つ days (days) -->
        <!-- 2. 基本時刻リスト(9,10,11) (baseList)-->
        <!-- 3. 各日の各時刻の情報リスト(timeList) -->
        <WeeklyRawTable
          :debug="debug"
          :ip="ip"
          :propcount="count"
          :now="now"
          :days="days"
          :ymcount="ymCount"
          :ptcount="ptCount"
          :baseList="baseList"
          :timeList="bookingTimeList"
          @select="doConfirm($event)"
        />
      </div>
    </transition>
    <!-- 2. 確認画面用 -->
    <modal
      name="confirm-content"
      width="98%"
      height="auto"
      :minHeight="200"
      :maxHeight="600"
      :delay="500"
      :clickToClose="false"
    >
      <h2 class="ma-2 pa-2">予約依頼のご確認</h2>
      <p></p>
      <v-container v-if="isConfirm" class="ma-2 pa-2">
        <v-row justify="center" align="center">
          <v-card>
            <v-row class="mx-0">
              <v-card-title class="mt-2 mx-6 mb-2 pa-0"> 担当： </v-card-title>
            </v-row>
            <v-card-title class="mt-3 mb-0 mx-6 pa-0">
              {{
                this.$dayjs(this.bookingTime.substring(0, 10)).format(
                  'YYYY年 M月 D日　(ddd)'
                )
              }}
            </v-card-title>
            <v-row class="mx-0">
              <v-spacer />
              <v-card-title class="mt-2 mx-6 mb-2 pa-0">
                {{ this.$dayjs(this.bookingTime).format(' h時 mm分') }}
              </v-card-title>
            </v-row>
          </v-card>
        </v-row>
        <v-row class="justify-space-between mx-2 pa-2">
          <v-btn v-on:click="hide">閉じる</v-btn>
          <nuxt-link to="/">Topへ戻る</nuxt-link>
        </v-row>
      </v-container>
    </modal>

  </div>
</template>



<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
import WeeklyGoodTable from '@/components/WeeklyGoodTable'
import WeeklyRawTable from '@/components/WeeklyRawTable'
import WeeklyTest from '@/components/WeeklyTest'
// import Mixin from '../mixins/mixin.js'

// ロケール日本で月曜スタートになっていないために使う
import updateLocale from 'dayjs/plugin/updateLocale'

export default {
  // mixins: [Mixin],
  // transition: {
  //   name: 'test',
  //   mode: 'out-in',
  // },
  components: {
    WeeklyBase,
    ItemForHour,
    WeeklyGoodTable,
    WeeklyRawTable,
    WeeklyTest,
  },
  data() {
    return {
      show: true,
      debug: false,
      isConfirm: false,
      bookingDateTime: undefined, //未使用
      bookingDate: undefined, //未使用
      bookingTime: undefined,
      ip: '',
      now: undefined,
      sow: undefined,
      ymCount: 7,
      dayCount: 7,
      ptCount : 0, // 過去日時の個数
      days: [],
      baseHours: [],
      baseList: [],
      bookingTimeList: [],
      yearMonthList: [], // 削除予定
    }
  },
  // 初期データを取得(fetch)
  async fetch() {
    console.log('call fetch')
    const { ip } = this.$axios.$get('http://icanhazip.com')
    this.ip = '0'

    // 日本ロケールで月曜スタートにするために以下が必要
    // (デフォルトでdayjsのesm/locale/ja.jsにweekStartが付加されていないため)
    this.$dayjs.extend(updateLocale)
    this.$dayjs.updateLocale('ja', {
      weekStart: 1,
    })

    let now = await this.$dayjs()
    let sow = await this.$dayjs().startOf('week')
    this.now = now.format('YYYY/MM/DD')
    this.sow = sow

    this.weeklyUpdate(sow, undefined)
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
      //console.log('Call the computed count')
      return this.$store.state.counter.count
    },
  },
  methods: {
    debugMode() {
      this.debug = !this.debug
      //console.log('Call debugMode ', this.debug)
      //this.$set(this.debug, 0, !this.debug)
    },
    // 週の並びを更新
    // start : Start Of Week - dayjsオブジェクト
    // mode  : 0 - 前の7日
    //         1 - 次の7日
    //         undefined - 現時点の週の最初の月曜
    weeklyUpdate(start, mode) {
      let dayCount = 7

      let ym1 = undefined
      let ym2 = undefined
      let cnt = 0

      // 配列を空にする
      // days.length=0では更新しない
      this.days.splice(0, this.days.length)
      this.bookingTimeList.splice(0, this.bookingTimeList.length)
      this.baseList.splice(0, this.baseList.length)

      // TODO
      // 今の数にあった空の配列に置き換えるのはどうか
      // -> 値がないのでWeeklyRawTable.vueでエラーになるから
      // 空の場合の処理をWeeklyRawTable.vueで新たに作る必要がある
      //

      // console.log('bookingTimeList.length=', this.bookingTimeList.length)
      // console.log('bookingTimeList=', this.bookingTimeList)

      if (start == undefined) {
        //console.log('start is undefined return')
        return
      }

      // 新たな週スタート日
      let newStart = start
      let now = this.$dayjs()
      if (mode != undefined) {
        newStart = mode == 1 ? start.add(7, 'day') : start.subtract(7, 'day')
      }

      for (let i = 0; i < dayCount; i++) {
        let item = i == 0 ? newStart : newStart.add(i, 'day')
        //.format('YYYY/MM/DD')
        //let item = sow.add(i, 'day').format('YYYY/MM/DD')
        let year = item.year().toString() //sow.add(i, 'day').format('YYYY')
        let month = (item.month() + 1).toString() //sow.add(i, 'day').format('MM')
        let yymm = year + '年' + month + '月'
        let mm = month + '月'
        let day = item.format('D')
        let dow = '(' + item.format('ddd') + ')'
        let ym = item.format('YYYY/MM') || undefined
        // この場所は時間情報はないので.unix()で比較しても意味なし
        // ここでは日のみの比較しか出来ない
        let pt = item < now ? true : false
        let cr = '#333'
        if (item.day() == 0) {
          cr = 'red'
        } else if (item.day() == 6) {
          cr = 'royalblue'
        }
        if (i == 0) {
          ym1 = ym //item.substring(0, 7)
          cnt++
        } else if (ym1 && ym1 != ym) {
          ym2 = ym //item.substring(0, 7)
        } else if (ym1 && ym1 == ym) {
          cnt++
        }
        //console.log('cnt=', cnt)
        //
        // 配列の更新では画面に反映されない場合がある
        // その場合は$setを利用する、Vueが監視出来る配列のメソッドを使う
        // https://cloudpack.media/41984
        // Vueが監視出来る配列のメソッドを使う
        // push(), pop(), shift(), unshift(), splice(), sort(), reverse()
        //
        this.days.push({ item, year, month, yymm, mm, day, dow, ym, cr, pt })
      }
      //console.log('ym1=', ym1, ' ym2=', ym2, ' cnt=', cnt)
      // console.log(this.days)
      this.sow = newStart
      this.ymCount = cnt

      //
      // 予約日時リスト作成
      //

      // baseHour取得
      let baseHours = [9, 10, 11, 12]
      // 分の単位はどこまでか
      let basePeriod = 15
      // 予約可能時刻のリストを作る
      //let baseList = []
      // 予約日時
      //let bookingTimeList = []

      let ptCount = 0; // 過去時間である個数を数える
      for (let i = 0; i < baseHours.length; i++) {
        let line = []
        let limit = Math.floor(60 / basePeriod)
        let hourNumber = baseHours[i]
        let hourStr = ('00' + baseHours[i].toString()).slice(-2)
        let hm1 = ''
        let hm2 = ''
        for (let j = 0; j < limit; j++) {
          // 時刻 09:05:00
          hm1 = hourNumber.toString() + ':' + ('00' + j * basePeriod).slice(-2)
          hm2 = hourStr + ':' + ('00' + j * basePeriod).slice(-2) + ':' + '00'
          this.baseList.push(hm1)

          let list1 = []
          for (let j = 0; j < this.dayCount; j++) {
            let datetime = this.days[j].item.format('YYYY/MM/DD') + 'T' + hm2
            // 過去日時の個数を記録
            if (now.unix() >= this.$dayjs(datetime).unix()) {
                // console.log('datetime=', datetime)
                ptCount++
            }

            list1.push(datetime)
          }
          this.bookingTimeList.push(list1)
        }
      }
      // ptCount
      console.log('ptCount=', ptCount)
      this.ptCount = ptCount

      /*
      // 全ての時間割りを計算してリストにする
      //console.log('this.baseList.length=', this.baseList.length)
      for (let i = 0; i < this.baseList.length; i++) {
        let datetime
        let list1 = []
        for (let j = 0; j < this.dayCount; j++) {
          datetime =
            this.days[j].item.format('YYYY/MM/DD') + 'T' + this.baseList[i]
          // this.days[j].item.format('YYYY/MM/DD') + ' ' + this.baseList[i]
          //console.log('datetime=', datetime)
          list1.push(datetime)
        }
        this.bookingTimeList.push(list1)
      }
      */

      //console.log(this.bookingTimeList)
      //console.log(this.bookingTimeList[0])
    },
    doConfirm(event) {
      // event: 選択日時(文字列)
      //        2020/09/22 9:00
      // ここで担当者情報を付加して遷移
      console.log('doConfirm event=', event)
      this.bookingTime = event

      // 遷移の場合
      //this.$router.push('/confirm')
      // 遷移させない場合
      this.isConfirm = true
      this.$modal.show('confirm-content')
      /*
      this.$modal.show('dialog', {
        title: 'The standard Lorem Ipsum passage',
        text: 'Lorem ipsum dolor sit amet, ...',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.isConfirm = false
              this.$modal.hide('dialog')
            },
          },
          {
            title: 'Like',
            handler: () => {
              alert('Like action')
            },
          },
          {
            title: 'Repost',
            handler: () => {
              alert('Repost action')
            },
          },
        ],
      })
      */
    },
    hide() {
      this.bookingDateTime = undefined
      this.bookingDate = undefined
      this.bookingTime = undefined
      this.isConfirm = false
      this.$modal.hide('confirm-content')
    },
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade2-enter-active,
.fade2-leave-active {
  transition: opacity 0.5s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
