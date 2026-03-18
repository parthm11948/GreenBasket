import React from 'react';
import { 
  ShoppingBasket, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  MessageCircle, // WhatsApp Icon
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const springGreen = "#31E981";

  // Define social links here
  const socialLinks = [
    { 
      Icon: Instagram, 
      link: "https://www.instagram.com/greenbasket011" // REPLACE WITH YOUR ACTUAL LINK
    },
    { 
      Icon: MessageCircle, 
      link: "https://chat.whatsapp.com/BJjSE5G1zHq49Vt3QhPZCH?mode=gi_c" // REPLACE WITH YOUR WHATSAPP NUMBER
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. Brand & About Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div 
                style={{ backgroundColor: springGreen }}
                className="p-2 rounded-xl text-white shadow-sm transition-transform group-hover:rotate-12"
              >
                <ShoppingBasket size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                Green<span style={{ color: springGreen }}>Basket</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              Bringing 100% organic, farm-fresh produce directly to your doorstep. Healthy living starts with GreenBasket.
            </p>
            
            {/* Follow Us - Social Media */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, link }, index) => (
                  <a 
                    key={index}
                    href={link}
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice
                    className="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-white transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = springGreen;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = springGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#9ca3af';
                      e.currentTarget.style.borderColor = '#f3f4f6';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="md:pl-12">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Product', 'About', 'Contact', 'Profile'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-500 hover:translate-x-2 transition-transform flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} style={{ color: springGreen }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="hover:text-gray-800 transition-colors">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Address Section */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6">Address</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <MapPin size={20} style={{ color: springGreen }} className="mt-1 flex-shrink-0" />
                <span className="text-gray-500 text-sm leading-relaxed">
                  GreenBasket Hub,<br />Anand, Gujarat
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone size={20} style={{ color: springGreen }} className="flex-shrink-0" />
                <span className="text-gray-500 text-sm font-medium hover:text-gray-800 transition-colors">
                  +1 (234) 567-890
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail size={20} style={{ color: springGreen }} className="flex-shrink-0" />
                <span className="text-gray-500 text-sm font-medium hover:text-gray-800 transition-colors">
                  captainphillip7794@gmail.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} <span style={{ color: springGreen }}>GreenBasket</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;