import { render } from 'preact';
import PageLayout from './components/PageLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import pages from './lib/pages';
import { ErrorBoundary, LocationProvider, Router, Route } from 'preact-iso';
import Tone from './pages/Tone';

function Page() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route default path="/tone" component={Tone} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

function App() {
  return (
    <PageLayout>
      <Navbar links={pages} />
      <Page />
      <Footer />
    </PageLayout>
  );
}

render(<App />, document.getElementById('root'));
