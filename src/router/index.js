import Vue from "vue";
import Router from "vue-router";
import ShoppingMall from "@/components/pages/ShoppingMall";
import Register from "@/components/pages/Register";
import Login from "@/components/pages/Login";
import Goods from "@/components/pages/Goods";
import CategoryList from "@/components/pages/CategoryList";
import Cart from "@/components/pages/Cart";
import Homepage from "@/components/pages/Homepage";
import Member from "@/components/pages/Member";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Homepage,
      children: [
        { path: "/", name: "ShoppingMall", component: ShoppingMall },
        {
          path: "/CategoryList",
          name: "CategoryList",
          component: CategoryList
        },
        { path: "/Cart", name: "Cart", component: Cart },
        { path: "/Member", name: "Member", component: Member }
      ]
    },
    { path: "/register", name: "Register", component: Register },
    { path: "/login", name: "Login", component: Login },
    { path: "/goods", name: "Goods", component: Goods }
  ]
});
