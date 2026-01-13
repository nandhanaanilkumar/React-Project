import './App.css';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Bio from './Pages/Bio';
import Notification from './Pages/Notification';
import AdminDashboard  from './Pages/Admindashboard';
import Network from './Pages/Network';
import NetworkInvitations from './Pages/NetworkInvitations';
import Profileedit from './Pages/Profileedit';
import CreatePost from './Pages/CreatePost';
import AdminPostsPage from "./Pages/AdminPostsPage";
import ForgotPassword from './Pages/ForgotPasswordModal';
import VerifyOTP from './Pages/VerifyOTP';
import ResetPassword from './Pages/ResetPassword';
import Drafts from './Pages/Drafts';
function App() {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/network" element={<Network />}></Route>
        <Route path="/network/invitations" element={<NetworkInvitations />}></Route>
        <Route path="/profileedit" element={<Profileedit />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/admin/posts" element={<AdminPostsPage />} />
<Route path="/admin/posts" element={<AdminPostsPage />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOTP />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/drafts" element={<Drafts />} />

      </Routes>
    </div>


  );
}

export default App;
