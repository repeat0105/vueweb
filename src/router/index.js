import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MultiplicationTable from "../views/MultiplicationTable.vue";
import LastWord from "../views/LastWord.vue";
import BaseBall from "../views/BaseBall.vue";
import ReactionSpeed from "../views/ReactionSpeed.vue";
import RockPaper from "../views/RockPaper.vue";
import LottoNums from "../views/LottoNums.vue";
import TicTacToe from "../views/TicTacToe.vue";
import MineSweeper from "../views/MineSweeper.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/multiplication",
    name: "multiplication",
    component: MultiplicationTable,
  },
  {
    path: "/lastword",
    name: "lastword",
    component: LastWord,
  },
  {
    path: "/baseball",
    name: "baseball",
    component: BaseBall,
  },
  {
    path: "/reactionspeed",
    name: "reactionspeed",
    component: ReactionSpeed,
  },
  {
    path: "/rockpaper",
    name: "rockpaper",
    component: RockPaper,
  },
  {
    path: "/lottonums",
    name: "lottonums",
    component: LottoNums,
  },
  {
    path: "/tictactoe",
    name: "tictactoe",
    component: TicTacToe,
  },
  {
    path: "/minesweeper",
    name: "minesweeper",
    component: MineSweeper,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
