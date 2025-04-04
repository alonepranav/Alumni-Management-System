import Student_EditProfile from './app/user/profile/student/edit-profile/Student_EditProfile';
import Alumni_EditProfile from './app/user/profile/alumni/edit-profile/Alumni_EditProfile';
import Admin_Gallery_Add from './app/ams-admin/@auth/gallery/add/Admin_Gallery_Add';
import Student_Profile from './app/user/profile/student/Student_Profile';
import Admin_Gallery from './app/ams-admin/@auth/gallery/Admin_Gallery';
import Alumni_Profile from './app/user/profile/alumni/Alumni_Profile';
import Admin_Auth_Page from './app/ams-admin/@auth/Admin_Auth_Page';
import Admin_Events from './app/ams-admin/@auth/event/Admin_Event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEvent from './app/alumni-event/add-event/Add_Event';
import Create_Post from './app/posts/create-post/Create_Post';
import Alumni_Event from './app/alumni-event/Alumni_Event';
import AdminLayout from './app/ams-admin/AdminLayout';
import Our_Alumni from './app/our-alumni/Our_Alumni';
import My_Posts from './app/posts/my-posts/My_Posts';
import Contact from './app/(info)/contact/Contact';
import PostLayout from './app/posts/PostLayout';
import AboutUs from './app/(info)/about/About';
import Index_Layout from './app/Index_Layout';
import Gallery from './app/gallery/Gallery';
import { Toaster } from 'react-hot-toast';
import Alumni from './app/alumni/Alumni';
import Auth_Layout from './Auth_Layout';
import NotFound from './app/NotFound';
import Posts from './app/posts/Posts';
import Index from './app/Index';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Index_Layout}>
          {/* Home = "/" */}
          <Route path='/' Component={Index} />

          {/* Auth   */}
          <Route Component={Auth_Layout}>
            <Route path='/user/profile/student' Component={Student_Profile} />
            <Route path='/user/profile/student/edit-profile' Component={Student_EditProfile} />

            <Route path='/user/profile/alumni' Component={Alumni_Profile} />
            <Route path='/user/profile/alumni/edit-profile' Component={Alumni_EditProfile} />
          </Route>

          {/* Info Pages */}
          <Route path='/about' Component={AboutUs} />
          <Route path='/contact' Component={Contact} />
          <Route path='/gallery' Component={Gallery} />


          <Route>
            <Route path='alumni' Component={Alumni} />
            <Route path='alumni/profile/:id' Component={Alumni_Profile} />
          </Route>



          <Route path='/our-alumni' Component={Our_Alumni} />
          <Route path='/posts' Component={Posts} />
          <Route path='/event' Component={Alumni_Event} />

          {/* Post */}
          <Route path='/posts' Component={PostLayout}>
            <Route path='create-post' Component={Create_Post} />
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
  )
}


export default App;