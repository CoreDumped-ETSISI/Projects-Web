<template>
    <b-container>
        <b-list-group id="ProjectList">
        </b-list-group>
    </b-container>
</template>

<script>
import ProjectDisplay from '@/components/ProjectDisplay.vue'
import Vue from 'vue'

export default {
    name: 'ProjectList',
    data() {
        return {
            numProjects: 5,
        }
    },
    components: {

    },
    methods: {
        createListElem() {
            var listNode = document.getElementById('ProjectList');
            for(var i=0; this.numProjects>i; i++){
                var liGNode = document.createElement("div");
                liGNode.setAttribute("class", "list-group-item");
                liGNode.setAttribute("ref", "listGroupItem");
                
                var ComponentClass = Vue.extend(ProjectDisplay)
                var instance = new ComponentClass();

                instance.$mount() // pass nothing
                liGNode.appendChild(instance.$el)

                listNode.appendChild(liGNode);
            }
        },  
    },
    mounted() {
        this.createListElem();
    },
}
</script>

<style scoped>

</style>