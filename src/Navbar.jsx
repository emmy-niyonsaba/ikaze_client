
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import rpLogo from './assets/images/RP_logo.jpeg';
import Footer from './Footer';
import { useAuthStore } from './store/authStore';
import ProfileDropdown from './components/ProfileDropdown';
import useUserStore from './store/userStore';
const Navbar = () => {

  const { logout, token } = useAuthStore();
  const { user, isLoading, fetchUser } = useUserStore();

  useEffect(() => {
    // Only fetch user info if we have a token
    if (token) {
      // fetchUser();
    }
  }, [token]);

  return (
    <>
      <div className=' flex justify-around items-center m-4 p-3 text-blue-700 font-bold'>
            <div>
              <img src={rpLogo} alt="" className=' w-30' />
            </div>

        <div>


          <ul className=' flex gap-6'>

          <li> <Link to="/">Home</Link></li>
          <li> <Link to="/about">About</Link></li>
          <li> <Link to="/"> Expore More</Link></li>
          

          </ul>
        </div>
      {
        !user && !isLoading ? (isLoading ? "..." : <Link to="/login">Login</Link>) : <ProfileDropdown user={user} onLogout={logout}/>
      }
      </div>
      <Outlet/>
      <Footer/>

    </>
  )
}

export default Navbar
