import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminHomePage from "./Pages/admin/AdminHomepage";

import AdminUserPage from "./Pages/admin/AdminUserPage";
import AdminDashboardLayout from "./layouts/AdminDashBoardLayout";
import AdminPostsPage from "./Pages/admin/AdminPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect / to /admin */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;