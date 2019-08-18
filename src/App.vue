<template>
  <div id="app">
    <div class="view">
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import 'presets';

html {
  box-sizing: border-box;
}

// Set box-sizing globally to handle padding and border widths
*,
*::before,
*::after {
  box-sizing: inherit;
}

html, body, #app {
  margin: 0;
  padding: 0;
  background-color: darken(desaturate(#D1D2F9, 35%), 5%);
  font-family: 'Roboto';
}


.view {
  min-height: calc(100vh - 45px);
  transition: clip-path 1.3s ease;
}

.row {
  display: flex;

  > .col {
    flex: 0 0 auto;
    min-width: 0;
    width: 50%;
    padding: 0 7%;
    padding-top: 80px;
  }
}

.content-col {
  flex: 0 0 auto;
  min-width: 0;
  //width: 60%;
  padding: 0 7%;
  padding-top: 80px;
}

</style>
