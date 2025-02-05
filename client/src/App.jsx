import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
