import { Outlet } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
