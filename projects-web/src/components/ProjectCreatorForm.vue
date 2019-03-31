<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <b-button v-on:click="backHome" class="BackBtn">Back</b-button>
      </b-col>
    </b-row>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="ProjectNameInput">
          <h3>Nombre del Proyecto</h3>
          <b-form-input
            v-model="textName"
            required
            placeholder="Introduce un nombre"
            autocomplete="off"
          />
        </b-form-group>
        <b-row>
          <b-col cols="12">
            <p v-if="errorInResponse" class="errorMessage">{{error}}</p>
          </b-col>
        </b-row>
        <h3>Descripción del proyecto</h3>
        <b-form-textarea
          id="textarea1"
          v-model="textDescription"
          required
          placeholder="Introduce una descripción"
          rows="6"
          max-rows="12"
        />

        <h3 class="objectiveTitle">Objetivos a cumplir</h3>
        <p>Sepera los objetivos por comas y sin espacios donde las comas</p>
        <b-form-textarea
          id="textarea2"
          v-model="objectives"
          required
          placeholder="Introduce los objetivos del proyecto"
          rows="6"
          max-rows="12"
        />

        <h3 class="objectiveTitle">Url de la documentación</h3>
        <b-form-input v-model="textDoc" placeholder="Introduce la url" autocomplete="off"/>

        <h3 class="objectiveTitle">Repositorio en el que estará el proyecto</h3>
        <b-form-input
          v-model="textRepo"
          placeholder="Introduce el repositorio en el que el proyecto estará alojado"
          autocomplete="off"
        />

        <b-button class="completeFormButton" type="submit">Aceptar</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import router from "../routes/index.js";

export default {
  name: "ProjecCreatorForm",
  data() {
    return {
      //Variables que se enviarán a la api por una llamada POST
      form: {
        name: "",
        description: "",
        users: [],
        objectives: [],
        progress: 0,
        completed: false,
        projectOwner: "",
        repository: "",
        documentationUrl: "",
        tagList: []
      },
      //Variables que introduce el usuario en el form de la página
      textName: "",
      textDescription: "",
      objectives: "",
      textDoc: "",
      textRepo: "",
      errorInResponse: false,
      error: '',
    };
  },
  components: {},
  methods: {
    //Función que rellena el form de la información introducida por el usuario y hace la petición POST
    onSubmit(evt) {
      evt.preventDefault();

      this.form.name = this.textName;
      this.form.description = this.textDescription;
      this.form.repository = this.textRepo;
      this.form.documentationUrl = this.textDoc;

      var objectiveArray = [];
      var jsonObjectiveArray = [];
      objectiveArray = this.objectives.split(",");

      objectiveArray.forEach(element => {
        var json = {
          name: element,
          completed: false
        };

        jsonObjectiveArray.push(json);
      });

      this.form.projectOwner = "EPICIDAD";
      this.form.objectives = jsonObjectiveArray;

      axios
        .post("http://localhost:3000/project", this.form)
        .then(response => {
          const name = this.textName;
          router.push({ name: 'ProjectInfo', params: { name } })
        })
        .catch(error => {
          this.errorInResponse = true;
          this.error = error.response.data.message;
        });
    },
    //Función que lleva de vuelta a la página principal
    backHome() {
      router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.completeFormButton {
  background-color: #0d860f;
  margin-top: 2%;
}
.objectiveTitle {
  margin-top: 2%;
}
.BackBtn {
  float: left;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #0d860f;
}
.errorMessage {
  margin-top: 2%;
  margin-bottom: 2%;
  color: red;
}
</style>