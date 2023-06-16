export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'}]
  },
  {
    path: '/carSpace',
    name:'添加车位',
    routes: [
      {path:'/carSpace/create',component: './CarSpace/Create'}
    ]
  },
  {path: '/',  redirect: '/carSpace/create'},
  {path: '*', name: '404', layout: false, component: './404'},
];
