<!--
<template>
  <WeeklyBase />
</template>
-->
<template>
  <div class="container">
    <!-- <WeeklyBase /> -->
    <!-- <ItemForHour /> -->
    <!-- <WeeklyTable /> -->
    <WeeklyTest />
  </div>
</template>

<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
import WeeklyTable from '@/components/WeeklyTable'
import WeeklyTest from '@/components/WeeklyTest'

export default {
  components: {
    WeeklyBase,
    ItemForHour,
    WeeklyTable,
    WeeklyTest,    
  },
}
</script>

