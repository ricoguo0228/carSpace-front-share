export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'}]
  },
  {path: '/welcome',name:'欢迎页', icon: 'smile', component: './Welcome'},
  {
    path: '/admin',
    name:'管理员页面',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {path: '/admin', name:'管理员页面重定向',redirect: '/admin/sub-page'},
      {path: '/admin/sub-page',name:'管理员页面显示', component: './Admin'},
    ],
  },
  {icon: 'table', name:'表单页',path: '/list', component: './TableList'},
  {path: '/', name:'欢迎页重定向',redirect: '/welcome'},
  {path: '*',name:'404', layout: false, component: './404'},
];
