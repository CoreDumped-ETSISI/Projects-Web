<template>
    <b-container>
        <b-modal ref="objectiveModal" hide-footer title="Añadir Objetivo">
            <b-form-input v-model="newObjective" placeholder="Introduce objetivo"></b-form-input>
            <b-button class="mt-2 greenBtn" block @click="addObjective">Añadir</b-button>
        </b-modal>
        <b-modal ref="objectiveModal2" hide-footer title="¿Quieres borrar el objetivo?">
            <b-button class="mt-3 greenBtn" block @click="deleteObjective">Sí, por favor</b-button>
            <b-button class="mt-2 greenBtn" block @click="hideModal2">No, gracias</b-button>
        </b-modal>
        <b-row class="ZeroR">
            <b-col cols="12">               
                <b-button @click="backToInfo" class="BackBtn">Back</b-button>             
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
                        <b-form-input v-model="newName" type="text"/>
                    </div>
                </b-col>    
            </b-row>
            <b-row class="SecR">
                <b-col cols="12">
                    <b-form-textarea id="textarea-plaintext" v-model="newDesc" rows="10"/>
                </b-col>
            </b-row>
            <b-row  class="ThirdR">
                <b-col cols="12">
                    <b-list-group v-if="contentLoaded == true">
                        <b-list-group-item v-for="elem in objectives" :key="elem.name" class="objectiveList" >                                           
                            <b-form-checkbox
                            class="objectiveCheckbox"
                            v-model="elem.completed"
                            >
                            {{elem.name}}
                            </b-form-checkbox>
                            <font-awesome-icon v-on:click="showModal2(objectives.indexOf(elem))" class="objectiveIcon" icon="trash"/>             
                        </b-list-group-item>
                    </b-list-group>   
                </b-col>
                <b-col cols="12">
                    <b-button v-if="!project.completed" class="addBtn" v-on:click="showModal">Añadir Objetivo</b-button>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" col md="6">
            <b-row class="ForthR">
                <b-col cols="12">
                    <b-list-group class="participantList">
                        <b-list-group-item
                        v-for="elem in newParticipants" :key="elem.name"
                        class="participantsListItem"
                        >
                        <span>{{elem.name}}</span><span v-if="elem.admin" class="adminElem"> (ADMIN)</span>
                        <b-dropdown size="sm" id="ddown2" text="Opciones" class="m-md-2 dropdownOptions">
                            <b-dropdown-item v-if="!elem.admin" v-on:click="elem.admin = true">Hacer Admin</b-dropdown-item>
                            <b-dropdown-item v-if="elem.admin" v-on:click="elem.admin = false">Quitar Admin</b-dropdown-item>
                            <b-dropdown-item style="color: red" v-on:click="deleteUser(elem);" >Eliminar</b-dropdown-item>
                        </b-dropdown><br>                       
                        <span>{{elem.email}}</span>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
            <b-row class="FifthR">
                <b-col cols="12">
                    <b-list-group>
                        <b-list-group-item>
                            <span>Url de documentación:</span>
                            <b-form-input class="finalTexts" v-model="newDocUrl" type="text"/>
                        </b-list-group-item>
                        <b-list-group-item>
                            <span>Repositorio:</span>
                            <b-form-input class="finalTexts" v-model="newRepo" type="text"/>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-button class="SaveBtn" v-on:click="updateProject">Guardar</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <p v-if="errorInResponse" class="errorMessage">{{error}}</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
import router from '../routes/index.js'
 
export default {
    name: 'ProjectEditor',
    data() {
        return {
            project: {
                type: Object,
            },
            //Información que se puede cambiar en el editor
            objectives: [],
            participants: [],
            contentLoaded: false,
            newName: '',
            newDesc: '',
            newObjectives: [],
            newObjective: '',
            deleteObjectivePos: 0,
            newParticipants: [],
            newDocUrl: '',
            newRepo: '',
            errorInResponse: false,
            error: '',
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
                this.contentLoaded = true;  
                
                this.newName = response.data.name;
                this.newDesc = response.data.description;
                this.newObjectives = response.data.objectives;
                this.newParticipants = response.data.users;
                this.newDocUrl = response.data.documentationUrl;
                this.newRepo = response.data.repository;
            });             
        },
        changeObjectives() {

        },  
        //Función que lleva de vuelta a la página de proyecto
        backToInfo() {
            const name = this.project.name;
            router.push({ name: 'ProjectInfo', params: { name } })
            
        },
        //Función que actualiza los cambios del proyecto con llamada PUT
        updateProject() {
            var form = {
                name: this.newName,
                previousName: this.project.name,
                description: this.newDesc,
                objectives: this.newObjectives,
                users: this.newParticipants,
                documentationUrl: this.newDocUrl,
                repository: this.newRepo,
            }

            axios
            .put('http://localhost:3000/projectupdate/'+this.$route.params.name, form, {
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    }
            })
            .then(response =>{  

                const name = this.newName;
                router.push({ name: 'ProjectInfo', params: { name } })
                
            })
            .catch(error => {
                this.errorInResponse = true;
                this.error = error.response.data.message;
            });    

        },
        //Función que elimina usuarios del proyecto
        deleteUser(elem) {
            var index = this.participants.indexOf(elem)
            this.participants.splice(index,1);
        },
        //Función que añade nuevos objetivos
        addObjective(){
            var newObj = {
                name: this.newObjective,
                completed: false,
            }

            this.newObjectives.push(newObj);

            var form = {
                name: this.newName,
                previousName: this.project.name,
                description: this.newDesc,
                objectives: this.newObjectives,
                users: this.newParticipants,
                documentationUrl: this.newDocUrl,
                repository: this.newRepo,
            }

            axios
            .put('http://localhost:3000/projectupdate/'+this.$route.params.name, form, {
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    }
            })
            .then(response =>{  
                this.hideModal();
            })
            .catch(error => {

            });
        },
        showModal() {
            this.$refs.objectiveModal.show()
        },
        showModal2(position) {
            this.deleteObjectivePos = position;
            this.$refs.objectiveModal2.show();
        },
        hideModal() {
            this.$refs.objectiveModal.hide();
        },
        hideModal2() {
            this.$refs.objectiveModal2.hide();
        }, 
        deleteObjective() {
            var position = this.deleteObjectivePos;
            this.newObjectives.splice(position,1);

            this.hideModal2();
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
.errorMessage {
    color: red;
    margin-top: 5%;
    margin-bottom: 5%;
}
.addBtn {
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: #0D860F;
}
.greenBtn {
    background-color: #0D860F;
}
.objectiveIcon {
    float: right;
    color: #0D860F;
    cursor: pointer;
}
</style>
