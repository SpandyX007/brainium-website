import { useState } from 'react';
import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'events':
        return <Events />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CosmicBackground />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="relative z-10">
        <div className="page-transition">{renderPage()}</div>
      </main>
    </div>
  );
}

export default App;
