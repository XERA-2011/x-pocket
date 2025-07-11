// import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  // const t = useTranslations('BaseTemplate');

  return (
    <div className="w-full px-1 antialiased">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-neutral-800">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold">
              {AppConfig.name}
            </h1>
          </div>

          <div className="flex justify-between">
            <nav aria-label="Main navigation">
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
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
