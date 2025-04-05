import { Outlet } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import ScrollToTop from '../utils/ScrollToTop';

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
