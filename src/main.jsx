import { render } from 'preact';
import PageLayout from './components/PageLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import pages from './lib/pages';

function App() {
  return (
    <PageLayout>
      <Navbar links={pages} />
      <Footer />
    </PageLayout>
  );
}

render(<App />, document.getElementById('root'));
