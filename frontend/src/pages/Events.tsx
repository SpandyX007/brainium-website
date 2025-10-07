import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';
import EventDetailsModal from '../components/EventDetailsModal';

const eventsData = {
  featured: {
    title: 'AI Innovation Summit 2025',
    description: 'Join us for our flagship event featuring keynote speakers from leading AI companies, hands-on workshops, and networking opportunities. Explore the latest breakthroughs in machine learning, neural networks, and generative AI.',
    date: '2025-12-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Tech Convention Center, Downtown',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'upcoming',
  },
  upcoming: [
    {
      title: 'Machine Learning Workshop',
      description: 'Hands-on workshop covering fundamentals of ML algorithms and practical implementations.',
      date: '2025-11-10',
      location: 'University Lab 203',
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'upcoming',
    },
    {
      title: 'AI Ethics Panel Discussion',
      description: 'Expert panel discussing the ethical implications and responsible development of AI systems.',
      date: '2025-11-22',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'upcoming',
    },
    {
      title: 'Hackathon: Build with GPT',
      description: '24-hour hackathon focused on building innovative applications using GPT models.',
      date: '2025-12-01',
      location: 'Innovation Hub',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'upcoming',
    },
  ],
  past: [
    {
      title: 'Deep Learning Fundamentals',
      description: 'Comprehensive workshop on neural networks and deep learning architectures.',
      date: '2025-09-15',
      location: 'Computer Science Building',
      image: 'https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'past',
    },
    {
      title: 'AI Career Fair',
      description: 'Connect with top tech companies looking for AI talent.',
      date: '2025-08-20',
      location: 'Campus Center',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'past',
    },
    {
      title: 'Computer Vision Workshop',
      description: 'Learn about image processing, object detection, and face recognition.',
      date: '2025-07-10',
      location: 'Engineering Lab',
      image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'past',
    },
  ],
};

export default function Events() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [selectedEventDetails, setSelectedEventDetails] = useState<typeof eventsData.upcoming[0] | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const openRegistrationModal = (eventTitle: string) => {
    setSelectedEventTitle(eventTitle);
    setIsRegistrationModalOpen(true);
  };

  const openDetailsModal = (event: typeof eventsData.upcoming[0]) => {
    setSelectedEventDetails(event);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Calendar className="w-16 h-16 text-purple-400 mx-auto animate-float" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover workshops, hackathons, and networking opportunities that push the boundaries
            of AI innovation.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Event</h2>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={eventsData.featured.image}
                  alt={eventsData.featured.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block px-4 py-2 rounded-full bg-purple-600/30 text-purple-300 text-sm font-semibold mb-4 w-fit">
                  Featured
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {eventsData.featured.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {eventsData.featured.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>{formatDate(eventsData.featured.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>{eventsData.featured.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>{eventsData.featured.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => openRegistrationModal(eventsData.featured.title)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 w-fit"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.upcoming.map((event, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openDetailsModal(event)}
                    className="w-full px-6 py-3 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-500"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Past Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.past.map((event, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-purple-900/10 to-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        eventTitle={selectedEventTitle}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEventDetails}
      />
    </div>
  );
}
