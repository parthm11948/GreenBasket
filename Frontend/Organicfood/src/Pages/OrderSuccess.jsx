import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={64} className="text-[#31E981]" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">Your organic goodies are being prepared.</p>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-[#31E981] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-green-100 transition-all mx-auto"
        >
          <Home size={20} /> Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;