/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import packageJson from '../../../../../package.json';
import { UserRolesType, UserTypesType } from '@users';

export const basePath = '/admin';

export const userMenu = (role: UserRolesType, type: UserTypesType): Navigation => {
  const menu: FuseNavigationItem[] = [
    {
      id: 'config',
      title: 'SIDEBAR.SETTINGS',
      type: 'basic',
      icon: 'mat_solid:settings',
      link: `${basePath}/settings`,
    },
    {
      id: 'divider',
      type: 'divider',
    },
    {
      id: 'documentation.changelog',
      title: 'version',
      type: 'basic',
      icon: 'mat_solid:verified',
      link: '/docs/changelog',
      badge: {
        title: packageJson.version.toString(),
        classes: 'px-1 bg-yellow-300 text-black rounded-full text-xs',
      },
    },
  ];

  switch (type) {
    case 'CLIENT':
      switch (role) {
        case 'USER':
          menu.unshift({
            id: 'dashboard',
            title: 'SIDEBAR.DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
        default:
          menu.unshift({
            id: 'dashboard',
            title: 'SIDEBAR.DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
      }

    case 'ORG':
      switch (role) {
        case 'USER':
          menu.unshift({
            id: 'dashboard',
            title: 'SIDEBAR.DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
        case 'ADMIN':
          menu.unshift(
            {
              id: 'enterprises',
              title: 'SIDEBAR.DASHBOARD',
              type: 'basic',
              icon: 'mat_solid:business',
              link: `${basePath}/enterprises`,
            },
            {
              id: 'users',
              title: 'SIDEBAR.USERS',
              type: 'basic',
              icon: 'mat_solid:badge',
              link: `${basePath}/clients`,
            }
          );
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
        case 'SUPER_ADMIN':
          menu.unshift({
            id: 'users',
            title: 'SIDEBAR.USERS',
            type: 'basic',
            icon: 'mat_solid:person',
            link: `${basePath}/users`,
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };

        default:
          menu.unshift({
            id: 'dashboard',
            title: 'SIDEBAR.DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
      }

    case 'OWNER':
      switch (role) {
        case 'ADMIN':
          menu.unshift(
            {
              id: 'dashboard',
              title: 'SIDEBAR.DASHBOARD',
              type: 'basic',
              icon: 'heroicons_outline:chart-pie',
              link: `${basePath}/dashboard`,
            },
            {
              id: 'users',
              title: 'SIDEBAR.USERS',
              type: 'basic',
              icon: 'heroicons_outline:user',
              link: `${basePath}/users`,
            }
          );
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
        default:
          menu.unshift({
            id: 'dashboard',
            title: 'SIDEBAR.DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
          });
          return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
          };
      }
  }
};
