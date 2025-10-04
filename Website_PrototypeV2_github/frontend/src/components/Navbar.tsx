// import { useState, useEffect } from 'react';
// import { Menu, X, Brain } from 'lucide-react';

// interface NavbarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
// }

// export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'about', label: 'About Us' },
//     { id: 'events', label: 'Events' },
//     { id: 'gallery', label: 'Gallery' },
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           isScrolled ? 'py-4' : 'py-6'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div
//             className={`hidden md:flex items-center justify-center gap-2 mx-auto w-fit px-8 py-4 rounded-full backdrop-blur-xl border transition-all duration-500 ${
//               isScrolled
//                 ? 'bg-black/60 border-purple-500/30 shadow-lg shadow-purple-500/20'
//                 : 'bg-black/40 border-purple-500/20'
//             }`}
//           >
//             <button
//               onClick={() => onNavigate('home')}
//               className="flex items-center gap-2 mr-4 group"
//             >
//               <Brain className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
//               <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
//                 BR[AI]NIUM
//               </span>
//             </button>

//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => onNavigate(item.id)}
//                 className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
//                   currentPage === item.id
//                     ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
//                     : 'text-gray-300 hover:text-white hover:bg-white/10'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           <div className="md:hidden flex items-center justify-between">
//             <button
//               onClick={() => onNavigate('home')}
//               className="flex items-center gap-2"
//             >
//               <Brain className="w-6 h-6 text-purple-400" />
//               <span className="text-xl font-bold text-white">BR[AI]NIUM</span>
//             </button>

//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2 rounded-lg bg-black/60 border border-purple-500/30 text-white hover:bg-purple-600/20 transition-colors"
//             >
//               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div
//         className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
//           isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-black/80 backdrop-blur-xl"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//         <div className="absolute top-24 left-4 right-4">
//           <div className="bg-black/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/20">
//             <div className="flex flex-col gap-3">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     onNavigate(item.id);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className={`px-6 py-4 rounded-2xl font-medium text-left transition-all duration-300 ${
//                     currentPage === item.id
//                       ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
//                       : 'text-gray-300 hover:text-white hover:bg-white/10'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`hidden md:flex items-center justify-center gap-2 mx-auto w-fit px-8 py-4 rounded-full backdrop-blur-xl border transition-all duration-500 ${
              isScrolled
                ? 'bg-black/60 border-purple-500/30 shadow-lg shadow-purple-500/20'
                : 'bg-black/40 border-purple-500/20'
            }`}
          >
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mr-4 group"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full p-0.5 group-hover:from-cyan-400 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  <div className="w-full h-full bg-black rounded-full p-0.5">
                    <img 
                      src="brainiumlogo.jpeg" 
                      alt="Brainium Logo"
                      className="w-full h-full object-cover rounded-full shadow-lg shadow-purple-500/50 group-hover:shadow-cyan-400/50 transition-all duration-300"
                    />
                  </div>
                </div>
                {/* Small glow effect */}
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm group-hover:bg-cyan-400/30 transition-all duration-300" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                BR[AI]NIUM
              </span>
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full p-0.5">
                  <div className="w-full h-full bg-black rounded-full p-0.5">
                    <img 
                      src="brainiumlogo.jpeg" 
                      alt="Brainium Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-white">BR[AI]NIUM</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-black/60 border border-purple-500/30 text-white hover:bg-purple-600/20 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-24 left-4 right-4">
          <div className="bg-black/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/20">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-6 py-4 rounded-2xl font-medium text-left transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}