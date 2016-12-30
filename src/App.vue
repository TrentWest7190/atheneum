<template>
  <div id="app-container" class="full-height row-flex">
    <div class="bordered-box full-height col-md-3">hey bro</div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view class="bordered-box col-md-8" :textArray="testArray"></text-view>
    </div>
    <div class="bordered-box full-height col-md-3">hey bro</div>
  </div>
</template>

<script>
import TextView from './components/TextView'
import TextEngine from './engine/TextEngine'

console.log(TextEngine('loesjfo sjeff jis jfsd fisjdfjisdfijsjdif sfidjsidfjsidfj sidfj sdfijsdi fsdfjsidfj sidfjsi df'))

export default {
  name: 'app',
  components: {
    TextView
  },

  data () {
    return {
      testArray: [
        [
          {
            content: 'hey',
            style: 'bold'
          }
        ]
      ]
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Space+Mono);
body, html {
  height: 100vh;
  margin: 0px;
  font-family: 'Space Mono';
}

#app-container {
  box-sizing: border-box;
  padding: 50px;
}

.row-flex {
  flex-direction: row;
  display: flex;
}

.col-flex {
  flex-direction: column;
  display: flex;
}

.col-md-8 {
  flex-basis: 64.66%;
}

.col-md-7 {
  flex-basis: 58.33%;
}

.col-md-6 {
  flex-basis: 50%;
}

.col-md-3 {
  flex-basis: 25%;
}

.bordered-box {
  border: 1px solid red;
  box-sizing: border-box;
}

.full-height {
  height: 100%;
}
</style>
