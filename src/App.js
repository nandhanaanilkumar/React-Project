import './App.css';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import { Route, Routes ,useLocation} from 'react-router-dom';
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
import BookmarkedPosts from './Pages/BookmarkedPosts';
import { useState } from 'react';
import Nav from './Components/Navbar';
import MessagesPage from './Pages/MessagesPage';
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const hideNavbarPaths = [
    "/",
     "/registration",
      "/forgot-password", 
      "/verify-otp", 
      "/reset-password",
      "/admin/posts",
      "/admindashboard"
    ];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <div>
      {!hideNavbar &&(
    <Nav 
    searchQuery={searchQuery}
     setSearchQuery={setSearchQuery} />)}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/Home" element={<Home searchQuery={searchQuery}/>} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/network" element={<Network />}></Route>
        <Route path="/network/invitations" element={<NetworkInvitations />}></Route>
        <Route path="/profileedit" element={<Profileedit />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
<Route path="/admin/posts" element={<AdminPostsPage />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOTP />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/drafts" element={<Drafts />} />
<Route path="/bookmarks" element={<BookmarkedPosts />} />
     <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </div>


  );
}

export default App;
