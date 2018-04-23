import Home from './components/home/Home.vue';
import Register from './components/register/Register.vue';

export const routes = [

    { path: '', name: "home", component: Home, title: 'Home' },
    { path: '/register', name:"add", component: Register, title: 'Register' },
    { path: '/register/:id', name:'update', component: Register, title: 'Register'},
    { path: '*', component: Home }

];