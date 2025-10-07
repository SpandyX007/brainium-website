import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const teamData = {
  'Tech Team': [
    { name: 'Alex Chen', role: 'Lead Developer', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sarah Johnson', role: 'ML Engineer', photo: 'https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Raj Patel', role: 'AI Researcher', photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Emma Wilson', role: 'Backend Developer', photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'Marketing Team': [
    { name: 'Michael Brown', role: 'Marketing Lead', photo: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Lisa Anderson', role: 'Social Media Manager', photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'David Lee', role: 'Content Strategist', photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'Design Team': [
    { name: 'Sophie Turner', role: 'UI/UX Lead', photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'James Martinez', role: 'Graphic Designer', photo: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Olivia Garcia', role: 'Brand Designer', photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'Sponsor Team': [
    { name: 'Robert Taylor', role: 'Sponsorship Director', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Amanda White', role: 'Partnership Manager', photo: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
};

export default function About() {
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof teamData>('Tech Team');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTeamMembers = teamData[selectedTeam];
  const membersPerView = window.innerWidth >= 768 ? 3 : 1;
  const maxIndex = Math.max(0, currentTeamMembers.length - membersPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTeamChange = (team: keyof typeof teamData) => {
    setSelectedTeam(team);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Users className="w-16 h-16 text-purple-400 mx-auto animate-float" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds driving innovation at BR[AI]NIUM. Our diverse team brings together
            expertise in AI, design, marketing, and community building.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(teamData) as Array<keyof typeof teamData>).map((team) => (
            <button
              key={team}
              onClick={() => handleTeamChange(team)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedTeam === team
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-purple-500/30'
              }`}
            >
              {team}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / membersPerView)}%)`,
              }}
            >
              {currentTeamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / membersPerView}%` }}
                >
                  <div className="group relative bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-purple-300 font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentTeamMembers.length > membersPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-purple-600/80 hover:bg-purple-600 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-purple-600/80 hover:bg-purple-600 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-purple-500' : 'w-2 bg-purple-500/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
