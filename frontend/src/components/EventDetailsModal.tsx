import { X, Calendar, MapPin, Clock, Info } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image: string;
}

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  if (!isOpen || !event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-950/95 to-black/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-white transition-colors p-2 hover:bg-purple-500/20 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-72 overflow-hidden rounded-t-3xl">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-600/30 backdrop-blur-sm text-purple-300 text-sm font-semibold mb-3">
              <Info className="w-4 h-4 inline mr-2" />
              Event Details
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {event.title}
            </h2>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-300">About This Event</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>

          <div className="border-t border-purple-500/20 pt-6 space-y-4">
            <h3 className="text-xl font-bold text-purple-300">Event Information</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-purple-500/20">
                <Calendar className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date</p>
                  <p className="text-white font-semibold text-lg">{formatDate(event.date)}</p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-purple-500/20">
                  <Clock className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Time</p>
                    <p className="text-white font-semibold text-lg">{event.time}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-purple-500/20">
                <MapPin className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white font-semibold text-lg">{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
