<template>
  <div class = "row-flex flex-wrap">
    <button class="event-button" v-for="button in buttonArray" @click="handleEvents(button, buttonArray)">{{ button.text }}</button>
    <button class="event-button" v-if="buttonArray._parent" @click="traverseUp(buttonArray._parent)">Back</button>
  </div>
</template>

<script>
export default {
  name: 'button-view',

  props: ['buttonArray', 'inCombat'],

  methods: {
    handleEvents (button) {
      if (button.events) {
        if (this.inCombat) {
          this.$emit('clearAddtParas')
        }
        button.events()
        if (this.inCombat) {
          this.$emit('enemyTurn')
        }
      }
      if (button.children) {
        this.$emit('replaceButtons', button.children, this.buttonArray)
      }
    },

    traverseUp (parentButtons) {
      this.$emit('replaceButtons', parentButtons)
    }
  }
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
  background-color: var(--primary2);
  border: 1px solid var(--primary1);
  font-family: 'Inconsolata', monospace;
  color: var(--lightest);
}
</style>
