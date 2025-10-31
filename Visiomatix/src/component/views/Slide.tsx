import React from 'react'
import { motion } from 'framer-motion'
import { pages } from './pages.tsx'
import './slides.css'
interface SlideProps {
  pageIndex: number
}

const Slide: React.FC<SlideProps> = ({ pageIndex }) => {
  const page = pages[pageIndex]
  const PageComponent = page.component

  return (
    <motion.div
      style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // ease-in-out cubic-bezier
      }}
    >
      <PageComponent classPrefix={page.classPrefix} />
    </motion.div>
  )
}

export default Slide