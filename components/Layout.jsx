import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <title>Health Explore</title>
      </Head>
      <header>
        <Header />
      </header>
    <main className='p-1' style={{ backgroundColor: '#F5F5F5'}}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
