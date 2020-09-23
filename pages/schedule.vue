<template>
  <v-layout>
    <v-flex class="text-center">
      <div class="container">
        <FullCalendar />
      </div>
    </v-flex>
  </v-layout>
</template>
<!--
<template>
  <div class="">
    <FullCalendar />
  </div>
</template>
-->
<script>
import FullCalendar from '@/components/FullCalendar'
export default {
  components: {
    FullCalendar,
  },
}
</script>

