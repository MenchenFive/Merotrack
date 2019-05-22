import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mapa',
    icon: 'nb-location',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Vehiculos',
    icon: 'fas fa-truck fa-2x',
    link: '/pages/vehicles',
  },
  {
    title: 'Incidencias',
    icon: 'nb-danger',
    link: '/pages/incidences',
  },
  {
    title: 'Viajes',
    icon: 'nb-angle-double-right',
    link: '/pages/dashboard',
  },
  {
    title: 'Usuarios',
    icon: 'nb-person',
    link: '/pages/dashboard',
  },
  /*{
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },*/
];
