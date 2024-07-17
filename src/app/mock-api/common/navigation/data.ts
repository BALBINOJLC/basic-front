/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { IUserProfile, TUserRoles } from '@users';
import { Navigation } from 'app/core/navigation/navigation.types';
import packageJson from '../../../../../package.json';

export const basePath = '/admin';

const baseMenu: FuseNavigationItem[] = [
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

const getSUperAdminMenu = (): FuseNavigationItem[] => [
  {
    id: 'dashboard',
    title: 'SIDEBAR.DASHBOARD',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: `${basePath}/dashboard`,
  },
  {
    id: 'users',
    title: 'SIDEBAR.STUDENTS',
    type: 'basic',
    icon: 'heroicons_outline:user-group',
    link: `${basePath}/users`,
  },
];

const getAdminMenu = (): FuseNavigationItem[] => [
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
    icon: 'heroicons_outline:user-group',
    link: `${basePath}/users`,
  },
  {
    id: 'users',
    title: 'SIDEBAR.COLLEGES',
    type: 'basic',
    icon: 'mat_outline:location_city',
    link: `${basePath}/colegios`,
  },
  {
    id: 'license',
    title: 'SIDEBAR.LICENSES',
    type: 'basic',
    icon: 'heroicons_outline:identification',
    link: `${basePath}/licencias-activas`,
  },
];

const getOwnerMenu = (): FuseNavigationItem[] => [
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
    icon: 'heroicons_outline:user-group',
    link: `${basePath}/users`,
  },
];

const getUserMenu = (): FuseNavigationItem[] => [
  {
    id: 'dashboard',
    title: 'SIDEBAR.DASHBOARD',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: `${basePath}/dashboard`,
  },
];

const getDefaultMenu = (): FuseNavigationItem[] => [
  {
    id: 'role',
    title: 'SIDEBAR.SELECCT_ROLE',
    type: 'basic',
    icon: 'heroicons_outline:user-plus',
    link: `${basePath}/choose-role`,
  },
];

const getMenuItems = (role: TUserRoles): FuseNavigationItem[] => {
  switch (role) {
    case 'ADMIN':
      return getAdminMenu();
    case 'SUPER_ADMIN':
      return getSUperAdminMenu();
    case 'USER':
      return getUserMenu();
    case 'OWNER':
      return getOwnerMenu();
    default:
      return getDefaultMenu();
  }
};

export const userMenu = (profiles: IUserProfile[]): Navigation => {
  const activeProfile = profiles.find((profile) => profile.active);
  if (!activeProfile) {
    return {
      compact: baseMenu,
      default: baseMenu,
      futuristic: baseMenu,
      horizontal: baseMenu,
    };
  }

  const roleBasedMenu = getMenuItems(activeProfile.role);

  const menu: FuseNavigationItem[] = [...roleBasedMenu, ...baseMenu];

  return {
    compact: menu,
    default: menu,
    futuristic: menu,
    horizontal: menu,
  };
};
