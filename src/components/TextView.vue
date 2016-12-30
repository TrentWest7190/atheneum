<template>
  <div>
    <p v-for="paragraph in textArray">
      <span v-for="word in paragraph" :class="word.style">{{ word.content }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'text-view',

  props: ['textArray']
}
</script>

<style>
p {
  margin-top: 0px;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}
</style>
