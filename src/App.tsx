import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import ChatForm from './app/chat/ChatForm';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';

const AppRoutes = () => {
  const { VITE_AUTH0_ISSUER_BASE_URL, VITE_AUTH0_CLIENT_ID, VITE_DOMAIN } = import.meta.env;

  const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (<Auth0Provider
      domain={VITE_AUTH0_ISSUER_BASE_URL}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: VITE_DOMAIN,
        scope: "openid profile email read:current_user update:users",
      }}>
      {children}
    </Auth0Provider>)
  }

  /**
   * Routerコンポーネント
   * @returns  Router
   */
  const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatForm />} />
        </Routes>
      </BrowserRouter>
    )
  }

  /*
   * 認証認可を通過していない状態で配下のcomponentにアクセスした場合、ログイン画面に戻す為のロジック
   */
  const AuthRouting = withAuthenticationRequired(Router, {
    onRedirecting: () => (
      <><p>Now Loading...</p></>
    )
  });



  return (
    <AuthProvider>
      <AuthRouting />
    </AuthProvider>
  )
}

export default AppRoutes
