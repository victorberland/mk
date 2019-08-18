<template>
  <div id="app">
    <div class="view" :class="{
      // 'view-front': $route.name === 'frontpage',
      // 'view-share-full': shareFull
      }"
    >
      <!--<router-view @content-ready="isLoaded = true"></router-view>-->
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    isLoaded: false,
    shareFull: false
  }),
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
  //background-color: black;
}


.view {
  min-height: calc(100vh - 45px);
  transition: clip-path 1.3s ease;
  // .title {
  //   @include serif;
  //   font-size: 4vw;
  //   font-weight: 600;
  //   color: $red;
  //   margin-top: 100px;
  //   padding-bottom: 80px;
  // }
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

// .title {
//   @include serif;
//   font-size: 4vw;
//   color: $red;
// }

// .fade-enter-active, .fade-leave-active {
//   transition: 0.5s ease-in-out;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   width: 5%;
// }
</style>
