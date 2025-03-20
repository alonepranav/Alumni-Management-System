import Student_EditProfile from './app/user/profile/student/edit-profile/Student_EditProfile';
import Alumni_EditProfile from './app/user/profile/alumni/edit-profile/Alumni_EditProfile';
import Student_Register from './app/auth/student/register/Student_Register';
import Alumni_Register from './app/auth/alumni/register/Alumni_Register';
import Student_Profile from './app/user/profile/student/Student_Profile';
import Alumni_Profile from './app/user/profile/alumni/Alumni_Profile';
import Student_Login from './app/auth/student/login/Student_Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alumni_Login from './app/auth/alumni/login/Alumni_Login';
import Create_Post from './app/posts/create-post/Create_Post';
import Alumni_Event from './app/alumni-event/Alumni_Event';
import StudentProvider from './context/StudentContext';
import AlumniProvider from './context/AlumniContext';
import My_Posts from './app/posts/my-posts/My_Posts';
import PostLayout from './app/posts/PostLayout';
import Gallery from './app/gallery/Gallery';
import Contact from './app/contact/Contact';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './app/about/About';
import NotFound from './app/NotFound';
import Posts from './app/posts/Posts';
import Index from './app/Index';
import './App.css';
import AdminLayout from './app/ams-admin/AdminLayout';
import Admin_Auth_Page from './app/ams-admin/@auth/Admin_Auth_Page';
import Index_Layout from './app/Index_Layout';


function App() {
  return (
    <AlumniProvider>
      <StudentProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={Index_Layout}>
              <Route path='/' Component={Index} />

              {/* Student */}
              <Route path='/auth/student/login' Component={Student_Login} />
              <Route path='/auth/student/register' Component={Student_Register} />
              <Route path='/user/profile/student' Component={Student_Profile} />
              <Route path='/user/profile/student/edit-profile' Component={Student_EditProfile} />

              {/* Alumni */}
              <Route path='/auth/alumni/login' Component={Alumni_Login} />
              <Route path='/auth/alumni/register' Component={Alumni_Register} />
              <Route path='/user/profile/alumni' Component={Alumni_Profile} />
              <Route path='/user/profile/alumni/edit-profile' Component={Alumni_EditProfile} />

              {/* Links */}
              <Route path='/posts' Component={Posts} />
              <Route path='/event' Component={Alumni_Event} />
              <Route path='/about' Component={AboutUs} />
              <Route path='/gallery' Component={Gallery} />
              <Route path='/contact' Component={Contact} />

              {/* Post */}
              <Route path='/posts' Component={PostLayout}>
                <Route path='create-post' Component={Create_Post} />
                <Route path='my-posts' Component={My_Posts} />
                <Route path='my-posts' Component={My_Posts} />
              </Route>
            </Route>

            {/* Admin */}
            <Route path='/ams-admin' Component={AdminLayout}>
              <Route index Component={Admin_Auth_Page} />

            </Route>

            <Route path='*' Component={NotFound} />

          </Routes>
          <Toaster position='top-center' />
        </BrowserRouter>
      </StudentProvider>
    </AlumniProvider>
  )
}


export default App;