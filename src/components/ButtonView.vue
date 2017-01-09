<template>
  <div class = "row-flex flex-wrap">
    <button class="event-button" v-for="button in buttonArray" @click="button.events">{{ button.text }}</button>
  </div>
</template>

<script>
export default {
  name: 'button-view',

  props: ['buttonArray']
}
</script>

<style>
.flex-wrap {
  flex-wrap: wrap;
}

.event-button {
  flex-basis: auto;
  width: 25%;
  height: 50%;
}
</style>
