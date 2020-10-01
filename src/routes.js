import loadable from '@loadable/component';
import { v1 as uuid } from 'uuid';

import { Icons } from './components/layout/sidebar_menu/SidebarMenu';

const Layout = loadable(() => import('./components/layout/Layout'));
const Login = loadable(() => import('./components/pages/Login'));
const AccountValidation = loadable(() => import('./components/pages/AccountValidation'));
const Home = loadable(() => import('./components/pages/Home'));
const TodayAssessment = loadable(() => import('./components/pages/TodayAssessment'));
const AssessmentResults = loadable(() => import('./components/pages/AssessmentResults'));
const NewAssessmentResult = loadable(() => import('./components/pages/NewAssessmentResult'));

export const publicRoutes = [
  { key: uuid(), path: '/login', component: Login },
  { key: uuid(), path: '/account-validation', component: AccountValidation },
  { key: uuid(), path: '/', component: Layout }
];

export const privateRoutes = [
  { key: uuid(), path: '/home', title: 'Accueil', icon: Icons.HOME, component: Home, sidebarMenu: true },
  {
    key: uuid(),
    path: '/assessment',
    title: 'Evaluation',
    icon: Icons.TODAY_ASSESSMENT,
    component: TodayAssessment,
    sidebarMenu: true
  },
  {
    key: uuid(),
    path: '/assessment-results',
    title: 'Rendus',
    icon: Icons.ASSESSMENT_RESULTS,
    component: AssessmentResults,
    sidebarMenu: true,
    exactPath: true
  },
  { key: uuid(), path: '/assessment-results/new', component: NewAssessmentResult }
];
