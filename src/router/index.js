import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/pages/index/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/innerpages/about.vue"),
  },
  {
    path: "/anglicanism",
    name: "anglicanism",
    component: () => import("@/pages/innerpages/anglicanism.vue"),
  },
  {
    path: "/programs",
    name: "programs",
    component: () => import("@/pages/innerpages/programs.vue"),
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () => import("@/pages/innerpages/gallery.vue"),
  },
  {
    path: "/find-a-church",
    name: "findAChurch",
    component: () => import("@/pages/innerpages/find-a-church.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/innerpages/auth-pages/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/innerpages/auth-pages/register.vue"),
  },
  {
    path: "/signup-success",
    name: "make-payment",
    component: () => import("@/pages/innerpages/auth-pages/signup-success.vue"),
  },
  {
    path: "/register/close",
    name: "registerClose",
    component: () => import("@/pages/innerpages/auth-pages/registerClose.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/pages/innerpages/contact.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/pages/admin/index.vue"),
    children: [
      {
        path: "",
        redirect: "/admin/confirmPayment",
      },
      {
        path: "/admin/confirmPayment",
        name: "confirmPayment",
        component: () => import("@/pages/admin/confirmPayment.vue"),
      },
      {
        path: "/admin/manualRegistration",
        name: "manualRegistration",
        component: () => import("@/pages/admin/manualRegistration.vue"),
      },
      {
        path: "/admin/printCard",
        name: "printId",
        component: () => import("@/pages/admin/printId.vue"),
      },
      {
        path: "/admin/verify/participant/:id?",
        name: "verifyParticipantModal",
        component: () => import("@/pages/admin/verifyParticipants.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/innerpages/special-pages/404.vue"),
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/login",
    "/register",
    "/register/close",
    "/",
    "/contact",
    "/signup-success",
    "/about",
    "/anglicanism",
    "/programs",
    "/gallery",
    "/find-a-church",
    "/:catchAll(.*)",
  ];
  const authRequired = !publicPages.includes(to.path) && !to.meta.public;
  const token = localStorage.getItem("token");

  if (authRequired && !token) {
    return next("/login");
  }

  if (token && to.path === "/login") {
    return next("/admin/confirmPayment");
  }

  next();
});

export default router;
