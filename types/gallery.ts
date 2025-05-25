export interface Photo {
  id: string
  src: string
  alt: string
  category: string
  title?: string
  description?: string
}

export interface Category {
  id: string
  name: string
  color: string
}
