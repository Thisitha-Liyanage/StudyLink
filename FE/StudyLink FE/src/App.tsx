import Router from "./router/index";
import { UserProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NoteContext";
import { AdminProvider } from "./context/AdminContext";
import { MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <UserProvider>
      <NotesProvider>
        <MessageProvider>
          <AdminProvider>
            <Router />
          </AdminProvider>
        </MessageProvider>
      </NotesProvider>
    </UserProvider>
  );
}

export default App;