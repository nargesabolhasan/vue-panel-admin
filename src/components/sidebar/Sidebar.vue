<template>
  <div class="sidebar-layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li v-for="item in menu" :key="item.route" class="nav-item">
            <router-link :to="item.route" class="nav-link" active-class="active">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts" setup>
interface MenuItem {
  title: string
  route: string
}

const props = defineProps<{
  menu: MenuItem[]
}>()
</script>

<style scoped lang="scss">
.sidebar-layout {
  width: 250px;
  background-color: #2d3748;
  color: white;
  height: 100vh;
  padding: 1rem;

  .nav-item {
    margin-bottom: 1rem;

    .nav-link {
      display: block;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      color: white;
      text-decoration: none;
      transition: background 0.3s;

      &:hover {
        background-color: #4a5568;
      }

      &.active {
        background-color: #4a5568;
      }
    }
  }
}
</style>
