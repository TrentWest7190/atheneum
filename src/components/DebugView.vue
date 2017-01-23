<template>
  <div class="col-flex">
    <h2>Screens</h2>
    <select v-model="selectedScreen" @change="$emit('debugMove', selectedScreen)">
      <option v-for="(screen, screenName) in debug.screenData" :value="screen">{{ screenName }}</option>
    </select>
    <h2>Flags</h2>
    <div class="row-flex debug-row" v-for="(flag, flagName) in Player.Flags">
      <span>{{ flagName }}</span>
      <input 
        class="debug-input" 
        v-if="typeof flag === 'string'" 
        :value="flag"  
        @blur="$emit('debug', {type: 'flags', name: flagName, value: $event.target.value})">
      <input 
        class="debug-input" 
        v-if="typeof flag === 'boolean'" 
        type="checkbox" 
        :checked="flag" 
        @click="$emit('debug', {type: 'flags', name: flagName, value: $event.target.checked})">
      <input 
        class="number-input" 
        v-if="typeof flag === 'number'" 
        type="number" 
        :value="flag" 
        @blur="$emit('debug', {type: 'flags', name: flagName, value: $event.target.value, isNumber: true})">
    </div>
    <h2>Inventory</h2>
    <div class="row-flex debug-row" v-for="(item, itemName) in Player.Inventory">
      <span>{{ itemName }}</span>
      <input class="debug-input" type="number" :value="item.amount" @blur="updatePlayer('inventory', itemName, $event.target.value, true)">
    </div>
    <h2>Stats</h2>
    <div class="row-flex debug-row" v-for="(stat, statName) in Player.Stats">
      <span>{{ statName }}</span>
      <span>{{ stat._value }}</span>
      <span>{{ stat.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'debug-view',

  props: ['Player', 'debug', 'CurrentLocation'],

  data () {
    return {
      selectedScreen: this.CurrentLocation
    }
  }
}
</script>

<style>
.number-input {
  width: 50px
}
.debug-input {
  width: 100px
}

.debug-row > * {
  flex-basis: 33%;
}
</style>
