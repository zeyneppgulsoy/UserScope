import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/navbar';

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default RootLayout;