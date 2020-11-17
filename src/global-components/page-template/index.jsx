import HeaderTop from '../headers/headers';
import { StickyHeader } from '../SearchInput/search-input';
import Footer from '../footer';

const style = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1em 0',
  color: '#9e9e9e',
  backgroundColor: '#1b1919',
};

function PageTemplate(props) {
  // const { renderPopper, setRenderPopper } = useState(false);
  const { className, search } = props;

  return (
    <>
      <div style={style}>
        This site is still in development. server requests and other
        functionalities may not work as you may expect
      </div>
      <header className={className}>
        <HeaderTop />
      </header>
      <main className={className}>
        {search ? <StickyHeader /> : null}
        {props.children}
      </main>
      <Footer />
    </>
  );
}

export default PageTemplate;
