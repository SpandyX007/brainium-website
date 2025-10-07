import { Calendar, MapPin, Clock, Users as UsersIcon, Mail, Phone, ArrowLeft, DoorClosed, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import RegistrationModal from '../components/RegistrationModal';
import BackendNotification from '../components/BackendNotification';

interface EventDetailsPageProps {
  onBack: () => void;
  onModalChange?: (isOpen: boolean) => void;
}

export default function EventDetailsPage({ onBack, onModalChange }: EventDetailsPageProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [showBackendNotification, setShowBackendNotification] = useState(false);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  // Featured event data - you can pass this as props later
  const event = {
    title: 'AI Innovation Summit 2025',
    description: 'Join us for our flagship event featuring keynote speakers from leading AI companies, hands-on workshops, and networking opportunities. Explore the latest breakthroughs in machine learning, neural networks, and generative AI.',
    fullDescription: `
      The AI Innovation Summit 2025 is Brainium's premier event bringing together students, professionals, and industry leaders 
      to explore the cutting edge of artificial intelligence and machine learning. This full-day event features:
      
      • Keynote speeches from AI pioneers and industry experts
      • Hands-on workshops on ML frameworks and tools
      • Panel discussions on AI ethics and future trends
      • Networking sessions with recruiters from top tech companies
      • Project showcase and competition with prizes
      • Free lunch and refreshments throughout the day
      
      Whether you're a beginner or an experienced AI enthusiast, this event offers something for everyone. 
      Don't miss this opportunity to learn, network, and showcase your skills!
    `,
    date: '2025-12-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Tech Convention Center, Downtown',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
    maxParticipants: 200,
    registrationDeadline: '2025-12-10', // Registration closes 5 days before event
    // For testing: '2024-01-01' = closed, maxParticipants = 5 = full when 5+ teams register
    status: 'open', // 'open', 'closed', 'full'
  };

  // Check registration status
  const isRegistrationClosed = () => {
    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    return now > deadline;
  };

  const isRegistrationFull = () => {
    return registeredCount >= event.maxParticipants;
  };

  const getRegistrationStatus = () => {
    if (isRegistrationClosed()) return 'closed';
    if (isRegistrationFull()) return 'full';
    return 'open';
  };

  // Fetch participant count
  const fetchParticipantCount = async () => {
    try {
      setIsLoadingCount(true);
      
      if (!GOOGLE_SCRIPT_URL) {
        setShowBackendNotification(true);
        setRegisteredCount(5);
        setIsLoadingCount(false);
        return;
      }

      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      if (data.success) {
        setRegisteredCount(data.participantCount);
      }
      setIsLoadingCount(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setShowBackendNotification(true);
      setRegisteredCount(5);
      setIsLoadingCount(false);
    }
  };

  // Fetch participant count on mount and every 30 seconds
  useEffect(() => {
    fetchParticipantCount();
    const interval = setInterval(fetchParticipantCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle modal open
  const handleModalOpen = () => {
    setIsRegistrationModalOpen(true);
    onModalChange?.(true);
  };

  // Refresh count when modal closes
  const handleModalClose = () => {
    setIsRegistrationModalOpen(false);
    onModalChange?.(false);
    setTimeout(fetchParticipantCount, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Events</span>
        </button>

        {/* Hero Image */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 group">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-600/80 backdrop-blur-sm text-white text-sm font-semibold mb-4">
              Featured Event
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold text-white mb-6">Event Details</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white text-lg font-semibold">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="text-white text-lg font-semibold">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white text-lg font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <UsersIcon className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Capacity</p>
                    <p className="text-white text-lg font-semibold">
                      {event.maxParticipants} teams
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-purple-500/30 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">About This Event</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {event.fullDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/50 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-4">Register Now</h3>
              <p className="text-gray-300 mb-6">
                Secure your spot at this amazing event. Registration is free!
              </p>
                            <div className="bg-black/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Team Spots Available</span>
                  <span className="text-purple-400 font-bold">
                    {event.maxParticipants - registeredCount}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(registeredCount / event.maxParticipants) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-400">
                    {registeredCount} / {event.maxParticipants} teams registered
                  </span>
                </div>
              </div>

              {isLoadingCount ? (
                <div className="w-full px-8 py-4 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white rounded-xl text-center border border-purple-500/30">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="font-semibold">Loading Registration Status...</span>
                  </div>
                </div>
              ) : getRegistrationStatus() === 'open' ? (
                <button
                  onClick={handleModalOpen}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                >
                  Register for Event
                </button>
              ) : getRegistrationStatus() === 'full' ? (
                <div className="w-full px-8 py-8 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-2xl text-center border-2 border-red-500 shadow-2xl shadow-red-500/40">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <DoorClosed className="w-12 h-12 text-red-200 animate-pulse" />
                    <span className="text-3xl font-black tracking-wide">REGISTRATION FULL</span>
                  </div>
                  <p className="text-red-100 text-2xl font-bold mb-3">🚪 All Team Spots Have Been Filled</p>
                  <p className="text-red-200 text-lg mb-2">Sorry, we've reached maximum capacity!</p>
                  <p className="text-red-300 text-sm">👇 Check "Need Help?" section below for contact details</p>
                </div>
              ) : (
                <div className="w-full px-8 py-8 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-2xl text-center border-2 border-gray-600 shadow-2xl shadow-gray-500/40">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <RotateCcw className="w-12 h-12 text-gray-300 animate-spin" style={{animationDuration: '3s'}} />
                    <span className="text-3xl font-black tracking-wide">REGISTRATION CLOSED</span>
                  </div>
                  <p className="text-gray-100 text-2xl font-bold mb-3">⏰ Registration Period Has Ended</p>
                  <p className="text-gray-300 text-lg mb-2">
                    Registration closed on {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
                      month: 'long', day: 'numeric', year: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-400 text-sm">👇 Check "Need Help?" section below for contact details</p>
                </div>
              )}
            </div>

            {/* Webmaster Contact Card */}
            <div className="bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">Contact our webmasters for any queries:</p>
              
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-purple-300 font-semibold mb-2">John Doe</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:john@brainium.com" className="hover:text-purple-400 transition-colors">
                        john@brainium.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      <a href="tel:+15551234567" className="hover:text-purple-400 transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-purple-300 font-semibold mb-2">Jane Smith</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:jane@brainium.com" className="hover:text-purple-400 transition-colors">
                        jane@brainium.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      <a href="tel:+15559876543" className="hover:text-purple-400 transition-colors">
                        +1 (555) 987-6543
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleModalClose}
        eventTitle={event.title}
      />
      
      <BackendNotification 
        show={showBackendNotification} 
        onClose={() => setShowBackendNotification(false)} 
      />
    </div>
  );
}
