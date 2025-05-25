"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Photo } from "../types/gallery"

import { Inter, Poppins } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
})

interface FullscreenModalProps {
  photo: Photo | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function FullscreenModal({ photo, onClose, onNext, onPrev }: FullscreenModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrev()
          break
        case "ArrowRight":
          onNext()
          break
      }
    }

    if (photo) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [photo, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-900/95 to-green-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-contain rounded-2xl"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Close button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 bg-emerald-800/50 hover:bg-emerald-700/70 text-white rounded-full backdrop-blur-sm border border-emerald-600/30"
                aria-label="Close fullscreen view"
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Navigation buttons */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-800/50 hover:bg-emerald-700/70 text-white rounded-full backdrop-blur-sm border border-emerald-600/30"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-800/50 hover:bg-emerald-700/70 text-white rounded-full backdrop-blur-sm border border-emerald-600/30"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Photo info */}
            {(photo.title || photo.description) && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-4 left-4 right-4 bg-emerald-900/80 backdrop-blur-md rounded-2xl p-6 text-white border border-emerald-700/30"
              >
                {photo.title && (
                  <motion.h2
                    className={`text-2xl font-bold mb-2 text-emerald-100 ${poppins.className}`}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {photo.title}
                  </motion.h2>
                )}
                {photo.description && (
                  <motion.p
                    className={`text-emerald-200 ${inter.className}`}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {photo.description}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
