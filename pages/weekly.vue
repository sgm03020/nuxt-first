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
    <WeeklyRawTable />
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
}
</script>

