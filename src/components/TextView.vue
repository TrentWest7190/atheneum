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

  props: ['textArray', 'hasMoreParagraphs'],

  updated () {
    if (this.hasMoreParagraphs) {
      this.$el.scrollTop = this.$el.scrollHeight
    }
  }
}
</script>

<style>
p {
  margin-top: 0px;
  text-indent: 2.0em;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 20px;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}
</style>
