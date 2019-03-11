<template>
  <div id="app">
    <ProjectCreator/>
  </div>
</template>

<script>
import ProjectsMainHub from './components/ProjectsMainHub.vue'
import ProjectCreator from './components/ProjectCreator.vue'

export default {
  name: 'app',
  components: {
    ProjectsMainHub,
    ProjectCreator,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
