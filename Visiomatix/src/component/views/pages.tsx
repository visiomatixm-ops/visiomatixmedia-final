import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import './slides.css'

interface PageProps {
  classPrefix: string
  title: string
  imageSrc: string
  imageAlt: string
  serviceTitle: string
  serviceDescription: string
  hasAnimation?: boolean
}

interface ServicePageProps {
  classPrefix: string
}

const ServicePage: React.FC<PageProps> = ({
  classPrefix,
  title,
  imageSrc,
  imageAlt,
  serviceTitle,
  serviceDescription,
  hasAnimation = false
}) => (
  <div className={`${classPrefix}-container1`}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className={`${classPrefix}${classPrefix}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`${classPrefix}-img`}
      />
      {hasAnimation ? (
        <motion.div
          className={`${classPrefix}text`}
          style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", width:"100%"}}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          <motion.div
            className={`${classPrefix}tittle`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }}
          >
            <span className={`${classPrefix}-text1`}>{serviceTitle}</span>
          </motion.div>
          <motion.div
            className={`${classPrefix}tittletext`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6
            }}
          >
            <span className={`${classPrefix}-text2`}>{serviceDescription}</span>
          </motion.div>
        </motion.div>
      ) : (
        <div className={`${classPrefix}text`}>
          <div className={`${classPrefix}tittle`}>
            <span className={`${classPrefix}-text1`}>{serviceTitle}</span>
          </div>
          <div className={`${classPrefix}tittletext`}>
            <span className={`${classPrefix}-text2`}>{serviceDescription}</span>
          </div>
        </div>
      )}
    </div>
  </div>
)

const Page1: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="UI UX Design"
    imageSrc="/carousel/img2826-55ip-1600w.png"
    imageAlt="img2826"
    serviceTitle="UI UX Design"
    serviceDescription="Our design specialists create intuitive, user-centered interfaces that elevate every digital interaction. Leveraging industry-leading tools like Figma and Adobe XD, we craft seamless user journeys, modern layouts, and visually balanced experiences. Whether it’s a website, mobile app, or product dashboard, we ensure every design not only looks stunning but feels effortless to use."
    hasAnimation={true}
  />
)

const Page2: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="2D/3D Animation"
    imageSrc="/carousel/img3026-5ogn-1600w.png"
    imageAlt="img3026"
    serviceTitle="2D/3D Animation"
    serviceDescription="Bring your ideas to life with dynamic 2D and 3D animations. Our creative team blends art and motion to produce visually appealing advertisements, explainer videos, and character-based storytelling that leaves a lasting impression on viewers."
  />
)

const Page3: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Brand Design"
    imageSrc="/carousel/img3027-vkk-1600w.png"
    imageAlt="img3027"
    serviceTitle="Brand Design"
    serviceDescription="Your brand is your story — we make sure it's unforgettable. From logos and brand palettes to typography and tone, we create unique brand identities that resonate with your audience and reflect your business values perfectly."
  />
)

const Page4: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Photography"
    imageSrc="/carousel/img3027-04cq-1600w.png"
    imageAlt="img3027"
    serviceTitle="Photography"
    serviceDescription="Capture life's moments with cinematic quality. Our videography services include event coverage, commercials, and promotional videos using state-of-the-art cameras and lighting to create compelling visual narratives that engage your audience."
  />
)

const Page5: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Videography"
    imageSrc="/carousel/img3028-h88-1600w.png"
    imageAlt="img3028"
    serviceTitle="Videography"
    serviceDescription="Transform your online presence with stunning web designs. Our responsive websites combine modern aesthetics with user-friendly interfaces, ensuring seamless experiences across all devices and driving conversions for your business."
  />
)

const Page6: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="WebDesign"
    imageSrc="/carousel/img3028-f47-1600w.png"
    imageAlt="img3028"
    serviceTitle="WebDesign"
    serviceDescription="Bring static designs to life with dynamic motion graphics. Our team creates animated logos, explainer videos, and visual effects that enhance your brand messaging and captivate viewers with smooth, professional animations."
  />
)

const Page7: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Motion Graphics"
    imageSrc="/carousel/img3028-orh-1600w.png"
    imageAlt="img3028"
    serviceTitle="Motion Graphics"
    serviceDescription="Capture every detail with precision. We specialize in product, event, and portrait photography using professional-grade equipment and creative direction to deliver high-quality imagery that tells your story beautifully."
  />
)

export const pages = [
  { component: Page1, classPrefix: 'page1' },
  { component: Page2, classPrefix: 'page2' },
  { component: Page3, classPrefix: 'page3' },
  { component: Page4, classPrefix: 'page4' },
  { component: Page5, classPrefix: 'page5' },
  { component: Page6, classPrefix: 'page6' },
  { component: Page7, classPrefix: 'page7' }
]