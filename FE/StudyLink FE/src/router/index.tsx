import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../Pages/register";
import Login from "../Pages/Login";

/* Admin */
import AdminDashboardLayout from "../layouts/AdminDashBoardLayout";
import AdminHomePage from "../Pages/admin/AdminHomepage";
import AdminUserPage from "../Pages/admin/AdminUserPage";
import AdminPostsPage from "../Pages/admin/AdminPostPage";

/* Student */
import StudentDashboardLayout from "../layouts/DashboardLayout";
import StudentHome from "../Pages/student/HomePage";
import StudentPostPage from "../Pages/student/PostPage";
import StudentMessagesPage from "../Pages/student/MessagePage";
import StudentNotesPage from "../Pages/student/NotePage";
import StudentAIPage from "../Pages/student/ChatPage";
import StudentProfilePage from "../Pages/student/profilePage";

const getRole = () => localStorage.getItem("role");
const getToken = () => localStorage.getItem("token");

type Props = {
  children: React.ReactNode;
  role?: "ADMIN" | "STUDENT";
};

const ProtectedRoute = ({ children, role }: Props) => {
  const userRole = getRole();
  const token = getToken();

  if (!userRole || !token) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
        </Route>

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="posts" element={<StudentPostPage />} />
          <Route path="messages" element={<StudentMessagesPage />} />
          <Route path="notes" element={<StudentNotesPage />} />
          <Route path="ai" element={<StudentAIPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;