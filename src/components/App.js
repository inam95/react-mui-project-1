import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import Header from './ui/Header';
import Footer from './ui/Footer';
// MUI stuff
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import theme from './ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <div style={{ height: '1000px' }}>Home</div>}
          />
          <Route exact path="/services" component={() => <div>Services</div>} />
          <Route
            exact
            path="/custom-software"
            component={() => <div>Custom SW</div>}
          />
          <Route
            exact
            path="/mobile-apps"
            component={() => <div>Mobile Apps</div>}
          />
          <Route exact path="/websites" component={() => <div>Websites</div>} />
          <Route
            exact
            path="/revolution"
            component={() => <div>Revolution</div>}
          />
          <Route exact path="/about" component={() => <div>About</div>} />
          <Route
            exact
            path="/contact"
            component={() => <div>Contact Us</div>}
          />
          <Route exact path="/estimate" component={() => <div>Estimate</div>} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
