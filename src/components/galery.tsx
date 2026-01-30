import React from "react";
import { Image } from "antd";
import { motion } from "framer-motion";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { GalleryProps, ItemData } from "../deifinitions";

// --- Types ---

// --- Animation Variants (Framer Motion) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ElegantGallery: React.FC<GalleryProps> = ({ items }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- Sub-Component: Individual Card ---
const GalleryCard: React.FC<{ item: ItemData }> = ({ item }) => {
  // Formatage de la date
  const date = new Date(item.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Zone Image (Ant Design) */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 pointer-events-none" />

        <Image
          src={item.imageUrl}
          alt={item.title}
          // Tailwind classes sur le wrapper AntD pour forcer le remplissage
          rootClassName="w-full h-full flex items-center justify-center"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
          preview={{
            mask: (
              <div className="text-white text-sm font-medium flex items-center gap-2">
                <ArrowUpRight size={16} /> Zoomer
              </div>
            ),
          }}
          placeholder={
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-xs">Chargement...</span>
            </div>
          }
        />

        {/* Badge Flottant */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-indigo-600 shadow-sm">
            #{item.id}
          </span>
        </div>
      </div>

      {/* Zone Contenu (Tailwind) */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <User size={14} className="text-indigo-500" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {item.uuid.split("-")[1]}
          </span>
        </div>

        {/* <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3> */}

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {item.description}
        </p>

        {/* Footer de la carte */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar size={14} className="mr-1.5" />
            {date}
          </div>
          <button className="text-indigo-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            Voir détails &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ElegantGallery;
