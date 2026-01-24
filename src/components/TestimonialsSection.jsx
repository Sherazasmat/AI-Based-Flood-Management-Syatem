import React from 'react'
import { ArrowRight } from 'lucide-react'

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-blue-600 text-xl">💬</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Real Stories, Real Impact
          </h2>
          <p className="text-gray-500 text-sm">
            Hear from individuals and communities who have benefited from Monitorex.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                JD
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <p className="text-sm text-gray-500">Community Leader</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "Monitorex saved our community during the last flood. The early warning system gave us enough time to evacuate safely. This platform is a lifesaver!"
            </p>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              Read More
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                JS
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                <p className="text-sm text-gray-500">Resident</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "The real-time updates and shelter information helped me find a safe place for my family. I'm grateful for this amazing system."
            </p>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              Read More
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                RJ
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Robert Johnson</h4>
                <p className="text-sm text-gray-500">Emergency Responder</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "As an emergency responder, Monitorex has revolutionized how we coordinate rescue operations. The predictive analytics are incredibly accurate."
            </p>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              Read More
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
