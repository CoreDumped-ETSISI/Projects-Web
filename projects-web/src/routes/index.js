import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectsMainHub from '../components/ProjectsMainHub.vue'
import ProjectCreator from '../components/ProjectCreator.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import ProjectEditor from '../components/ProjectEditor.vue'

Vue.use(VueRouter)

export default new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'ProjectsMainHub',
            component: ProjectsMainHub,
        },
        {
            path: '/projectcreator',
            name: 'ProjectCreator',
            component: ProjectCreator,
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
        }
    ]
})