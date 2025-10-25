/**
 * ===========================================================
 * File: src/component/Team.tsx
 * Author: Viral Prajapati
 * Date: 24-Oct-2025
 * Description:
 *  Basic Team component for displaying team members.
 * ===========================================================
 */

import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Pooja Patil',
      role: 'Managing Director',
      image: '/team/poojapatil.jpg',
      description: 'Leading creative vision and design strategy.'
    },
    {
      name: 'Rohit Shinde',
      role: 'Technical Lead',
      image: '/team/rohitshinde.jpg',
      description: 'Overseeing technical development and innovation.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <p className="text-gray-700">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;