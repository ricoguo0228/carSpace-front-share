export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },

  { path: '/carSpace/create', name: '创建车位', component: './CarSpaceCreate' },
  { path: '/carSpace/room', name: '车位大厅', component: './CarSpaceRoom' },

  { path: '/', redirect: '/carSpace/create' },
  { path: '*', name: '404', layout: false, component: './404' },
];
