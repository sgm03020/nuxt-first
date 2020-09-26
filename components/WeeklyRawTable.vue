<template>
  <div class="container ma-0 pa-0">
    <h4>debug={{ debug }}</h4>
    <template v-if="debug">
      <h4>ip={{ ip }}</h4>
      <h4>count={{ count }}</h4>
      <h4>propcount={{ propcount }}</h4>
      <h4>now={{ now }}</h4>
      <h4>ymcount={{ ymcount }}</h4>
      <!-- <h4>days[0]={{ days[0] }}</h4> -->
      <!-- <h4>days[0]={{ days[0] }}</h4> -->
    </template>
    <!-- days配列が空の時間は表示しない -->
    <!-- <table v-if="days && days.length>0" class="table" border="1"> -->
    <table class="table ma-0 pa-0" border="1">
      <thead>
        <tr>
          <!-- <th v-for="(column, index) in columns" :key="index">{{column}}</th> -->
          <th rowspan="5">時刻</th>
          <!-- <th colspan="3">2020年9月</th> -->

          <!-- パターン1 -->
          <!-- <th v-if="days[0]" v-bind:colspan="ymcount">
            {{days[0].yymm}}
          </th>
          <th v-else v-bind:colspan="ymcount" /> -->

          <!-- パターン2 -->
          <th v-if="ymcount > 1" v-bind:colspan="ymcount">
            <!-- パターン2-1 OK -->
            {{ days && days[0] ? days[0].yymm : undefined || undefined }}
            <!-- パターン2-2 OKだけどyymmがない場合はdays[0]が全部表示 -->
            <!-- {{ days && days[0] && days[0].yymm}} -->
            <!-- パターン2-3 これはエラー-->
            <!-- {{ days[0].yymm}} -->
          </th>
          <!-- セル1つ分しかない場合は月のみ -->
          <th v-else v-bind:colspan="ymcount">
            <!-- パターン2-1 OK -->
            {{ days && days[0] ? days[0].mm : undefined || undefined }}
          </th>

          <!-- <th colspan="4">2020年10月</th> -->
          <th v-if="ymcount < 6" v-bind:colspan="7 - ymcount">
            {{
              days && days[ymcount]
                ? days[ymcount].yymm
                : undefined || undefined
            }}
          </th>
          <th v-else-if="ymcount == 6" v-bind:colspan="7 - ymcount">
            <!-- パターン2-1 OK -->
            {{
              days && days[ymcount] ? days[ymcount].mm : undefined || undefined
            }}
          </th>
        </tr>
        <!-- ダミーtr -->
        <tr class="dummy-top">
          <th v-for="index in 7" :key="index" />
        </tr>

        <tr class="days">
          <!-- <th v-for="(dy, index) in days" :key="index"> -->
          <th v-for="index in 7" :key="index">
            <template v-if="days && days[index - 1]">
              <span
                data-style="num"
                v-bind:style="{ color: days[index - 1].cr }"
              >
                {{
                  days && days[index - 1]
                    ? days[index - 1].day
                    : undefined || undefined
                }}

                <!-- {{ days[index - 1].cr }} -->
              </span>
            </template>
          </th>
        </tr>
        <tr class="dow">
          <th v-for="index in 7" :key="index">
            <!-- 要素が揃う場合のみ -->
            <template v-if="days && days[index - 1]">
              <span
                data-style="dow"
                v-bind:style="{ color: days[index - 1].cr }"
              >
                {{
                  days && days[index - 1]
                    ? days[index - 1].dow
                    : undefined || undefined
                }}
              </span>
            </template>
          </th>
        </tr>
        <!-- 縦余白の調節のためのダミー行 -->
        <tr class="dummy-bottom">
          <th v-for="index in 7" :key="index" />
        </tr>
      </thead>

      <tbody v-if="0">
        <tr v-for="(item, index) in baseItems" :key="index">
          <!-- <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td> -->
          <td>{{ item[columns[0]] }}</td>
          <td>
            <!-- <v-btn block depressed>0-{{index}}-{{item[columns[1]]}}</v-btn> -->
            <button type="button" class="clear-decoration" v-on:click="greet">
              0-{{ index }}-{{ item[columns[1]] }}
            </button>
          </td>
          <td>
            <button type="button" class="clear-decoration" v-on:click="dec">
              1-{{ index }}-{{ item[columns[2]] }}
            </button>
          </td>
          <td>2-{{ index }}-{{ item[columns[3]] }}</td>
          <td>3-{{ index }}-{{ item[columns[4]] }}</td>
          <td>4-{{ index }}-{{ item[columns[5]] }}</td>
          <td>5-{{ index }}-{{ item[columns[6]] }}</td>
          <td>6-{{ index }}-{{ item[columns[7]] }}</td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="(el, i) in timeList" :key="i">
          <td>
            {{ baseList[i] }}
            <!-- <button type="button" class="clear-decoration" v-on:click="greet" >BTN</button> -->
          </td>
          <td v-for="(tm, j) in el" :key="j">
            <!-- <button
              :key="j"
              :data-booking-time="tm"              
              type="button"
              style="width:100%;height:100%"
              class="clear-decoration ma-0 pa-2"
              v-on:click="greet"
            >&nbsp;</button> -->
            <v-card flat hover :data-booking-time="tm" :key="j" v-on:click="confirm(tm)">
              <!-- <v-img
                src="https://picsum.photos/id/11/500/300"
                lazy-src="https://picsum.photos/id/11/10/6"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="200"
                max-height="200"
              >
              </v-img> -->
              <!-- <span style="color:red;">◎</span> -->
              ◎
            </v-card>
            <!-- <v-btn small text @click="greet" class="ma-0 pa-0">
              <v-icon>mdi-circle</v-icon>
            </v-btn> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    ip: {
      type: String,
      default: '',
    },
    propcount: {
      type: Number,
      default: 0,
    },
    now: {
      type: String,
      default: undefined,
      //default: () => (null),
    },
    ymcount: {
      type: Number,
      default: 7,
    },
    ymlist: {
      type: Array,
      default: () => {},
    },
    days: {
      type: Array,
      default: () => {},
    },
    baseList: {
      type: Array,
      default: () => {},
    },
    timeList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      dowArray: ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'],
      baseItems: [
        {
          hour: '9:00',
          d1: 'A',
          d2: 'B',
          d3: 'C',
          d4: 'D',
          d5: 'E',
          d6: 'F',
          d7: 'G',
        },
        {
          hour: '10:00',
          d1: 'a',
          d2: 'b',
          d3: 'c',
          d4: 'd',
          d5: 'e',
          d6: 'f',
          d7: 'g',
        },
        {
          hour: '11:00',
          d1: 'X',
          d2: 'Y',
          d3: 'Z',
          d4: 'I',
          d5: 'F',
          d6: 'M',
          d7: 'N',
        },
        {
          hour: '12:00',
          d1: 'x',
          d2: 'y',
          d3: 'z',
          d4: 'i',
          d5: 'f',
          d6: 'm',
          d7: 'n',
        },
      ],
      items: [
        {
          hour: '9:00',
          d1: '〇',
          d2: '〇',
          d3: '〇',
          d4: '〇',
          d5: '〇',
          d6: '〇',
          d7: '〇',
        },
        {
          hour: '10:00',
          d1: '〇',
          d2: '〇',
          d3: '〇',
          d4: '〇',
          d5: '〇',
          d6: '〇',
          d7: '〇',
        },
        {
          hour: '11:00',
          d1: '〇',
          d2: '〇',
          d3: '〇',
          d4: '〇',
          d5: '〇',
          d6: '〇',
          d7: '〇',
        },
      ],
      columns: ['hour', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'],
    }
  },
  methods: {
    greet: function (event) {
      //alert('Hello ' + this.columns[0] + '!')
      //alert('Hello ' + this.baseItems[0][this.columns[0]] + '!')
      // テスト用
      this.$store.dispatch('counter/inc')

      // `event` は、ネイティブ DOM イベントです
      if (event) {
        //alert(event.target.tagName)
      }
    },
    dec: function (event) {
      this.$store.dispatch('counter/dec')
    },
    // 確認画面トリガー
    confirm: function (bookingDateTime) {
      console.log(bookingDateTime)
      showDialog
    },
  },
  computed: {
    count() {
      return this.$store.state.counter.count
    },
  },
}
</script>

