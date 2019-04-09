<template>
  <div id="app">
    <div class="container">
      <vue-crop
        @changed="changeHandler"
        @beforeChange="beforeChangeHandler"
        :init-rect="{x1: 10, x2: 110, y1: 10, y2: 60}"
        :allowStartNewCrop="true"
        :aspectRatio="2"
        :max-width="500"
        :max-height="500"
      >
      </vue-crop>
    </div>
  </div>
</template>

<script>

export default {

  name: 'App',

  components: {
  },

  data () {
    return {
    }
  },
  methods: {
    changeHandler (e) {
      console.log(e);
    },

    beforeChangeHandler (e) {
      console.log(e);
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
.container {
  width: 800px;
  height: 450px;
  background-color: darkgreen;
}
</style>
