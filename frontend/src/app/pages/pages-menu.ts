import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Localizacion',
    icon: 'nb-location',
    link: '/pages/maps',
    home: true,
    data: {
      permission: 'view',
      resource: 'maps',
    },
  },
  {
    title: 'Viajes',
    icon: 'nb-angle-double-right',
    link: '/pages/trips',
    data: {
      permission: 'view',
      resource: 'trips',
    },
  },
  {
    title: 'Flota',
    icon: 'fas fa-truck fa-2x',
    link: '/pages/vehicles',
    data: {
      permission: 'view',
      resource: 'fleet',
    },
  },
  {
    title: 'Incidencias',
    icon: 'nb-alert',
    link: '/pages/incidences',
    data: {
      permission: 'view',
      resource: 'incidences',
    },
  },
  /*{
    title: 'Direcciones',
    icon: 'nb-compose',
    link: '/pages/address',
    home: true,
  },*/
  {
    title: 'Usuarios',
    icon: 'nb-person',
    link: '/pages/users',
    data: {
      permission: 'view',
      resource: 'users',
    },
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
