import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Riverside District Resident",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "The early warning system saved my family. We received the alert 2 hours before the flood hit and had enough time to evacuate safely. The shelter location feature was incredibly helpful.",
    rescuedDate: "June 2024"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Thanks to the accurate predictions, I was able to secure my business assets and evacuate my employees on time. The AI system is remarkably accurate and reliable.",
    rescuedDate: "July 2024"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "School Teacher",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "The real-time weather updates and shelter information helped me coordinate the safe evacuation of 200+ students. This system is a lifesaver in every sense.",
    rescuedDate: "August 2024"
  }
];

const TestimonialCard = ({ data }) => (
  <div className="min-w-100 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between mx-4 hover:shadow-lg transition-all duration-300">
    <div>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={data.image}
          alt={data.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-slate-50"
        />
        <div>
          <h4 className="font-bold text-slate-800 text-xl tracking-tight">{data.name}</h4>
          <p className="text-slate-400 text-sm font-semibold">{data.role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} size="sm" />
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed font-medium italic">
        "{data.content}"
      </p>
    </div>

    <p className="mt-8 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
      Rescued: {data.rescuedDate}
    </p>
  </div>
);

const TestimonialsSection = () => {
  const controls = useAnimation();

  // Data to triple infinite
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Animation control function
  const startScrolling = async () => {
    await controls.start({
      x: "-50%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    startScrolling();
  }, []);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100 mb-6">
          <FontAwesomeIcon icon={faStar} className="text-yellow-600" size={16} />
          <span className="text-yellow-700 text-md font-semibold tracking-wider">Community Impact</span>
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Real Stories, Real Impact</h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed font-medium">
          Hear from people whose lives were saved by our AI-powered flood alert system
        </p>
      </div>

      {/* Auto-Scrolling Slider Wrapper */}
      <div className="relative flex items-center">
        <motion.div
          className="flex cursor-pointer"
          animate={controls}
          initial={{ x: "0%" }}
          // --- PAUSE ON HOVER LOGIC ---
          onMouseEnter={() => controls.stop()} 
          onMouseLeave={() => startScrolling()} 
          style={{ display: 'flex', width: 'fit-content' }}
        >
          {duplicatedTestimonials.map((item, idx) => (
            <TestimonialCard key={idx} data={item} />
          ))}
        </motion.div>

        {/* Side Gradients for Smooth Fading */}
        <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default TestimonialsSection;