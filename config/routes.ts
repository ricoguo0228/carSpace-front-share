export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
    ],
  },
  {path: '/user/center', component: './User/Center'},
  {path: '/carSpace/create', name: '创建车位', icon: 'PlusSquareOutlined', component: './CarSpace/CarSpaceCreate'},
  {path: '/carSpace/room', name: '车位大厅', icon: 'CarOutlined', component: './CarSpace/CarSpaceRoom'},
  {path: '/carSpace/reserve',  component: './CarSpace/CarSpaceReserve'},

  {path: '/', redirect: '/carSpace/room'},
  {path: '*', name: '404', layout: false, component: './404'},
];
