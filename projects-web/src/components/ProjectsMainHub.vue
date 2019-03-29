<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <router-link :to="{ path: '/projectcreator'}"><b-button class="addProjectBtn">Crear Proyecto</b-button></router-link>
      </b-col>
    </b-row>
    <b-row>
      <ProjectList/>
    </b-row>
  </b-container>
</template>

<script>
import ProjectList from "@/components/ProjectList.vue";
export default {
  name: "ProjectsMainHub",
  props: {
    msg: String
  },
  components: {
    ProjectList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addProjectBtn {
    float: right;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    background-color: #0D860F;
}
</style>
