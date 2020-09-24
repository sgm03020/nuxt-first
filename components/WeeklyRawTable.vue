<template>
  <!-- <div class="container ma-0 pa-0"> -->
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
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td>
      </tr>
    </tbody>
  </table>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          hour: '9:00',
          h1: '〇',
          h2: '〇',
          h3: '〇',
          h4: '〇',
          h5: '〇',
          h6: '〇',
          h7: '〇',
        },
        {
          hour: '10:00',
          h1: '〇',
          h2: '〇',
          h3: '〇',
          h4: '〇',
          h5: '〇',
          h6: '〇',
          h7: '〇',
        },
        {
          hour: '11:00',
          h1: '〇',
          h2: '〇',
          h3: '〇',
          h4: '〇',
          h5: '〇',
          h6: '〇',
          h7: '〇',
        },
      ],
      columns: ['hour', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'],
    }
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
</style>
