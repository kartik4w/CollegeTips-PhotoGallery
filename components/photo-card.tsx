"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Photo } from "../types/gallery"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

interface PhotoCardProps {
  photo: Photo
  onClick: () => void
  index: number
}

export function PhotoCard({ photo, onClick, index }: PhotoCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100/50 to-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer backdrop-blur-sm border border-emerald-200/30"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${photo.title || photo.alt} in fullscreen`}
      whileHover={{
        y: -8,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="aspect-square relative overflow-hidden">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-green-400 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.3,
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {photo.title && (
            <motion.h3
              className={`font-bold text-lg mb-1 drop-shadow-lg ${inter.className}`}
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {photo.title}
            </motion.h3>
          )}
          {photo.description && (
            <motion.p
              className={`text-sm text-emerald-100 drop-shadow-md ${inter.className}`}
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {photo.description}
            </motion.p>
          )}
        </motion.div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}
