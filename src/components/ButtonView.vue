<template>
  <div class = "row-flex flex-wrap">
    <button class="event-button" v-for="button in buttonArray" @click="$emit('doEvent', button.events)">{{ button.text }}</button>
  </div>
</template>

<script>
export default {
  name: 'button-view',

  props: ['buttonArray'],

  methods: {
  }
}
</script>

<style>
.flex-wrap {
  flex-wrap: wrap;
  padding: 10px;
}

.event-button {
  flex-basis: auto;
  width: 25%;
  height: 50%;
  background-color: var(--primary2);
  border: 1px solid var(--primary1);
  font-family: 'Inconsolata', monospace;
  color: var(--lightest);
  border-radius: 5px;
  font-size: 20px;
}
</style>
