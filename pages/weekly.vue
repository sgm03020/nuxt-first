<!--
<template>
  <WeeklyBase />
</template>
-->
<template>
  <div class="container">
    <!-- <WeeklyBase /> -->
    <!-- <ItemForHour /> -->
    <WeeklyGoodTable />
    <!-- <WeeklyTest /> -->
  </div>
</template>

<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
import WeeklyGoodTable from '@/components/WeeklyGoodTable'
import WeeklyTest from '@/components/WeeklyTest'

export default {
  components: {
    WeeklyBase,
    ItemForHour,
    WeeklyGoodTable,
    WeeklyTest,    
  },
}
</script>

