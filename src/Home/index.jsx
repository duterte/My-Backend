import Header from './header/header';
import Main from './main/main';
import Footer from '../global-components/footer';
import LazyLoad from '../global-components/lazyload';

function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default LazyLoad(Home);
