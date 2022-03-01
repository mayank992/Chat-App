import { useState, useCallback } from "react";
import { Main } from "./pages/main/index";
import { Login } from "./pages/login/index";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="App">
      <UserProvider>
        {isLoggedIn ? <Main /> : <Login onLogin={handleLogin} />}
      </UserProvider>
    </div>
  );
}

export default App;
