import Login from '../views/login/login'
import Home from '../views/home/home'
import User from '../views/user/user'
import UserList from '../views/user/userList';
import UserAdd from '../views/user/userAdd';
import UserEdit from '../views/user/userEdit';
import Shop from '../views/shop/shop'

let routes = [
    {
        path: '/login',
        name: '登录',
        exact: true,
        component: Login
    },
    {
        path: '/',
        name: '首页',
        component: Home,
        exact: true,
    },
    {
        path: '/home',
        name: '首页',
        component: Home,
    },
    {
        path: '/user',
        name: '用户',
        component: User,
        routes: [   /*嵌套路由*/
            {
                path: "/user/",
                component: UserList
            },
            {
                path: "/user/add",
                component: UserAdd
            },
            {
                path: "/user/edit",
                component: UserEdit
            }
        ]
    },
    {
        path: '/shop',
        name: '商店',
        component: Shop,
    },
]
export default routes;