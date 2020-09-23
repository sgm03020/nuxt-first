<!-- <span style="font-weight: bold; color: blue;">{{props.row.c1}}</span> -->
<template>
  <div>
    <v-card-title>
      <v-icon>mdi-application</v-icon>
    </v-card-title>
    <vue-good-table :columns="columns" :rows="rows">
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label != '時分'">
          <v-card light flat>
            <v-card-title>{{props.column.label}}</v-card-title>
            <v-card-subtitle>(月)</v-card-subtitle>
          </v-card>
        </span>
        <span v-else>
          <v-card light flat>
            <!-- <v-card-title>{{props.column.label}}</v-card-title> -->
            <v-card-subtitle>{{props.column.label}}</v-card-subtitle>
          </v-card>
        </span>
      </template>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field != 'hour'">
          <v-card light flat>
            <v-card-title>
              <v-icon>mdi-circle-outline</v-icon>
            </v-card-title>
          </v-card>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data() {
    return {
      columns: [
        {
          label: '時分',
          field: 'hour',
        },
        {
          label: '21',
          field: 'c1',
          html: true,
        },
        {
          label: '22',
          field: 'c2',
          html: true,
        },
        {
          label: '23',
          field: 'c3',
          html: true,
        },
        {
          label: '24',
          field: 'c4',
          html: true,
        },
        {
          label: '25',
          field: 'c5',
          html: true,
        },
        {
          label: '26',
          field: 'c6',
          html: true,
        },
        {
          label: '27',
          field: 'c7',
          html: true,
        },
      ],
      rows: [
        {
          id: 1,
          hour: '9:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
        {
          id: 2,
          hour: '10:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
        {
          id: 3,
          hour: '11:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
        {
          id: 4,
          hour: '12:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
        {
          id: 5,
          hour: '13:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
        {
          id: 6,
          hour: '14:00',
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
          c7: '',
        },
      ],
    }
  },
}
</script>