<!-- https://allabout.co.jp/gm/gc/24011/#aa24011-merits -->
<style lang="scss" scoped>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: solid 2px orange;
  font-family: sans-serif;
  // font-size: 8px;
}

table thead {
  border: solid 1px orange;
}

table td {
  text-align: center;
  border: dashed 1px orange;
}

table td:first-child {
  text-align: right;
  padding-right: 0.3rem;
}

// ヘッダー日
table thead tr:nth-child(2) {
  font-size: large;
  line-height: 100%;
}

// ヘッダー日の線
table thead tr.days th {
  border-top: none;
  border-bottom: none;
}

// 曜日の下線
table thead tr.dow th {
  border-top: none;
  border-bottom: none;
}

table thead tr.dummy-top th {
  border-top: none;
  border-bottom: none;
}

table thead tr.dummy-bottom th {
  border-top: none;
  border-bottom: none;
}

// ヘッダー日
table thead tr.days {
  line-height: 100%;
  // background-color: royalblue;
}

// ヘッダー曜日(月・火・・)高さ
table thead tr:nth-child(4) {
  line-height: 100%;
}

// ヘッダー曜日
table thead tr:last-child th {
  vertical-align: text-top;
  font-size: x-small;
}

// 日の表示部分
// data-style
[data-style='num'] {
  font-size: large;
  vertical-align: bottom;
}
[data-style='dow'] {
  font-size: x-small;
  vertical-align: top;
}

//ダミー
tr.dummy-top {
  height: 0.5rem;
}
tr.dummy-bottom {
  height: 0.1rem;
}

// ボタン
button.clear-decoration {
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent; /* 背景の灰色を消す */
}

.decorated {
  cursor: pointer; /* マウスカーソルを乗せると指になる */
  outline: none;
  border: 1px solid #f00;
  background-color: rgb(255, 0, 0, 0.2);
}
</style>
