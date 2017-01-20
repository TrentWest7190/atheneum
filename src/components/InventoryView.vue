<template>
  <div>
    <ul>
      <li v-for="(item, itemName) in Player.Inventory" v-if="item > 0">{{ itemName }} x {{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'inventory-view',

  props: ['Player']
}
</script>

<style>
</style>
