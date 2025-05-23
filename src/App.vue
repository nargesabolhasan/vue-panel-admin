<template>
  <div id="app">
    <nav class="navbar">
      <RouterLink to="/login">Login</RouterLink> |
      <RouterLink to="/sign-in">Sign In</RouterLink> |
      <RouterLink to="/dashboard">Dashboard</RouterLink> |
      <RouterLink to="/add-article">Add Article</RouterLink>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
// Nothing needed here for now
</script>

<style scoped lang="scss">
#app {
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  color: #333;
  padding: 1rem;
}

.navbar {
  margin-bottom: 2rem;
  a {
    margin: 0 1rem;
    text-decoration: none;
    color: #4f46e5;

    &:hover {
      text-decoration: underline;
      color: #3730a3;
    }
  }
}

.main-content {
  min-height: 60vh;
}
</style>
