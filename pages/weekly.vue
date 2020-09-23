<!--
<template>
  <WeeklyBase />
</template>
-->
<template>
  <div class="container">
    <WeeklyBase />
    <ItemForHour />
  </div>
</template>

<script>
import WeeklyBase from '@/components/WeeklyBase'
import ItemForHour from '@/components/ItemForHour'
export default {
  components: {
    WeeklyBase,
    ItemForHour,
  },
}
</script>

