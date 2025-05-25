"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Category } from "../types/gallery"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = [{ id: "all", name: "All Photos", color: "from-emerald-500 to-green-500" }, ...categories]

  return (
    <motion.div
      className="flex flex-wrap gap-4 justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {allCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 ${poppins.className}
              ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent hover:shadow-xl`
                  : "bg-white/70 backdrop-blur-sm hover:bg-white border-emerald-200 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800"
              }
            `}
          >
            <span className="relative z-10">{category.name}</span>

            {selectedCategory === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Floating particles */}
            {selectedCategory === category.id && (
              <>
                <motion.div
                  className="absolute top-1 right-2 w-1 h-1 bg-white/60 rounded-full"
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white/40 rounded-full"
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                />
              </>
            )}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
