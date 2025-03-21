import Student_EditProfile from './app/user/profile/student/edit-profile/Student_EditProfile';
import Alumni_EditProfile from './app/user/profile/alumni/edit-profile/Alumni_EditProfile';
import Admin_Gallery_Add from './app/ams-admin/@auth/gallery/add/Admin_Gallery_Add';
import Student_Register from './app/auth/student/register/Student_Register';
import Alumni_Register from './app/auth/alumni/register/Alumni_Register';
import Student_Profile from './app/user/profile/student/Student_Profile';
import Admin_Gallery from './app/ams-admin/@auth/gallery/Admin_Gallery';
import Alumni_Profile from './app/user/profile/alumni/Alumni_Profile';
import Admin_Auth_Page from './app/ams-admin/@auth/Admin_Auth_Page';
import Student_Login from './app/auth/student/login/Student_Login';
import Alumni_Login from './app/auth/alumni/login/Alumni_Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create_Post from './app/posts/create-post/Create_Post';
import Alumni_Event from './app/alumni-event/Alumni_Event';
import StudentProvider from './context/StudentContext';
import AdminLayout from './app/ams-admin/AdminLayout';
import AlumniProvider from './context/AlumniContext';
import My_Posts from './app/posts/my-posts/My_Posts';
import PostLayout from './app/posts/PostLayout';
import Index_Layout from './app/Index_Layout';
import Gallery from './app/gallery/Gallery';
import Contact from './app/contact/Contact';
import { Toaster } from 'react-hot-toast';
import AboutUs from './app/about/About';
import NotFound from './app/NotFound';
import Posts from './app/posts/Posts';
import Index from './app/Index';
import './App.css';
import AddEvent from './app/alumni-event/add-event/Add_Event';
import Admin_Events from './app/ams-admin/@auth/event/Admin_Event';


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
              <Route path='/about' Component={AboutUs} />
              <Route path='/gallery' Component={Gallery} />
              <Route path='/contact' Component={Contact} />

              <Route path='/event' Component={Alumni_Event} />

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


              <Route path='event' Component={Admin_Events} />
              <Route path='event/add-event' Component={AddEvent} />
              <Route path='gallery' Component={Admin_Gallery} />
              <Route path='gallery/add' Component={Admin_Gallery_Add} />
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