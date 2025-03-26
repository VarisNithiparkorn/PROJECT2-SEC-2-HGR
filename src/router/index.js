import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Homepage.vue";
import Payment from "@/components/Payment.vue";
import CartManagement from "@/components/CartManagement.vue";
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
        component:CartManagement,
        props: true
    },
    {
        path:'/cart/payment',
        name:'Payment',
        component:Payment,
        props: true
    },
    
]

const router = createRouter({history,routes})
export default router