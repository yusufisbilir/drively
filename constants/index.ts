export const avatarPlaceholder =
  'https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?t=st=1739902606~exp=1739906206~hmac=f006d7398fc99aefb4b498a15f8a4e3f5e39838cf89965c5777bed88cc806fa7&w=1380';

export const navItems = [
  {
    name: 'Dashboard',
    icon: 'LayoutDashboard',
    url: '/',
  },
  {
    name: 'Documents',
    icon: 'FileText',
    url: '/documents',
  },
  {
    name: 'Images',
    icon: 'LucideImage',
    url: '/images',
  },
  {
    name: 'Media',
    icon: 'Video',
    url: '/media',
  },
  {
    name: 'Others',
    icon: 'MoreHorizontal',
    url: '/others',
  },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const sortTypes = [
  {
    label: 'Date created (newest)',
    value: '$createdAt-desc',
  },
  {
    label: 'Created Date (oldest)',
    value: '$createdAt-asc',
  },
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
  },
  {
    label: 'Name (Z-A)',
    value: 'name-desc',
  },
  {
    label: 'Size (Highest)',
    value: 'size-desc',
  },
  {
    label: 'Size (Lowest)',
    value: 'size-asc',
  },
];
