import Link from 'next/link';
// import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';

export const HomeTemplate = (props: {
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  // const t = useTranslations('HomeTemplate');

  return (
    <div className="w-full px-1 antialiased">
      <div className="mx-auto max-w-screen-md relative">
        <header className="border-b border-neutral-800 relative pb-8 pt-8 flex flex-col items-center">
          <Link href="/" className="text-3xl font-bold text-center block hover:opacity-80 transition">
            {AppConfig.name}
          </Link>
          {props.rightNav && (
            <nav className="absolute right-4 bottom-2">
              <ul className="flex flex-wrap items-center gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          )}
        </header>
        <main>{props.children}</main>
        <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
          {`© Copyright ${new Date().getFullYear()} ${AppConfig.name} `}
        </footer>
      </div>
    </div>
  );
};
