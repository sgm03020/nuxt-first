<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'All-day event',
    start: '2020-09-24T10:00:00',
  },
  {
    id: 2,
    title: '3day event',
    start: '2020-09-25T10:00:00',
    end: '2020-09-27T17:00:00',
  },
]

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        locale: jaLocale,
        initialView: 'dayGridMonth',
        // initialEvents: INITIAL_EVENTS,
        // initialEvents: [{ id: 1, title: 'All-day event', start: new Date() }],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
    }
  },
  methods: {
    handleEvents(events) {},
    handleWeekendsToggle() {},
    handleDateSelect(selectInfo) {},
    handleEventClick(clickInfo) {},
  },
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
