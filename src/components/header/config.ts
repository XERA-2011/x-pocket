export interface Link {
  title: string;
  href: string;
  target?: string;
}

export const links: Link[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Games',
    href: '/games',
  },
  {
    title: 'Tools',
    href: '/tools',
  },
  {
    title: 'AI',
    href: '/ai',
  },
  {
    title: 'News',
    href: '/news',
  },
];
