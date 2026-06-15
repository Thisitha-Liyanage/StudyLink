import Router from "./router/index";
import { UserProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NoteContext";

function App() {
  return (
    <UserProvider>
      <NotesProvider>
        <Router />
      </NotesProvider>
    </UserProvider>
  );
}

export default App;