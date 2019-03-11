<template>
    <b-container>
        <ProjectCreatorForm/>
    </b-container>
</template>

<script>
import ProjectCreatorForm from '@/components/ProjectCreatorForm.vue'

export default {
  name: 'ProjectCreator',
  props: {
    
  },
  components: {
    ProjectCreatorForm,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>