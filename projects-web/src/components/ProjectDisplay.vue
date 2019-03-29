<template>
    <div>
        <b-jumbotron class="ProjectDisplayJumbotron">            
            <b-container class="ProjectDisplayContainer">
                <b-row class="FirstR" v-on:click="toProject">
                    <b-col cols="6">
                        <h3 id="ProjectDisplayTitle" class="ProjectDisplayTitle">{{project.name}}</h3>
                    </b-col>
                    <b-col>
                        <h3 class="ProjectDisplayDParticipantText">Participantes: {{project.users.length}}</h3>
                    </b-col>
                </b-row>
                <b-row class="SecR">
                    <b-col cols="8" v-on:click="toProject">
                        <b-textarea
                            class="textarea1"
                            rows="8"
                            plaintext :value="project.description"
                            disabled
                        />
                    </b-col>
                    <b-col cols="4">
                        <font-awesome-icon v-on:click="showModal" class="ProjectDisplayDeleteIcon" icon="trash"/>
                        <h3 class="ProjectDisplayDeleteText">DELETE</h3>
                        <b-modal ref="deleteModal" hide-footer title="¿Quieres borrar el proyecto?">
                            <b-button class="mt-3 modalBtn" block @click="deleteProject">Sí, por favor</b-button>
                            <b-button class="mt-2 modalBtn" block @click="hideModal">No, gracias</b-button>
                        </b-modal>
                    </b-col>
                </b-row>
                <b-row  class="ThirdR" v-on:click="toProject">
                    <b-col>
                        <b-progress class="mt-2" :max="max" show-value>
                            <b-progress-bar :value="progress" class="ProjectDisplayProgressBar"/>
                        </b-progress>
                    </b-col>
                </b-row>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../routes/index.js'

var objNum = 0;
var completedObjs = 0;

export default {
    name: 'ProjectDisplay',
    data() {
      return {
        max: 100,
        progress: 0,
      }
    },
    props: {
        project: {
            type: Object,
        },
    },
        
    methods: {
        showModal() {
        this.$refs.deleteModal.show()
        },
        hideModal() {
        this.$refs.deleteModal.hide()
        }, 
        deleteProject() {
            axios.delete('http://localhost:3000/project/'+this.project.name);
            this.hideModal();
            location.reload();
        },
        calculateProgress() {
            completedObjs = 0;

            objNum = this.project.objectives.length;
            this.project.objectives.forEach(element => {
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
        toProject() {
            const name = this.project.name;
            router.push({ name: 'ProjectInfo', params: { name } });
        },
    },
    beforeMount() {
         
    },
    mounted() {
        this.calculateProgress();
    }
}
</script>

<style scoped>
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
.ProjectDisplayContainer {

}
.ProjectDisplayTitle {
    text-align: left;
    cursor: pointer;
    font-weight: bold;
    color: black;
    margin: 0;
}
.ProjectDisplayJumbotron {
    background-color: #F2F2F2;
    padding-top: 16px;
    padding-bottom: 16px;
    cursor: pointer;
}
.textarea1 {
    background-color: #F2F2F2;
    cursor: pointer;
    border: 0;
}
.ProjectDisplayDeleteIcon {
    position: relative;
    margin-top: 48px;
    width: 30% !important;
    height: 30% !important;
    color: #0D860F;
    cursor: pointer;
}
.ProjectDisplayDeleteText {
    font-size: medium;
    text-align: center;
    font-weight: bold;
}
.ProjectDisplayProgressBar {
    background-color: #0D860F;
}
.ProjectDisplayDParticipantText {
    text-align: left;
    font-size: 150%;
}
.ProjectDisplayTitleTooltip {
    align-self: left;
}
.ProjectDisplayTitleRef {
    text-decoration: none !important
}
.modalBtn {
    background-color: #0D860F;
}
</style>