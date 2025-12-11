/**
 * ===========================================================
 * File: FeaturedServices.tsx
 * Author: Viral Prajapati
 * Date: 03-Nov-2025
 * Description:
 *  Featured Services section component for the Home page.
 *  Converted to Bootstrap responsive grid layout.
 * ===========================================================
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: string[];
  keywords: string[];
}

const FeaturedServices: React.FC = () => {
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Services',
      description:
        'Comprehensive digital marketing solutions to boost your online presence, drive traffic, and increase conversions.',
      icon: '/about/Digital Marketing Services.svg',
      keywords: [
        'digital marketing agency',
        'social media marketing',
        'SEO services',
        'PPC campaigns',
      ],
      services: [
        'Social Media Marketing (SMM)',
        'Search Engine Optimization (SEO)',
        'Google Ads & Pay-Per-Click (PPC)',
        'Email & Influencer Marketing',
        'Content & Video Marketing',
        'Online Reputation Management (ORM)',
        'E-commerce Marketing',
      ],
    },

    {
      id: 'design-creative',
      title: 'Design & Creative Services',
      description:
        'Transform your brand vision into stunning visual experiences.',
      icon: '/about/design and creative service.svg',
      keywords: ['UI/UX design', 'graphic design', 'motion graphics'],
      services: [
        'UI/UX Design',
        'Graphic Design (Logo, Brochure, Branding)',
        'Motion Graphics & Animation',
        'YouTube Thumbnails & Video Assets',
        '3D Product Visualization',
        'VFX & Post-Production',
      ],
    },

    {
      id: 'web-app-development',
      title: 'Web & App Development',
      description:
        'Cutting-edge web and mobile application development services.',
      icon: '/about/Web & App Development.svg',
      keywords: ['web development', 'mobile apps'],
      services: [
        'Web App Development',
        'Website Design (Static / Dynamic / E-commerce)',
        'Mobile App Development',
        'Landing Page Optimization',
        'Custom Web Solutions',
      ],
    },

    {
      id: 'business-software',
      title: 'Business Software Solutions',
      description:
        'Streamline your business operations with custom software solutions.',
      icon: '/about/Business Software Solutions.svg',
      keywords: ['ERP', 'CRM', 'automation'],
      services: [
        'ERP Development',
        'CRM Development',
        'HRMS Development',
        'AI Voice Sales Assistant Integration',
        'Business Automation Tools',
      ],
    },

    {
      id: 'ecommerce-solutions',
      title: 'E-commerce Solutions',
      description:
        'Complete e-commerce solutions to launch and scale your online store.',
      icon: '/about/E-commerce Solutions.svg',
      keywords: ['ecommerce development', 'online store'],
      services: [
        'E-commerce Website Development',
        'Marketplace Advertising',
        'Product Listing Optimization',
        'Payment Gateway Integration',
      ],
    },

    {
      id: 'branding-strategy',
      title: 'Branding & Strategy',
      description:
        'Strategic branding and marketing consultation services.',
      icon: '/about/branding and strategy.svg',
      keywords: ['brand strategy', 'market research'],
      services: [
        'Brand Identity & Positioning',
        'Marketing Strategy & Funnel Planning',
        'Campaign Ideation & Execution',
        'Competitor & Market Research',
      ],
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h3 className="fw-bold display-4 text-dark">
            Visiomatix Media – Complete Digital, Design & Development Solutions
          </h3>
          <h3 className="h4">Our Core Services</h3>
        </motion.div>

        {/* Grid */}
        <div className="row gy-4">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-12 col-md-6 col-lg-4"
            >
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4">
                <div className="card-body text-center">

                  {/* ICON IMAGE */}
                  <img
                    src={category.icon}
                    alt={category.title}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '15px',
                    }}
                  />

                  <h5 className="fw-bold text-dark">{category.title}</h5>

                  <ul className="list-unstyled mt-3">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="text-dark mb-2 small">
                        • {service}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;