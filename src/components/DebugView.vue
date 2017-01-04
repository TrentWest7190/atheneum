<template>
  <div class="col-flex">
    <h2>Flags</h2>
    <div v-for="(flag, flagName) in Player.State.flags">
      <p>
        {{ flagName }}
        <input v-if="typeof flag === 'string'" :value="flag"  @blur="updatePlayer('setFlag', flagName, $event.target.value)">
        <input v-if="typeof flag === 'boolean'" type="checkbox" :checked="flag" @click="updatePlayer('setFlag', flagName, $event.target.checked)">
        <input v-if="typeof flag === 'number'" type="number" :value="flag" @blur="updatePlayer('setFlag', flagName, $event.target.value, true)">
      </p>
    </div>
    <h2>Inventory</h2>
    <div v-for="(item, itemName) in Player.State.inventory">
      <p>
        {{ itemName }}
        <input type="number" :value="item" @blur="updatePlayer('getItem', itemName, $event.target.value, true)">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'debug-view',

  props: ['Player'],

  methods: {
    updatePlayer (functionName, flagName, flagValue, isNumber) {
      this.Player.Functions[functionName](flagName, isNumber ? parseInt(flagValue) : flagValue)
    }
  }
}
</script>

<style>
</style>
