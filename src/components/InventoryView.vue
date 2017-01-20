<template>
  <div>
    <ul>
      <li v-for="item in Player.Inventory" v-if="item.amount > 0">{{ item.text }} x {{ item.amount }}</li>
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
