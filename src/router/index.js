import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Homepage.vue";
import Payment from "@/components/Payment.vue";
import CartManagement from "@/components/CartManagement.vue";
import Register from "@/components/AccountRegister.vue";
import Profile from "@/components/AccountProfile.vue";
import ProductDetails from "@/components/productDetails.vue";
import AdminPage from "@/components/AdminPage.vue";
const history = createWebHistory()
const routes = [
    {
        path:'/',
        name:'Register',
        component: Register,
        props: true
    },
    {
        path:'/Home',
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
    {
        path: '/products/:id',
        name: 'Products',
        component: ProductDetails
    },
    {
        path:'/profile/:userId',
        name:'Profile',
        component: Profile,
        props: true
    },

    {
        path:'/admin',
        name:'admin',
        component: AdminPage ,
        props: true
    },

]

const router = createRouter({history,routes})
export default router