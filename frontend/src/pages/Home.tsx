// import { Brain, Sparkles, Users, Calendar } from 'lucide-react';

// interface HomeProps {
//   onNavigate: (page: string) => void;
// }

// export default function Home({ onNavigate }: HomeProps) {
//   return (
//     <div className="min-h-screen pt-32 pb-20 px-4">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-16 animate-fade-in">
//           <div className="inline-block mb-8 relative">
//             <div className="absolute inset-0 blur-3xl bg-purple-600/30 rounded-full animate-pulse" />
//             {/* <Brain className="w-24 h-24 md:w-32 md:h-32 text-purple-400 relative animate-float drop-shadow-2xl" /> */}
//             <img src="brainiumlogo.jpeg"></img>
//           </div>

//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
//             <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//               BR[AI]NIUM
//             </span>
//           </h1>

//           <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay-1">
//             Empowering minds through artificial intelligence. Join our community of innovators,
//             creators, and tech enthusiasts as we explore the future of AI together.
//           </p>

//           <p className="text-lg text-purple-300 mb-12 animate-slide-up-delay-2">
//             Building tomorrow's AI solutions, today.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-3">
//             <button
//               onClick={() => onNavigate('about')}
//               className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 Meet the Team
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>

//             <button
//               onClick={() => onNavigate('events')}
//               className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-purple-500/50 hover:bg-purple-600/20 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
//             >
//               <span className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5" />
//                 Explore Events
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 mt-24">
//           {[
//             {
//               icon: Brain,
//               title: 'Innovation',
//               description: 'Pushing boundaries with cutting-edge AI research and projects',
//             },
//             {
//               icon: Users,
//               title: 'Community',
//               description: 'A diverse group of passionate AI enthusiasts and developers',
//             },
//             {
//               icon: Sparkles,
//               title: 'Learning',
//               description: 'Workshops, hackathons, and hands-on AI learning experiences',
//             },
//           ].map((feature, index) => (
//             <div
//               key={index}
//               className="group relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 animate-fade-in-up"
//               style={{ animationDelay: `${index * 0.2}s` }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-3xl transition-all duration-500" />
//               <div className="relative">
//                 <div className="inline-block p-4 rounded-2xl bg-purple-600/20 mb-6 group-hover:bg-purple-600/30 transition-colors duration-300">
//                   <feature.icon className="w-8 h-8 text-purple-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





import { Brain, Sparkles, Users, Calendar } from 'lucide-react';
import brainiumLogo from '../assets/brainiumlogo.jpeg';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-8 relative">
            {/* Cosmic Glow Effects */}
            <div className="absolute inset-0 blur-3xl bg-purple-600/30 rounded-full animate-pulse" />
            <div className="absolute inset-0 blur-2xl bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Orbital Ring */}
            {/* <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 border-2 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} /> */}

            {/* Logo Container with Cosmic Styling */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full p-1 animate-float">
                <div className="w-full h-full bg-black rounded-full p-1">
                  <img
                    src={brainiumLogo}
                    alt="Brainium Logo"
                    className="w-full h-full object-cover rounded-full border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50 hover:shadow-cyan-400/50 transition-all duration-500 hover:scale-110"
                  />
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-0 left-0 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              BR[AI]NIUM
            </span>
          </h1> */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              BR
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  [AI]
                </span>
                {/* Particle Effects */}
                <span className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75" />
                <span className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
                <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }} />
              </span>
              NIUM
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay-1">
            Empowering minds through artificial intelligence. Join our community of innovators,
            creators, and tech enthusiasts as we explore the future of AI together.
          </p>

          <p className="text-lg text-purple-300 mb-12 animate-slide-up-delay-2">
            Building tomorrow's AI solutions, today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-3">
            <button
              onClick={() => onNavigate('about')}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Meet the Team
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => onNavigate('events')}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-purple-500/50 hover:bg-purple-600/20 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Explore Events
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              icon: Brain,
              title: 'Innovation',
              description: 'Pushing boundaries with cutting-edge AI research and projects',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'A diverse group of passionate AI enthusiasts and developers',
            },
            {
              icon: Sparkles,
              title: 'Learning',
              description: 'Workshops, hackathons, and hands-on AI learning experiences',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-3xl transition-all duration-500" />
              <div className="relative">
                <div className="inline-block p-4 rounded-2xl bg-purple-600/20 mb-6 group-hover:bg-purple-600/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}