import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import { CircularProgress, Box } from "@mui/material";

import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import LinkRedirect from "./components/LinkRedirect/LinkRedirect";
import NotFound from "./components/LinkRedirect/NotFound";
import ForgotPassword from "./components/Home/ForgotPassword";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <Box display="flex" mt={4} justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Router>
      <Routes>
        <Route index path="/" element={user ? <Account /> : <Home />} />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/:shortLink" element={<LinkRedirect />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};
export default App;
