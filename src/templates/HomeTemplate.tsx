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
        <header className="border-b border-neutral-800">
          <div className="flex items-center justify-between pb-8 pt-8">
            <h1 className="text-3xl font-bold">
              {AppConfig.name}
            </h1>
            {props.rightNav && (
              <nav>
                <ul className="flex flex-wrap items-center gap-x-5 text-xl">
                  {props.rightNav}
                </ul>
              </nav>
            )}
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
          {`© Copyright ${new Date().getFullYear()} ${AppConfig.name} `}
        </footer>
      </div>
    </div>
  );
};
