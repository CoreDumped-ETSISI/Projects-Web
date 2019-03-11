<template>
  <b-container>
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
        <h3>Descripción del proyecto</h3>
        <b-form-textarea
            id="textarea1"
            v-model="textDescription"
            placeholder="Introduce una descripción"
            rows="6"
            max-rows="12"
                />
        
        <h3 class="objectiveTitle">Objetivos a cumplir</h3>
        <p>Sepera los objetivos por comas y sin espacios</p>
        <b-form-textarea
            id="textarea2"
            v-model="objectives"
            placeholder="Introduce los objetivos del proyecto"
            rows="6"
            max-rows="12"
                />

        <b-button class="completeFormButton" type="submit">Aceptar</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProjecCreatorForm",
  data() {
    return {
        form: {
          name: '',
          description: '',
          users: [],
          objectives: [],
          progress: 0,
          completed: false,
        },
        textName: '',
        textDescription: '',
        objectives: '',
        objectiveNum: 0,
    };
  },
  components: {

  },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        
        this.form.name = this.textName;
        this.form.description = this. textDescription;

        
      },
    }
};
</script>

<style scoped>
.completeFormButton {
    background-color: #0D860F;
    margin-top: 2%;
}
.objectiveTitle {
    margin-top: 2%;
}
</style>