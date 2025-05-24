import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login/login';
import Register from './auth/register/register';
import Dashboard from './dashboard/dashboard';
import MainLayout from './layout/MainLayout';
import NewDetection from './newdetection/newdetection';
import History from './history/history';
import Profile from './profile/profile';
import Statistics from './statistics/statistics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa Sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman dengan Sidebar */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/new-detection"
          element={
            <MainLayout>
              <NewDetection />
            </MainLayout>
          }
        />
         <Route
          path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/statistics"
          element={
            <MainLayout>
              <Statistics />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
