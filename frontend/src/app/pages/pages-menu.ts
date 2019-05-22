import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Vehiculos',
    icon: 'nb-home',
    link: '/pages/vehicles',
    home: true,
  },
  {
    title: 'Incidencias',
    icon: 'nb-home',
    link: '/pages/incidences',
    home: true,
  },
  {
    title: 'Viajes',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
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
