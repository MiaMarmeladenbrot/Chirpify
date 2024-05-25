import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import UserPage from "./pages/UserPage/UserPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AddTweetPage from "./pages/AddTweetPage/AddTweetPage";
import AuthRequiredLogin from "./components/AuthRequiredLogin/AuthRequiredLogin";
import AuthRequiredVerified from "./components/AuthRequiredVerified/AuthRequiredVerified";
import { useState } from "react";
import {
  userContext,
  allUsersContext,
  accessTokenContext,
  errorMessageContext,
  userFeedContext,
} from "./context/Context";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";

function App() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [accessToken, setAccesToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userFeed, setUserFeed] = useState(null);

  return (
    <div className="wrapper">
      <userContext.Provider value={{ user, setUser }}>
        <allUsersContext.Provider value={{ allUsers, setAllUsers }}>
          <accessTokenContext.Provider value={{ accessToken, setAccesToken }}>
            <errorMessageContext.Provider
              value={{ errorMessage, setErrorMessage }}
            >
              <userFeedContext.Provider value={{ userFeed, setUserFeed }}>
                <BrowserRouter>
                  <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                      path="/feed"
                      element={
                        <AuthRequiredLogin>
                          <FeedPage />
                        </AuthRequiredLogin>
                      }
                    />
                    <Route
                      path="/user/:userId"
                      element={
                        <AuthRequiredLogin>
                          <UserPage />
                        </AuthRequiredLogin>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <AuthRequiredLogin>
                          <SettingsPage />
                        </AuthRequiredLogin>
                      }
                    />

                    <Route
                      path="/addtweet"
                      element={
                        <AuthRequiredVerified>
                          <AddTweetPage />
                        </AuthRequiredVerified>
                      }
                    />
                    <Route
                      path="/settings/emailverification"
                      element={
                        <AuthRequiredLogin>
                          <VerifyEmailPage />
                        </AuthRequiredLogin>
                      }
                    />
                    <Route
                      path="*"
                      element={<p>There's nothing here: 404!</p>}
                    />
                  </Routes>
                </BrowserRouter>
              </userFeedContext.Provider>
            </errorMessageContext.Provider>
          </accessTokenContext.Provider>
        </allUsersContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
