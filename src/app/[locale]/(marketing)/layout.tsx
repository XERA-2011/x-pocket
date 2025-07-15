// import { getTranslations, setRequestLocale } from 'next-intl/server';
// import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { HomeTemplate } from '@/templates/HomeTemplate';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    <>
      <HomeTemplate
        rightNav={(
          <>
            {/* <li>
              <Link
                href="/sign-in/"
                className="border-none hover:text-neutral-400"
                title={t('sign_in_link')}
              >
                <FaSignInAlt className="text-white" />
              </Link>
            </li>

            <li>
              <Link
                href="/sign-up/"
                className="border-none hover:text-neutral-400"
                title={t('sign_up_link')}
              >
                <FaUserPlus className="text-white" />
              </Link>
            </li> */}
            <li>
              <a className="border-none hover:text-neutral-400" href="https://github.com/XERA-2011/x-pocket" title="GitHub"><FaGithub className="text-white" /></a>
            </li>
            <li>
              <LocaleSwitcher />
            </li>
          </>
        )}
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </HomeTemplate>
    </>
  );
}
