<template>
  <div>
    <ul>
      <li v-for="(item, itemName) in Player.State.inventory" v-if="item > 0">{{ Story.itemData[itemName].text }} x {{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'inventory-view',

  props: ['Story', 'Player']
}
</script>

<style>
</style>
