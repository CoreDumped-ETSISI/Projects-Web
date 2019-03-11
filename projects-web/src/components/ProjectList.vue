<template>
    <b-container>
        <div v-if="contentLoaded == true">
            <b-list-group id="ProjectList" v-for="elem in projs" :key="elem.id">
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
            numProjects: 5,
            projs: [],
            contentLoaded: false,
        }
    },
    components: {
        ProjectDisplay,
    },
    methods: {
        createListElem() {  
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
    beforeMount() {

    },
    mounted() {  
        this.createListElem();
    },
    created(){

    },
}
</script>

<style scoped>

</style>