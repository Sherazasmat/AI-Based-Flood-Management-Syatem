import React from 'react'
import { Cloud, Droplet, Wind, CloudRain } from 'lucide-react'

const WeatherSection = () => {
  return (
    <section className="bg-white px-6 md:px-20 py-16">

      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cloud className="text-blue-600" size={20} />
        </div>
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Real-Time Weather Monitoring
        </h2>
        <p className="text-gray-500 text-sm">
          Stay informed with accurate and up-to-the-minute weather data.
        </p>
      </div>

      {/* Weather Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* Temperature */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-xl text-center">
          <Cloud className="mx-auto mb-4" size={40} />
          <h3 className="text-4xl font-bold mb-2">45.3°C</h3>
          <p className="text-sm text-blue-100">Temperature</p>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white p-8 rounded-xl text-center">
          <Droplet className="mx-auto mb-4" size={40} />
          <h3 className="text-4xl font-bold mb-2">76%</h3>
          <p className="text-sm text-cyan-100">Humidity</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-xl text-center">
          <Wind className="mx-auto mb-4" size={40} />
          <h3 className="text-4xl font-bold mb-2">28 km/h</h3>
          <p className="text-sm text-orange-100">Wind Speed</p>
        </div>

        {/* Rainfall */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl text-center">
          <CloudRain className="mx-auto mb-4" size={40} />
          <h3 className="text-4xl font-bold mb-2">13 mm</h3>
          <p className="text-sm text-green-100">Rainfall</p>
        </div>

      </div>

    </section>
  )
}

export default WeatherSection;