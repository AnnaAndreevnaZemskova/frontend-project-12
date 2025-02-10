import {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import AuthContext from '../contexts/AuthContext';
import useAuth from '../hooks/index.jsx';
import HomePage from './HomePage.jsx';
import { logoutUser } from '../services/authSlice.js';
import { addChannel, removeChannel, updateChannel } from '../services/channelsSlice.js';
import { addMessage } from '../services/messagesSlice.js';
import { setCurrentChannel } from '../services/uiSlice.js';
import { selectRollbarConfig, selectProfanityFilter } from '../selectors/configSelectors.js';
import socket from '../socket.js';
import resources from '../locales/index.js';
import routes from '../routes.js';
import 'react-toastify/dist/ReactToastify.css';

const rollbarConfig = selectRollbarConfig();
const filter = selectProfanityFilter();

const AuthProvider = ({ children }) => {
  const hasToken = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(hasToken);
  const dispatch = useDispatch();

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setLoggedIn(false);
  }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (user && token) {
      logIn();
    } else {
      logOut();
    }
  }, [logIn, logOut]);

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={value}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </Provider>
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn && <Button onClick={auth.logOut}>{t('navbar.logOutButton')}</Button>
  );
};

const App = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const defaultChannelId = useSelector((state) => state.ui.defaultChannelId);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      payload.text = filter.clean(payload.text);
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      payload.name = filter.clean(payload.name);
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      console.log(payload.id);
      console.log('defaultChannelId: ', defaultChannelId);
      dispatch(setCurrentChannel(defaultChannelId));
      dispatch(removeChannel(payload.id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(updateChannel({ changes: { name: payload.name }, id: payload.id }));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, defaultChannelId]);

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navbar expand="lg" className="shadow-sm bg-white">
            <Container>
              <Navbar.Brand href="/">{t('navbar.homeLink')}</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>

          <Routes>
            <Route path={routes.pages.loginPage()} element={<LoginPage />} />
            <Route path={routes.pages.signUpPage()} element={<SignUpPage />} />
            <Route path={routes.pages.notFoundPage()} element={<NotFoundPage />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              )}
            />
          </Routes>
        </Router>
      </div>
      <ToastContainer closeOnClick />
    </AuthProvider>
  );
};

export default App;
