export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },

  {
    path: '/carSpace/create',
    name: '创建车位',
    icon: 'PlusSquareOutlined',
    component: './CarSpaceCreate',
  },
  { path: '/carSpace/room', name: '车位大厅', icon: 'SendOutlined', component: './CarSpaceRoom' },

  { path: '/', redirect: '/carSpace/create' },
  { path: '*', name: '404', layout: false, component: './404' },
];
