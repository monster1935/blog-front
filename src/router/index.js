import Vue from 'vue';
import Router from 'vue-router';
import Admin from '@/components/admin';
import Blog from '@/components/blog';
import PostList from '@/components/blog/PostList';
import Post from '@/components/blog/Post';
import Archives from '@/components/blog/Archives';
import Link from '@/components/blog/Link';
import About from '@/components/blog/About';
import Hello from '@/components/admin/common/Hello'
import Login from '@/components/admin/Login';
import Users from '@/components/admin/users';
import Articles from '@/components/admin/articles';
import AboutManage from '@/components/admin/about/index';
import LinkManage from '@/components/admin/link/index';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Blog,
            children: [
                {
                    path: '/',
                    name: 'Blog list',
                    component: PostList,
                },
                {
                    path: '/post/:id',
                    name: 'Post',
                    component: Post,
                },
                {
                    path: '/archives',
                    name: 'Archives',
                    component: Archives,
                },
                {
                    path: '/link',
                    name: 'Link',
                    component: Link,
                },
                {
                    path: '/about',
                    name: 'About',
                    component: About,
                },
            ]
        },
        {
            path: '/admin/login',
            name: 'Login',
            component: Login,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: '/',
                    name: 'Index',
                    component: Hello,
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users,
                },
                {
                    path: 'articles',
                    name: 'Articles',
                    component: Articles,
                },
                {
                    path: 'about',
                    name: 'AboutManage',
                    component: AboutManage,
                },
                {
                    path: 'link',
                    name: 'LinkManage',
                    component: LinkManage,
                },
                /*{
                    path: 'tags',
                    name: 'Hello',
                    component: Hello
                },
                {
                    path: 'categories',
                    name: 'Hello',
                    component: Hello,
                },
                {
                    path: 'statis',
                    name: 'Hello',
                    component: Hello,
                },*/
            ]
        }
    ]
})
