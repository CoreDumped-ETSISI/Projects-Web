<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h1 class="PageTitle">PROYECTOS TERMINADOS</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="7">
                <div>
                    <b-form-input class="searchText" v-model="searchText" placeholder="Busca un proyecto" v-on:input="searchProjs"></b-form-input> 
                </div>
            </b-col>
            <b-col cols="5">
                <router-link :to="{ path: '/projectcreator'}"><b-button class="addProjectBtn">Crear Proyecto</b-button></router-link>
                <router-link :to="{ path: '/'}"><b-button class="addProjectBtn">Proyectos Activos</b-button></router-link>
            </b-col>
        </b-row>
        <div v-if="contentLoaded == true">
            <b-list-group id="ProjectList" v-for="elem in shownProjs" :key="elem._id">
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
    name: 'FinishedProjectList',
    data() {
        return {
            numProjects: 0,
            projs: [],
            shownProjs:[],
            contentLoaded: false,
            searchText: '',
        }
    },
    components: {
        ProjectDisplay,
    },
    methods: {
        /*Función que hace una llamada GET a la API, permite generar la lista de proyectos terminados 
        e introduce la información de los proyectos en las tarjetas de 'ProjectDisplay'*/
        createListElem() {
            this.projs = []; 
            this.shownProjs = [];
            projects = [];
            axios
            .get('http://localhost:3000/project')
            .then(response =>{
                response.data.forEach(element => {
                    if(element.completed)
                    projects.push(element);
                });  

                projectNum = projects.length;
                this.numProjects = projectNum;
                this.projs = projects;
                this.shownProjs = this.projs;
                this.contentLoaded = true;               
            });           
        },
        //Función que permite buscar proyectos sin tener en cuenta mayúsculas y minúsculas
        searchProjs() {
            this.shownProjs = [];
            var regex = new RegExp(this.searchText, "i");
            this.projs.forEach(elem => {
                if(elem.name.match(regex)){
                    this.shownProjs.push(elem);
                }
            });
        },
    },
    mounted() {       
        this.createListElem();
    },
}
</script>

<style scoped>
.searchText {
float: left;
}
.addProjectBtn {
    float: right;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    background-color: #0D860F;
}
.PageTitle {
    font-weight: bold;
}
</style>