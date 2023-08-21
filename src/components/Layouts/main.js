import Head from 'next/head'
import SideBar from '../sideBar/SideBar'

const Layout = ({ children, title }) => {
  const t = `${title}`
  return (
    <>
      {title && (
        <Head>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta property="og:title" content={t} />
        </Head>
      )}
      <SideBar>
            {children}
      </SideBar>
    </>
  )
}

export default Layout
