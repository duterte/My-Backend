import PageTemplate from 'global-components/page-template';
import LazyLoad from 'global-components/lazyload';
import './index.css';

function NotFound() {
  return (
    <PageTemplate className="not-found">
      <div className="content">
        <div className="error-number">
          <span>404</span>
        </div>
        <div className="error-name">
          <h1>Content not found</h1>
        </div>
        <div className="error-message">
          <p>
            The server could not locate the resources that you're trying to
            access
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}

export default LazyLoad(NotFound);
