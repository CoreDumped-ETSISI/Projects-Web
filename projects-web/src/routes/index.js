import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectList from '../components/ProjectList.vue'
import ProjectCreatorForm from '../components/ProjectCreatorForm.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import ProjectEditor from '../components/ProjectEditor.vue'
import FinishedProjectList from '../components/FinishedProjectList.vue'

Vue.use(VueRouter)

export default new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'ProjectsMainHub',
            component: ProjectList,
        },
        {
            path: '/projectcreator',
            name: 'ProjectCreatorForm',
            component: ProjectCreatorForm,
        },
        {
            path: '/projectinfo/:name',
            name: 'ProjectInfo',
            component: ProjectInfo,
        },
        {
            path: '/projecteditor/:name',
            name: 'ProjectEditor',
            component: ProjectEditor,
        },
        {
            path: '/finishedprojects',
            name: 'FinishedProjectList',
            component: FinishedProjectList,
        }
    ]
})