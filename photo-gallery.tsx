"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { PhotoCard } from "./components/photo-card"
import { CategoryFilter } from "./components/category-filter"
import { FullscreenModal } from "./components/fullscreen-modal"
import { useGallery } from "./hooks/use-gallery"
import type { Photo, Category } from "./types/gallery"
import { Inter, Poppins } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

// Random images for demonstration
const samplePhotos: Photo[] = [
  {
    id: "1",
    src: "https://github.com/kartik4w/public_assets/blob/main/a.jpg?raw=true",
    alt: "Team collaboration session with laptops and coffee",
    category: "team-vibes",
    title: "Team Brainstorm",
    description: "Our creative team working together on the next big campaign",
  },
  {
    id: "2",
    src: "https://github.com/kartik4w/public_assets/blob/main/b.jpg?raw=true",
    alt: "Creative campaign photoshoot setup",
    category: "creative-campaigns",
    title: "Campaign Shoot",
    description: "Behind the scenes of our latest creative campaign",
  },
  {
    id: "3",
    src: "https://github.com/kartik4w/public_assets/blob/main/c.jpg?raw=true",
    alt: "Team celebrating project completion",
    category: "work-hard-play-hard",
    title: "Victory Celebration",
    description: "Celebrating another successful project launch",
  },
  {
    id: "4",
    src: "https://github.com/kartik4w/public_assets/blob/main/d.jpg?raw=true",
    alt: "Office setup and workspace organization",
    category: "behind-the-scenes",
    title: "Our Creative Space",
    description: "A peek into our inspiring work environment",
  },
  {
    id: "5",
    src: "https://github.com/kartik4w/public_assets/blob/main/e.jpg?raw=true",
    alt: "Team members in casual discussion",
    category: "team-vibes",
    title: "Coffee Break Chat",
    description: "Informal discussions that spark the best ideas",
  },
  {
    id: "6",
    src: "https://github.com/kartik4w/public_assets/blob/main/f.jpg?raw=true",
    alt: "Design mockups and creative materials",
    category: "creative-campaigns",
    title: "Design Process",
    description: "From concept to creation - our design workflow",
  },
  {
    id: "7",
    src: "https://github.com/kartik4w/public_assets/blob/main/g.jpg?raw=true",
    alt: "Team building activity outdoors",
    category: "work-hard-play-hard",
    title: "Team Adventure",
    description: "Building stronger bonds outside the office",
  },
  {
    id: "8",
    src: "https://github.com/kartik4w/public_assets/blob/main/h.jpg?raw=true",
    alt: "Equipment and tools used for content creation",
    category: "behind-the-scenes",
    title: "Our Tools",
    description: "The equipment that brings our visions to life",
  },
  {
    id: "9",
    src: "https://github.com/kartik4w/public_assets/blob/main/i.jpg?raw=true",
    alt: "Team workshop session",
    category: "team-vibes",
    title: "Learning Together",
    description: "Continuous growth through collaborative learning",
  },
  {
    id: "10",
    src: "https://github.com/kartik4w/public_assets/blob/main/j.jpg?raw=true",
    alt: "Campaign launch event",
    category: "creative-campaigns",
    title: "Launch Day",
    description: "The moment we unveil our latest creation",
  },
  {
    id: "11",
    src: "https://github.com/kartik4w/public_assets/blob/main/k.jpg?raw=true",
    alt: "Team game night",
    category: "work-hard-play-hard",
    title: "Game Night",
    description: "Unwinding with friendly competition",
  },
  {
    id: "12",
    src: "https://github.com/kartik4w/public_assets/blob/main/l.jpg?raw=true",
    alt: "Studio equipment setup",
    category: "behind-the-scenes",
    title: "Studio Magic",
    description: "Where the creative magic happens",
  },
]

const categories: Category[] = [
  {
    id: "team-vibes",
    name: "Team Vibes",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "creative-campaigns",
    name: "Creative Campaigns",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "work-hard-play-hard",
    name: "Work Hard Play Hard",
    color: "from-lime-500 to-green-500",
  },
  {
    id: "behind-the-scenes",
    name: "Behind-The-Scenes",
    color: "from-teal-500 to-cyan-500",
  },
]

