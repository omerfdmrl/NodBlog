import { createRouter, createWebHistory } from 'vue-router'

import SiteHomeView from '@/views/Site/HomeView.vue'
import SiteBlogIndexView from '@/views/Site/Blog/IndexView.vue'
import SiteBlogAddView from '@/views/Site/Blog/AddView.vue'
import SiteProfileView from '@/views/Site/ProfileView.vue'
import SiteErrorView from '@/views/Site/ErrorView.vue'
import SiteTagListView from '@/views/Site/Tag/ListView.vue'
import SiteTagIndexView from '@/views/Site/Tag/IndexView.vue'

import LoginView from '@/views/Panel/Authentication/LoginView.vue'
import RegisterView from '@/views/Panel/Authentication/RegisterView.vue'
import ForgotPasswordView from '@/views/Panel/Authentication/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/Panel/Authentication/ResetPasswordView.vue'

import DashboardView from '@/views/Panel/DashboardView.vue'
import PanelBlogListView from '@/views/Panel/Blog/ListView.vue'
import PanelBlogAddView from '@/views/Panel/Blog/AddView.vue'
import PanelBlogEditView from '@/views/Panel/Blog/EditView.vue'
import UserEditView from '@/views/Panel/User/EditView.vue'

import AdminSettingsView from '@/views/Admin/SettingsView.vue'
import AdminMenuView from '@/views/Admin/MenuView.vue'
import AdminUserView from '@/views/Admin/UserView.vue'
import AdminGroupView from '@/views/Admin/GroupView.vue'
import AdminRoleView from '@/views/Admin/RoleView.vue'
import AdminReportView from '@/views/Admin/ReportView.vue'

const routes = [
  {
    path: '/',
    name: 'site-home',
    component: SiteHomeView,
    meta: {template: 'site'}
  },
  {
    path: '/error/:code',
    name: 'site-error',
    component: SiteErrorView,
    meta: {template: 'site'}
  },
  {
    path: '/post/:post/:id',
    name: 'site-blog-index',
    component: SiteBlogIndexView,
    meta: {template: 'site'}
  },
  {
    path: '/profile/:username',
    name: 'site-profile',
    component: SiteProfileView,
    meta: {template: 'site'}
  },
  {
    path: '/tags',
    name: 'site-tag-list',
    component: SiteTagListView,
    meta: {template: 'site'}
  },
  {
    path: '/tag/:tag',
    name: 'site-tag-index',
    component: SiteTagIndexView,
    meta: {template: 'site'}
  },
  {
    path: '/blog/add',
    name: 'site-blog-add',
    component: SiteBlogAddView,
    meta: {template: 'site'}
  },


  {
    path: '/panel/login',
    name: 'panel-login',
    component: LoginView,
    meta: {template: 'authentication'}
  },
  {
    path: '/panel/register',
    name: 'panel-register',
    component: RegisterView,
    meta: {template: 'authentication'}
  },
  {
    path: '/panel/forgot-password',
    name: 'panel-forgot-password',
    component: ForgotPasswordView,
    meta: {template: 'authentication'}
  },
  {
    path: '/panel/reset-password/:code/:email',
    name: 'panel-reset-password',
    component: ResetPasswordView,
    meta: {template: 'authentication'}
  },


  {
    path: '/panel/dashboard',
    name: 'panel-dashboard',
    component: DashboardView,
    meta: {template: 'panel'}
  },
  {
    path: '/panel/blog/list',
    name: 'panel-blog-list',
    component: PanelBlogListView,
    meta: {template: 'panel'}
  },
  {
    path: '/panel/blog/add',
    name: 'panel-blog-add',
    component: PanelBlogAddView,
    meta: {template: 'panel'}
  },
  {
    path: '/panel/blog/edit/:slug/:id',
    name: 'panel-blog-edit',
    component: PanelBlogEditView,
    meta: {template: 'panel'}
  },
  {
    path: '/panel/user/edit',
    name: 'panel-user-edit',
    component: UserEditView,
    meta: {template: 'panel'}
  },


  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: {template: 'panel'}
  },
  {
    path: '/admin/menu',
    name: 'admin-menu',
    component: AdminMenuView,
    meta: {template: 'panel'}
  },
  {
    path: '/admin/user',
    name: 'admin-user',
    component: AdminUserView,
    meta: {template: 'panel'}
  },
  {
    path: '/admin/group',
    name: 'admin-group',
    component: AdminGroupView,
    meta: {template: 'panel'}
  },
  {
    path: '/admin/role',
    name: 'admin-role',
    component: AdminRoleView,
    meta: {template: 'panel'}
  },
  {
    path: '/admin/report',
    name: 'admin-report',
    component: AdminReportView,
    meta: {template: 'panel'}
  },

  {
    path: '/:catchAll(.*)',
    redirect: { name: 'site-error', params: { code: 404 } }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
