
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') }
    ]
  },
  {
    path: '/user/:user',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/User.vue') }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
