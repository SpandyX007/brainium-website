import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const galleryData = [
  {
    event: 'AI Innovation Summit 2024',
    images: [
      { url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Opening ceremony keynote' },
      { url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Networking session' },
      { url: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Workshop in progress' },
      { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Panel discussion' },
    ],
  },
  {
    event: 'Machine Learning Workshop',
    images: [
      { url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Hands-on coding session' },
      { url: 'https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Team collaboration' },
      { url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Project presentations' },
    ],
  },
  {
    event: 'Computer Vision Hackathon',
    images: [
      { url: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Hackathon kickoff' },
      { url: 'https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Late night coding' },
      { url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Final demos' },
      { url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Award ceremony' },
      { url: 'https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Team photo' },
    ],
  },
  {
    event: 'AI Ethics Discussion',
    images: [
      { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Expert panel' },
      { url: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Q&A session' },
    ],
  },
];

export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEventImages, setCurrentEventImages] = useState<typeof galleryData[0]['images']>([]);

  const openLightbox = (eventIndex: number, imageIndex: number) => {
    setCurrentEventImages(galleryData[eventIndex].images);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentEventImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentEventImages.length) % currentEventImages.length);
  };

  const filteredGallery = selectedEvent
    ? galleryData.filter((event) => event.event === selectedEvent)
    : galleryData;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <ImageIcon className="w-16 h-16 text-purple-400 mx-auto animate-float" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore moments from our events, workshops, and community gatherings.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedEvent(null)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedEvent === null
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-purple-500/30'
              }`}
          >
            All Events
          </button>
          {galleryData.map((event) => (
            <button
              key={event.event}
              onClick={() => setSelectedEvent(event.event)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedEvent === event.event
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-purple-500/30'
                }`}
            >
              {event.event}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {filteredGallery.map((event, eventIndex) => (
            <div key={event.event}>
              <h2 className="text-3xl font-bold text-white mb-6">{event.event}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    onClick={() => openLightbox(galleryData.indexOf(event), imageIndex)}
                    className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br from-purple-900/20 to-black/40 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={currentEventImages[currentImageIndex]?.url}
              alt={currentEventImages[currentImageIndex]?.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white text-xl font-medium mb-2">
                {currentEventImages[currentImageIndex]?.caption}
              </p>
              <p className="text-gray-400">
                {currentImageIndex + 1} / {currentEventImages.length}
              </p>
            </div>
          </div>
        </div>
      )} */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          {/* Close button with higher z-index and improved positioning */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-white border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:scale-110 z-[60] backdrop-blur-sm"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-[55] backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-[55] backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image container */}
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center relative z-10">
            <img
              src={currentEventImages[currentImageIndex]?.url}
              alt={currentEventImages[currentImageIndex]?.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white text-xl font-medium mb-2">
                {currentEventImages[currentImageIndex]?.caption}
              </p>
              <p className="text-gray-400">
                {currentImageIndex + 1} / {currentEventImages.length}
              </p>
            </div>
          </div>

          {/* Additional close functionality - click outside to close */}
          <div
            className="absolute inset-0 z-0"
            onClick={closeLightbox}
            aria-label="Click to close lightbox"
          />
        </div>
      )}
    </div>
  );
}
