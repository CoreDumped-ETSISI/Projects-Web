<template>
    <div>
        <b-jumbotron class="ProjectDisplayJumbotron">            
            <b-container class="ProjectDisplayContainer">
                <b-row class="FirstR">
                    <b-col cols="6">
                        <h3 class="ProjectDisplayTitle">{{title}}</h3>
                    </b-col>
                    <b-col></b-col>
                    <b-col>
                        <h3>{{participants}}</h3>
                    </b-col>
                </b-row>
                <b-row  class="SecR">
                    <b-col cols="8">
                        <b-textarea
                            class="textarea1"
                            rows="8"
                            plaintext :value="description"
                        />
                    </b-col>
                    <b-col cols="4">
                        <font-awesome-icon class="ProjectDisplayDeleteIcon" icon="trash"/>
                    </b-col>
                </b-row>
                <b-row  class="ThirdR">
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
export default {
    name: 'ProjectDisplay',
    data() {
      return {
        progress: 45,
        description: 'EPICIDAD3EPICIDAD3EPPICIDD3EPICIDAIDAD3EPICIDAD3EPICIDAD3EPICIDAD3',
        title: 'Epicidad',
        participants: '5',
        max: 100,
      }
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
    text-align: center;
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
    top: 40%;
    width: 20% !important;
    height: 20% !important;
    color: #0D860F;
}
.ProjectDisplayProgressBar {
    background-color: #0D860F;
}
</style>