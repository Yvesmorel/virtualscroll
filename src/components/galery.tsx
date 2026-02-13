import React, { memo, useRef, useState } from "react";
import { Image } from "antd";
import { motion } from "framer-motion";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { ItemData } from "../deifinitions";

import { useGridContainer } from "../hooks/useGridContainer";
import { useContainerScroll } from "../hooks/useContainerScroll";
import { useData } from "../hooks/useData";
import { GRID_GAP } from "../utils";
import { BUFFER_SIZE, DATA_LENGTH } from "../data";
import {
  useMainContainerContent,
} from "../hooks/useMainContainerItemContent";

// --- Types ---

// --- Animation Variants (Framer Motion) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ElegantGallery = () => {

  //je vais faire le typage apres j'ai annulé typscript avec any pour le moment
  const mainContaierRef = useRef<any>(undefined);
  const gridContaineRef = useRef<any>(undefined);
  //----------------------------------

  const { cardCompH, itemsByLine } = useGridContainer(gridContaineRef);
  const { sliceIndex } = useContainerScroll(mainContaierRef, cardCompH);
  const { windowLines } = useMainContainerContent(mainContaierRef, cardCompH);
  const { main } = useData(sliceIndex, itemsByLine, windowLines);

  return (
    <div
      className="h-screen w-screnn bg-black  px-4 sm:px-6 lg:px-8 overflow-auto overflow-x-hidden relative "
      ref={mainContaierRef}
    >
      <div
        className="absolute  left-0 flex flex-col w-full"
        style={{
          height: `${(DATA_LENGTH / itemsByLine) * (cardCompH + GRID_GAP)}px`,
          //(DATA_LENGTH / itemsByLine) * (cardCompH + GRID_GAP) pour caluler la hauteur totale du container de la grid donc du scroll
        }}
      >
        {/* Grid Container */}
        <motion.div
          style={{
            position: 'absolute',
            top: `${(cardCompH + GRID_GAP) * Math.max(sliceIndex - BUFFER_SIZE, 0)}px`,
          }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[0px] px-auto h-auto grid-container`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={gridContaineRef}
        >
          {main.map((item, i) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- Sub-Component: Individual Card ---
const GalleryCard: React.FC<{
  item: ItemData;
}> = memo(({ item }) => {
  // Formatage de la date
  const date = new Date(item.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      // variants={cardVariants}
      // whileHover={{ y: -8 }}
      className="group bg-white  overflow-hidden shadow-md  transition-all duration-300  flex flex-col h-full element "
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
  
    </motion.div>
  );
});

export default ElegantGallery;
