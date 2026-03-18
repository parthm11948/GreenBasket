import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Warehouse, Leaf, Droplets, Home } from 'lucide-react';

const About = () => {
  const springGreen = "#31E981";
  const softApricot = "#FCDDBC";

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section */}
      <div style={{ backgroundColor: softApricot }} className="py-20 mb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-gray-800 mb-6"
          >
            The Journey of Your Food
          </motion.h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            From the fertile soil of Anand to your doorstep. Learn how GreenBasket ensures 100% organic quality.
          </p>
        </div>
        {/* Decorative Leaf Icon */}
        <Leaf className="absolute -bottom-10 -right-10 text-green-200 opacity-50" size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Sourcing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Farm Sourcing */}
          <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
            <div style={{ backgroundColor: springGreen }} className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform">
              <Leaf size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">GreenBasket Farm</h3>
            <p className="text-gray-600 leading-relaxed">
              Our organic <strong>Vegetables and Fruits</strong> are grown locally on our own farm. We also import premium seasonal varieties from specialized growers in <strong>other states</strong>.
            </p>
          </div>

          {/* Animal Farm */}
          <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform bg-orange-400">
              <Home size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">GreenBasket Animal Farm</h3>
            <p className="text-gray-600 leading-relaxed">
              All <strong>Dairy products</strong> come from our dedicated animal farm. We ensure our cattle are raised in a happy, healthy environment for pure milk and curd.
            </p>
          </div>

          {/* Storage & Juices */}
          <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform bg-blue-400">
              <Droplets size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Storage & Processing</h3>
            <p className="text-gray-600 leading-relaxed">
              Our fresh <strong>Juices</strong> are prepared daily in the GreenBasket Storage House. Everything we sell is housed here under strict temperature controls.
            </p>
          </div>
        </div>

        {/* Location & Delivery Section */}
        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black mb-6">Based in Anand,<br/>Serving Anand.</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Warehouse className="text-green-400 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl">Storage Hub Location</h4>
                  <p className="text-gray-400">Main Storage House, Anand, Gujarat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="text-green-400 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl">Delivery Exclusive</h4>
                  <p className="text-gray-400">To maintain freshness, we currently offer <strong>exclusive delivery only within the Anand city limits.</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-white/5 p-8 rounded-[2rem] border border-white/10 text-center">
            <MapPin size={48} style={{ color: springGreen }} className="mx-auto mb-4" />
            <p className="text-2xl font-bold italic opacity-80">"Freshness delivered before the dew dries."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;