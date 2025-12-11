import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import './slides.css'
import CTAButton from '../CTAButton.tsx'

interface PageProps {
  classPrefix: string
  title: string
  serviceTitle: string
  serviceDescription: string
  hasAnimation?: boolean
  backgroundColor?: string
  imageSrc?: string
}

interface ServicePageProps {
  classPrefix: string
}

const ServicePage: React.FC<PageProps> = ({
  classPrefix,
  title,
  serviceTitle,
  serviceDescription,
  hasAnimation = false,
  backgroundColor = 'transparent',
  imageSrc
}) => (
  <div className={`${classPrefix}-container1`}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className={`${classPrefix}${classPrefix}`} style={{backgroundColor: backgroundColor}}>
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={serviceTitle}
          className={`${classPrefix}-img`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        />
      )}
      {hasAnimation ? (
        <motion.div
          className={`${classPrefix}text`}
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
            <CTAButton />
          </motion.div>
          
        </motion.div>
      ) : (
        <div className={`${classPrefix}text`}>
          <div className={`${classPrefix}tittle`}>
            <span className={`${classPrefix}-text1`}>{serviceTitle}</span>
          </div>
          <div className={`${classPrefix}tittletext`}>
            <span className={`${classPrefix}-text2`}>{serviceDescription}</span>
            <CTAButton />
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
    serviceTitle="UI UX Design"
    serviceDescription={`Our design specialists create intuitive, user-centered
       interfaces that elevate every digital interaction. Leveraging industry-leading tools
       like Figma and Adobe XD, we craft seamless user journeys, modern layouts, and visually
       balanced experiences. Whether it's a website, mobile app, or product dashboard, we ensure
       every design not only looks stunning but feels effortless to use.`}
    hasAnimation={true}
    imageSrc="/about/images/UIUX-image.png"
  />
)

const Page2: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="2D/3D Animation"
    serviceTitle="2D/3D Animation"
    serviceDescription={`Bring your ideas to life with dynamic 2D and 3D animations. Our creative
       team blends art and motion to produce visually appealing advertisements, explainer videos, 
       and character-based storytelling that leaves a lasting impression on viewers.`}
    hasAnimation={true}
    imageSrc="/about/images/2D3DAnimation.png"
  />
)

const Page3: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Brand Design"
    serviceTitle="Brand Design"
    serviceDescription={`Your brand is your story — we make sure it's unforgettable. From logos 
      and brand palettes to typography and tone, we create unique brand identities that resonate 
      with your audience and reflect your business values perfectly.`}
    hasAnimation={true}
    imageSrc="/about/images/branddesign.png"
  />
)

const Page4: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Photography"
    serviceTitle="Photography"
    serviceDescription={`Capture every detail with precision. We specialize in product, event, and 
      portrait photography using professional-grade equipment and creative direction to deliver
       high-quality imagery that tells your story beautifully.`}
    hasAnimation={true}
    imageSrc="/about/images/Photography.png"
  />
)

const Page5: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Videography"
    serviceTitle="Videography"
    serviceDescription={`Capture life's moments with cinematic quality. Our videography services 
      include event coverage, commercials, and promotional videos using state-of-the-art cameras 
      and lighting to create compelling visual narratives that engage your audience.`}
    hasAnimation={true}
    imageSrc="/about/images/videography.png"
  />
)

const Page6: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="WebDesign"
    serviceTitle="WebDesign"
    serviceDescription={`Transform your online presence with stunning web designs. Our responsive
       websites combine modern aesthetics with user-friendly interfaces, ensuring seamless 
       experiences across all devices and driving conversions for your business.`}
    hasAnimation={true}
    imageSrc="/about/images/webdesign.png"
  />
)

const Page7: React.FC<ServicePageProps> = ({ classPrefix }) => (
  <ServicePage
    classPrefix={classPrefix}
    title="Motion Graphics"
    serviceTitle="Motion Graphics"
    serviceDescription={`Bring static designs to life with dynamic motion graphics. Our team 
      creates animated logos, explainer videos, and visual effects that enhance your brand 
      messaging and captivate viewers with smooth, professional animations.`}
    hasAnimation={true}
    imageSrc="/about/images/motiongraphic.png"
  />
)

{/*export const pages = [
  { component: Page1, classPrefix: 'page1' },
  { component: Page2, classPrefix: 'page2' },
  { component: Page3, classPrefix: 'page3' },
  { component: Page4, classPrefix: 'page4' },
  { component: Page5, classPrefix: 'page5' },
  { component: Page6, classPrefix: 'page6' },
  { component: Page7, classPrefix: 'page7' }*/}


export const pages = [
  { component: Page1, classPrefix: 'page1' },
  { component: Page2, classPrefix: 'page2' },
  { component: Page3, classPrefix: 'page3' },
  { component: Page4, classPrefix: 'page4' },
  { component: Page5, classPrefix: 'page5' },
  { component: Page6, classPrefix: 'page6' },
  { component: Page7, classPrefix: 'page7' }
]