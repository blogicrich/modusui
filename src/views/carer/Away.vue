<template>
  <base-calendar></base-calendar>
</template>

<script>
import BaseCalendarComponent from '../../components/base/BaseCalendarComponent.vue'

export default {
  /* eslint-disable */
  components: {
    "base-calendar": BaseCalendarComponent
  },
  data: () => ({
    
  })
};
</script>

<style lang="scss">
@import "./public/scss/main.scss";

.calendarTitle {
  margin-left: 7.5px;
  margin-top: 5px;
}
.drinkAmount {
  text-align: end;
  margin-top: 38px;
  margin-right: 7.5px;
}
</style>
