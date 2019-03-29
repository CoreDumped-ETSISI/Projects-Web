<template>
    <b-container>
        <div v-if="contentLoaded == true">
            <b-list-group id="ProjectList" v-for="elem in projs" :key="elem._id">
                <ProjectDisplay :project="elem"/>
            </b-list-group>
        </div>
    </b-container>
</template>

<script>
import ProjectDisplay from '@/components/ProjectDisplay.vue'
import axios from 'axios'

var projects = []; 
var projectNum;

export default {
    name: 'ProjectList',
    data() {
        return {
            numProjects: 0,
            projs: [],
            contentLoaded: false,
        }
    },
    components: {
        ProjectDisplay,
    },
    methods: {
        createListElem() {
            this.projs = []; 
            projects = [];
            axios
            .get('http://localhost:3000/project')
            .then(response =>{
                response.data.forEach(element => {
                    projects.push(element);
                });  

                projectNum = projects.length;
                this.numProjects = projectNum;
                this.projs = projects;
                this.contentLoaded = true;               
            });           
        },
    },
    mounted() {       
        this.createListElem();
    },
}
</script>

<style scoped>

</style>