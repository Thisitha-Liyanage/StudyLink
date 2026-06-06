import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../Pages/register";

import AdminDashboardLayout from "../layouts/AdminDashBoardLayout";
import AdminHomePage from "../Pages/admin/AdminHomepage";
import AdminUserPage from "../Pages/admin/AdminUserPage";
import AdminPostsPage from "../Pages/admin/AdminPostPage";

import StudentDashboardLayout from "../layouts/DashboardLayout";
import StudentHome from "../Pages/student/HomePage";
import StudentPostPage from "../Pages/student/PostPage";
import StudentMessagesPage from "../Pages/student/MessagePage";
import StudentNotesPage from "../Pages/student/NotePage";
import StudentAIPage from "../Pages/student/ChatPage";


import Login from "../Pages/Login";

const getRole = () => localStorage.getItem("role");

type Props = {
  children: React.ReactNode;
  role?: "admin" | "student";
};

const ProtectedRoute = ({ children, role }: Props) => {
  const userRole = getRole();

  if (!userRole) return <Navigate to="/login" />;

  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
   
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

       /* admin routers */
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
        </Route>

        /* student routers  */
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="posts" element={<StudentPostPage />} />
          <Route path="messages" element={<StudentMessagesPage />} />
          <Route path="notes" element={<StudentNotesPage />} />
          <Route path="ai" element={<StudentAIPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;