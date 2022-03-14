import React, { useState } from "react";
import { Login } from "./pages/login/index";
import { UserContext } from "./contexts/UserContext";
import { UserType } from "./types/index";
import { FullPageSpinner } from "./components/library/spinner";
import "./App.css";

const Main = React.lazy(() => import("./pages/main/index"));

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        {user ? (
          <React.Suspense fallback={<FullPageSpinner size="medium" />}>
            <Main />
          </React.Suspense>
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