// Floating animation variants
const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const {
    selectedCategory,
    setSelectedCategory,
    selectedPhoto,
    filteredPhotos,
    openPhoto,
    closePhoto,
    nextPhoto,
    prevPhoto,
  } = useGallery(samplePhotos, categories)

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden ${inter.className}`}
    >
      {/* Animated Background Elements */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-green-200/25 to-lime-200/25 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl" />
      </motion.div>

      {/* Header with Logo */}
      <motion.header
        style={{ y: headerY }}
        className="relative z-10 bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0"
      >
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <motion.div variants={floatingVariants} animate="animate" className="flex items-center space-x-4">
              <div className="">
                <Image
                  src="https://raw.githubusercontent.com/kartik4w/public_assets/refs/heads/main/collegeTips-logo.webp"
                  alt="CollegeTips Logo"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <h1
                className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent ${poppins.className}`}
              >
                CollegeTips
              </h1>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div variants={floatingVariants} animate="animate" className="inline-block">
            <h2
              className={`text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6 ${poppins.className}`}
            >
              Our Visual Journey
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed ${inter.className}`}
          >
            Discover our story through vibrant moments, creative campaigns, and behind-the-scenes magic. Every image
            tells a part of our journey in empowering students and creating meaningful connections.
          </motion.p>
        </motion.div>

        {/* Company Description Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-200/50 shadow-xl"
        >
          <motion.div variants={floatingVariants} animate="animate" className="text-center">
            <h3
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-8 ${poppins.className}`}
            >
              About CollegeTips
            </h3>
            <div
              className={`text-lg md:text-xl text-emerald-800 leading-relaxed space-y-6 max-w-5xl mx-auto ${inter.className}`}
            >
              <p className="font-medium">
                We are India's fastest growing Start-up aiming to make students' life{" "}
                <span className="text-emerald-600 font-semibold">Easy and Happening</span>. So far we've reached and
                influenced the lives of more than <span className="text-green-600 font-bold">25 lakh students</span>{" "}
                from
                <span className="text-emerald-600 font-bold"> 4000+ colleges</span> in{" "}
                <span className="text-green-600 font-bold">1200+ cities</span> with the help of{" "}
                <span className="text-emerald-600 font-bold">200+ members</span> working as a team.
              </p>
              <p>
                Currently, our physical offices are located in{" "}
                <span className="font-semibold text-emerald-700">Mumbai, Delhi, Pune, Indore, and Bhopal</span>. And
                this year we're planning to step into a few more big cities including
                <span className="font-semibold text-green-700">
                  {" "}
                  Kolkata, Bangalore, Hyderabad, Chandigarh, Jaipur, Ahmedabad, Lucknow
                </span>
                , one of the most happening state <span className="font-semibold text-emerald-600">Goa</span> and our
                International offices in
                <span className="font-bold text-green-600"> Dubai, Canada, Sydney & London</span>.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Floating Decorative Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 left-8 w-6 h-6 bg-emerald-400 rounded-full opacity-60"
          style={{ animationDelay: "0.5s" }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-48 right-12 w-4 h-4 bg-green-400 rounded-full opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-64 left-1/4 w-8 h-8 bg-teal-400 rounded-full opacity-30"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                bounce: 0.3,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <PhotoCard photo={photo} onClick={() => openPhoto(photo)} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* View More Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className={`text-3xl font-bold text-emerald-700 mb-8 ${poppins.className}`}>Explore More Content</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="https://www.instagram.com/collegetips.in"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 ${poppins.className}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>View Instagram</span>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@CollegeTips/videos"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 ${poppins.className}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Watch Videos</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <motion.div variants={floatingVariants} animate="animate" className="inline-block">
              <p className="text-3xl text-emerald-500 mb-4">🌱</p>
              <p className={`text-2xl text-emerald-600 font-semibold ${poppins.className}`}>
                No photos found in this category
              </p>
              <p className={`text-emerald-500 mt-2 ${inter.className}`}>
                Try selecting a different category to explore more content
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Footer Section */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center py-12 border-t border-emerald-200"
        >
          <motion.div variants={floatingVariants} animate="animate" className="inline-block">
            <h3 className={`text-2xl font-bold text-emerald-700 mb-4 ${poppins.className}`}>
              Ready to Join Our Journey?
            </h3>
            <p className={`text-emerald-600 mb-6 max-w-2xl mx-auto ${inter.className}`}>
              Follow us on social media to stay updated with our latest adventures, tips, and behind-the-scenes moments.
            </p>
            <motion.a
              href="https://www.collegetips.in/contact/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${poppins.className}`}
            >
              Connect With Us
            </motion.a>
          </motion.div>
        </motion.footer>

        {/* Fullscreen Modal */}
        <FullscreenModal photo={selectedPhoto} onClose={closePhoto} onNext={nextPhoto} onPrev={prevPhoto} />
      </div>
    </div>
  )
}
