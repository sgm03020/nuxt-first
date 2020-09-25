<template>
  <div class="container ma-0 pa-0">
    <h3>ip={{ ip }}</h3>
    <h3>count={{ count }}</h3>
    <h3>propcount={{ propcount }}</h3>
    <table class="table" border="1">
      <thead>
        <tr>
          <!-- <th v-for="(column, index) in columns" :key="index">{{column}}</th> -->
          <th rowspan="5">時刻</th>
          <th colspan="3">2020年9月</th>
          <th colspan="4">2020年10月</th>
        </tr>
        <!-- ダミーtr -->
        <tr class="dummy-top">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr class="days">
          <th>
            <span data-style="num">28</span>
          </th>
          <th>
            <span data-style="num">29</span>
          </th>
          <th>
            <span data-style="num">30</span>
          </th>
          <th>
            <span data-style="num">1</span>
          </th>
          <th>
            <span data-style="num">2</span>
          </th>
          <th>
            <span data-style="num">3</span>
          </th>
          <th>
            <span data-style="num">4</span>
          </th>
        </tr>
        <tr class="dow">
          <th>
            <span data-style="dow">(月)</span>
          </th>
          <th>
            <span data-style="dow">(火)</span>
          </th>
          <th>
            <span data-style="dow">(水)</span>
          </th>
          <th>
            <span data-style="dow">(木)</span>
          </th>
          <th>
            <span data-style="dow">(金)</span>
          </th>
          <th>
            <span data-style="dow">(土)</span>
          </th>
          <th>
            <span data-style="dow">(日)</span>
          </th>
        </tr>
        <tr class="dummy-bottom">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in baseItems" :key="index">
          <!-- <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td> -->
          <td>{{item[columns[0]]}}</td>
          <td>
            <!-- <v-btn block depressed>0-{{index}}-{{item[columns[1]]}}</v-btn> -->
            <button
              type="button"
              class="clear-decoration"
              v-on:click="greet"
            >0-{{index}}-{{item[columns[1]]}}</button>
          </td>
          <td>
            <button
              type="button"
              class="clear-decoration"
              v-on:click="dec"
            >1-{{index}}-{{item[columns[2]]}}</button>
          </td>
          <td>2-{{index}}-{{item[columns[3]]}}</td>
          <td>3-{{index}}-{{item[columns[4]]}}</td>
          <td>4-{{index}}-{{item[columns[5]]}}</td>
          <td>5-{{index}}-{{item[columns[6]]}}</td>
          <td>6-{{index}}-{{item[columns[7]]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    ip: {
      type: String,
      default: '0.0.0.0',
    },
    propcount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
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
