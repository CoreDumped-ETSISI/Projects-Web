<template>
    <div>
        <b-jumbotron class="ProjectDisplayJumbotron">            
            <b-container class="ProjectDisplayContainer">
                <b-row class="FirstR">
                    <b-col cols="6">
                        <a class="ProjectDisplayTitleRef" href=""><h3 id="ProjectDisplayTitle" class="ProjectDisplayTitle">{{project.name}}</h3></a>
                    </b-col>
                    <b-col></b-col>
                    <b-col>
                        <h3 class="ProjectDisplayDParticipantText">Participantes: {{project.users.length}}</h3>
                    </b-col>
                </b-row>
                <b-row class="SecR">
                    <b-col cols="8">
                        <b-textarea
                            class="textarea1"
                            rows="8"
                            plaintext :value="project.description"
                        />
                    </b-col>
                    <b-col cols="4">
                        <font-awesome-icon class="ProjectDisplayDeleteIcon" icon="trash"/>
                        <h3 class="ProjectDisplayDeleteText">DELETE</h3>
                    </b-col>
                </b-row>
                <b-row  class="ThirdR">
                    <b-col>
                        <b-progress class="mt-2" :max="max" show-value>
                            <b-progress-bar :value="project.progress" class="ProjectDisplayProgressBar"/>
                        </b-progress>
                    </b-col>
                </b-row>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: 'ProjectDisplay',
    data() {
      return {
        max: 100,
      }
    },
    props: {
        project: {
            type: Object,
        }
    },
        
    methods: {

    },
    beforeMount() {
         
    },
    mounted() {
        
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
}
.textarea1 {
    background-color: #F2F2F2;
}
.ProjectDisplayDeleteIcon {
    position: relative;
    margin-top: 48px;
    width: 30% !important;
    height: 30% !important;
    color: #0D860F;
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
</style>