import { createRouter, createWebHistory } from "vue-router";
import CartManager from "@/components/CartManager.vue";
import Home from "@/components/Homepage.vue";
import Payment from "@/components/Payment.vue";
import UserAccountManger from "@/components/UserAccountManger.vue";
const history = createWebHistory()
const routes = [
    {
        path:'/',
        name:'Home',
        component:Home,
        props: true
    },

    {
        path:'/cart',
        name:'Cart',
        component:CartManager,
        props: true
    },
    {
        path:'/cart/payment',
        name:'Payment',
        component:Payment,
        props: true
    },
    {
        path:'/register/login',
        name:'Login',
        component:UserAccountManger,
        props: true
    },
]

const router = createRouter({history,routes})
export default router