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
        {/* 右上角按钮 */}
        {props.rightNav && (
          <div className="absolute top-6 right-0 z-10">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        )}
        <header className="border-b border-neutral-800">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold">
              {AppConfig.name}
            </h1>
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
