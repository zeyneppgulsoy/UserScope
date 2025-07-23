import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/Navbar';

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default RootLayout;