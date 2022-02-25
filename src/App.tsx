import { useState } from "react";
import { UserType } from "./types";
import { Main } from "./components/main/index";
import { Login } from "./components/login/Login";
import { UserContext } from "./contexts/UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  function afterLoginHandler(userDetails: UserType) {
    console.log(userDetails);
    setUser(userDetails);
  }

  return (
    <div className="App">
      {user ? (
        <UserContext.Provider value={user}>
          <Main />
        </UserContext.Provider>
      ) : (
        <Login afterLogin={afterLoginHandler} />
      )}
    </div>
  );
}

export default App;
