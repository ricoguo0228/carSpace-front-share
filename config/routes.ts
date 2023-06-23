export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
    ],
  },
  {path: '/carSpace/room',  name: '车位大厅', icon: 'HomeOutlined', component: './CarSpace/CarSpaceRoom'},
  {path: '/carSpace/myReserve', name: '我的预约', icon: 'BellOutlined', component: './CarSpace/CarSpaceMyReservation'},
  {path: '/carSpace/myCreate', name: '我的车位', icon: 'CarOutlined', component: './CarSpace/CarSpaceMyCreate',},
  {path: '/carSpace/create', name: '创建车位', icon: 'PlusSquareOutlined', component: './CarSpace/CarSpaceCreate'},
  {path: '/carSpace/myCreateInfo', component: './CarSpace/CarSpaceMyCreateInfo'},
  {path: '/carSpace/reserve', component: './CarSpace/CarSpaceReserve'},
  {
    path: '/admin',
    access: 'canAdmin',
    routes: [
      {path: '/admin/carSpaceAdmin', name: '车位管理', icon: 'HomeOutlined', component: './Admin/CarSpace'},
      {path: '/admin/carSpaceInfo', component: './Admin/CarSpaceInfo'},
    ]
  },
  {
    path: '/carSpace/admin',
    access: 'canAdmin',
    name: '车位管理',
    icon: 'HomeOutlined',
    component: './Admin/CarSpace'
  },
  {path: '/user/center', component: './User/Center'},
  {path: '/', redirect: '/carSpace/room'},
  {path: '*', name: '404', layout: false, component: './404'},
];
