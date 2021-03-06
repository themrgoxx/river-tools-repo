import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import store from './redux/store/index';
import Abc from './components/Abc'
import Trades from './components/Trades';
import { Promoted } from './components/auth/Promoted';
import { Tvcontainer } from './components/Tvcontainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';




function App() {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path='/admin/Login' component={Login} />
              <Route exact path='/promoted' component={Promoted} />
            </Switch>
          </Router>
          <Router>
            <Switch>
              <Route exact path='/'  >
                <Navbar />
                {/* <Abc /> */}

                <div class="row">
                  <div className="col-sm-3">
                    <Sidebar />
                  </div>
                  <div class="col-sm-9">
                    <Tvcontainer />
                  </div>

                </div>
                <Trades />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </Provider>
      </Web3ReactProvider>
    </>
  );
}

export default App;
