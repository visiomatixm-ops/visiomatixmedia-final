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
        'Comprehensive digital marketing solutions to boost your online presence, drive traffic, and increase conversions. Our data-driven strategies deliver measurable results across all digital channels.',
      icon: '📈',
      keywords: [
        'digital marketing agency',
        'social media marketing',
        'SEO services',
        'PPC campaigns',
        'email marketing',
        'content marketing',
      ],
      services: [
        'Social Media Marketing (SMM)',
        'Search Engine Optimization (SEO)',
        'Google Ads & Pay-Per-Click (PPC) Campaigns',
        'Email & Influencer Marketing',
        'Content & Video Marketing',
        'Online Reputation Management (ORM)',
        'E-commerce Marketing',
        'Analytics & ROI Tracking',
      ],
    },
    {
      id: 'design-creative',
      title: 'Design & Creative Services',
      description:
        'Transform your brand vision into stunning visual experiences. Our creative team delivers exceptional design solutions that captivate audiences and strengthen brand identity.',
      icon: '🎨',
      keywords: [
        'UI/UX design',
        'graphic design',
        'motion graphics',
        '3D visualization',
        'video production',
        'branding design',
      ],
      services: [
        'UI/UX Design',
        'Graphic Design (Logo, Brochure, Branding)',
        'Motion Graphics & Animation',
        'YouTube Thumbnails & Video Assets',
        '3D Product Visualization',
        'Visual Effects (VFX) & Post-Production',
        'Product Photography & Videography',
      ],
    },
    {
      id: 'web-app-development',
      title: 'Web & App Development',
      description:
        'Cutting-edge web and mobile application development services. We build scalable, secure, and user-friendly digital solutions that drive business growth and enhance user experiences.',
      icon: '💻',
      keywords: [
        'web development',
        'app development',
        'mobile apps',
        'ecommerce websites',
        'custom web solutions',
        'landing pages',
      ],
      services: [
        'Web App Development',
        'Website Design & Development (Static / Dynamic / E-commerce)',
        'Mobile App Development',
        'Landing Page Optimization',
        'Custom Web Solutions',
      ],
    },
    {
      id: 'business-software',
      title: 'Business Software Solutions',
      description:
        'Streamline your business operations with custom software solutions. Our enterprise-grade applications automate workflows, improve efficiency, and provide valuable insights for data-driven decision making.',
      icon: '🏢',
      keywords: [
        'ERP development',
        'CRM development',
        'business automation',
        'AI integration',
        'HRMS systems',
        'custom software',
      ],
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
        'Complete e-commerce solutions to launch and scale your online store. From platform development to marketing strategies, we help you create profitable online retail experiences.',
      icon: '🛒',
      keywords: [
        'ecommerce development',
        'online store',
        'marketplace advertising',
        'payment integration',
        'product optimization',
      ],
      services: [
        'E-commerce Website Development',
        'Marketplace Advertising (Amazon, Flipkart, etc.)',
        'Product Listing Optimization',
        'Payment Gateway Integration',
      ],
    },
    {
      id: 'branding-strategy',
      title: 'Branding & Strategy',
      description:
        'Strategic branding and marketing consultation services. We help businesses define their unique value proposition, develop comprehensive marketing strategies, and execute campaigns that drive results.',
      icon: '🎯',
      keywords: [
        'brand strategy',
        'marketing strategy',
        'brand positioning',
        'market research',
        'campaign execution',
        'competitor analysis',
      ],
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h3 className="fw-bold display-4 display-md-3 display-lg-2 display-xl-1 text-dark">
            Visiomatix Media – Complete Digital, Design & Development Solutions
          </h3>
          <h3 className="h4 h-md-3">Our Core Services</h3>
        </motion.div>

        {/* Bootstrap Grid Row */}
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
              <div className="card h-100 shadow-sm border-0 rounded-4 p-3 hover-shadow">
                <div className="card-body">
                  {/* Header */}
                  <div className="text-center mb-3">
                    <div className="fs-1 mb-2">{category.icon}</div>
                    <h5 className="fw-bold text-dark h6 h-md-5">{category.title}</h5>
                  </div>

                  {/* List */}
                  <ul className="list-unstyled mb-0">
                    {category.services.map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="d-flex align-items-start text-secondary mb-2"
                      >
                        <span className="text-success me-2 mt-1">•</span>
                        <span className="small">{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hidden SEO text */}
                  <div className="visually-hidden">
                    {category.keywords.join(', ')}
                  </div>
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
