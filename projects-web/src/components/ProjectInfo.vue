<template>
    <b-container>
        <b-modal ref="deleteModal" hide-footer title="¿Quieres borrar el proyecto?">
            <b-button class="mt-3 modalBtn" block @click="deleteProject">Sí, por favor</b-button>
            <b-button class="mt-2 modalBtn" block @click="hideModal">No, gracias</b-button>
        </b-modal>
        <b-modal ref="finishModal" hide-footer title="¿Quieres terminar el proyecto?">
            <b-button class="mt-3 modalBtn" block @click="finishProject">Sí, por favor</b-button>
            <b-button class="mt-2 modalBtn" block @click="hideModal2">No, gracias</b-button>
        </b-modal>
        <b-row class="ZeroR">
            <b-col cols="6">               
                <b-button v-on:click="backHome" class="BackBtn">Back</b-button>               
            </b-col>
            <b-col cols="6">
                <b-dropdown id="ddown1" text="Opciones" class="m-md-2 dropdownOptions">
                    <b-dropdown-item @click="toEditor">Editar</b-dropdown-item>
                    <b-dropdown-item @click="showModal" style="color: red">Eliminar</b-dropdown-item>
                    <b-dropdown-item v-if="!project.completed" @click="showModal2" style="color: green">Terminar</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <b-row>
        <b-col cols="12" col md="6">
            <b-row class="FirstR">
                <b-col cols="4">
                    <b-img rounded alt="Rounded image" class="ProjectImage"/>
                </b-col>
                <b-col cols="8">
                    <div class="TitleText">
                        <h4>{{project.name}}</h4>
                    </div>
                </b-col>    
            </b-row>
            <b-row class="SecR">
                <b-col cols="12">
                    <b-form-textarea class="descriptionText" id="textarea-plaintext" plaintext :value="project.description" rows="10" disabled/>
                </b-col>
            </b-row>
            <b-col cols="12" class="progressBar">
                <b-progress class="mt-2" :max="max" show-value>
                    <b-progress-bar :value="progress" class="ProjectDisplayProgressBar"/>
                </b-progress>
            </b-col>   
            <b-row  class="ThirdR">                  
                <b-col cols="12">
                    <b-list-group v-if="contentLoaded == true">
                        <b-list-group-item v-for="elem in objectives" :key="elem.name" class="objectiveList" >                                           
                            <b-form-checkbox
                            disabled
                            class="objectiveCheckbox"
                            v-model="elem.completed"
                            >
                            {{elem.name}}
                            </b-form-checkbox>             
                        </b-list-group-item>
                    </b-list-group>               
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" col md="6">
            <b-row class="ForthR">
                <b-col cols="12">
                    <b-list-group class="participantList">
                        <b-list-group-item
                        v-for="elem in participants" :key="elem.name"
                        class="participantsListItem"
                        >
                        <span>{{elem.name}}</span><span v-if="elem.admin" class="adminElem"> (ADMIN)</span><br>                       
                        <span>{{elem.email}}</span>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
            <b-row class="FifthR">
                <b-col cols="12">
                    <b-list-group>
                        <b-list-group-item>
                            <span class="finalTexts">Documentation URL: {{project.documentationUrl}}</span>
                        </b-list-group-item>
                        <b-list-group-item>
                            <span class="finalTexts">Repository: {{project.repository}}</span>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-button class="SaveBtn">Unirse</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
import router from '../routes/index.js'

//Variables globales para generar la lista de objetivos
var objNum = 0;
var completedObjs = 0;
 
export default {
    name: 'ProjectInfo',
    data() {
        return {
            //La información del proyecto
            project: {
                type: Object,
            },
            objectives: [],
            participants: [],
            completed: false,
            contentLoaded: false,
            max: 100,
            progress: 0,
        }
    },
    components: {
    
    },
    methods: {
        //Función que introduce los objetivos en la lista de objetivos generada en el HTML y lo mismo con la lista de participantes
        createObjectiveElem() {  
            axios
            .get('http://localhost:3000/projectname/'+this.$route.params.name)
            .then(response =>{
                this.project = response.data;
                this.objectives = response.data.objectives;
                this.participants = response.data.users;
                this.completed = response.data.completed;
                this.calculateProgress();
                this.contentLoaded = true;               
            });             
        },
        changeObjectives() {

        },  
        //Función que lleva de vuelta a la página principal
        backHome() {
            router.push({ path: '/' });
            
        },
        //Función que te lleva al editor de proyectos
        toEditor() {
            const name = this.project.name;
            router.push({ name: 'ProjectEditor', params: { name } });
        },
        //Las tres funciones siguientes son los pasos a seguir para eliminar un proyecto con la llamada DELETE a la API
        showModal() {
        this.$refs.deleteModal.show()
        },
        hideModal() {
        this.$refs.deleteModal.hide()
        }, 
        deleteProject() {
            axios.delete('http://localhost:3000/project/'+this.$route.params.name)
            .then(response =>{
                this.hideModal();
                this.backHome();
            })
            
        },
        //Función que calcula según los objetivos cumplidos el progreso que lleva el proyecto
        calculateProgress() {
            completedObjs = 0;

            objNum = this.objectives.length;
            this.objectives.forEach(element => {
                if(element.completed == true){
                    completedObjs++;
                }
            });

            if(objNum > 0){
                this.progress = (completedObjs * this.max)/objNum;
            }else{
                this.progress = 0;
            }  
        },
        //Las tres funciones siguientes son los pasos a seguir para terminar un proyecto con la llamada PUT a la API
        showModal2() {
        this.$refs.finishModal.show()
        },
        hideModal2() {
        this.$refs.finishModal.hide()
        }, 
        finishProject() {
            this.completed = true;
            var form = {
                name: this.project.name,
                completed: this.completed,
            }

            axios
            .put('http://localhost:3000/projectupdate', form, {
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    }
            })
            .then(response =>{  
                this.hideModal();
                router.push({ path: '/finishedprojects'});
                
            })
        },
    },
    mounted() {  
        this.createObjectiveElem();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ZeroR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.FirstR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.SecR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.ThirdR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.ForthR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.FifthR {
    margin-top: 2%;
    margin-bottom: 2%;
}
.ProjectImage {
    
}
.BackBtn {
    float: left;
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: #0D860F;
}
.TitleText {
    word-wrap: break-word;
}
.dropdownOptions {
    float: right;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #0D860F;
}
.objectiveCheckbox {
    float: left;
    margin-right: 8px;
}
.SaveBtn {
    float: right;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    background-color: #0D860F;
}
.objectiveList {

}
.participantsListItem {
    text-align: left;
}
.adminElem {
    font-weight: bold;
}
.finalTexts {
    float: left;
}
.ProjectDisplayProgressBar {
    background-color: #0D860F;
    float: left;
}
.modalBtn {
    background-color: #0D860F;
}
.descriptionText {
    border: 0;
    
}
.progressBar {
    padding: 0%;
}
</style>