<template>
  <div id="app">
    <nav>
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/quiz">
        Quiz
      </router-link> |
      <router-link to="/edit">
        Edit
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #080825;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #080825;

    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
