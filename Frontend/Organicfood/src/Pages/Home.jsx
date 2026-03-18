import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  ShoppingBasket, Leaf, Truck, ShieldCheck,
  ChevronRight, ChevronLeft, ArrowRight, Star,
  Apple, Carrot, Milk, Nut, GlassWater
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const springGreen = '#31E981';
  const softApricot = '#FCDDBC';

  const slides = [
    {
      title: "100% Organic Freshness",
      desc: "Farm-to-table vegetables and fruits delivered within 24 hours.",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
      accent: "Fresh & Green"
    },
    {
      title: "Pure Cold-Pressed Juices",
      desc: "Revitalize your health with our new range of fruit & veggie blends.",
      img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=1200",
      accent: "Healthy Sips"
    }
  ];

  const categories = [
    { name: "Vegetables", icon: <Carrot />, color: "#DCFCE7" },
    { name: "Fruits", icon: <Apple />, color: "#FEF3C7" },
    { name: "Dairy", icon: <Milk />, color: "#DBEAFE" },
    { name: "Dry Food", icon: <Nut />, color: "#F3E8FF" },
    { name: "Juices", icon: <GlassWater />, color: "#FFEDD5" },
  ];

  const products = [
    { id: 1, name: "Organic Broccoli", cat: "Vegetable", img: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400" },
    { id: 2, name: "Fresh Strawberries", cat: "Fruits", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400" },
    { id: 3, name: "Mango Juice", cat: "Dairy", img: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?w=500" },
    { id: 4, name: "Mixed Organic Nuts", cat: "Dry Food", img: "https://media.istockphoto.com/id/1218693828/photo/wooden-bowl-with-mixed-nuts-on-rustic-table-top-view-healthy-food-and-snack.webp?a=1&b=1&s=612x612&w=0&k=20&c=un8-1rnSbeydD36u6g5Jp4MLrzX2GWOGYuxZJeYQrXU=" },
    { id: 5, name: "Bitter Gourd Juice", cat: "Vegetable Juice", img: "https://media.istockphoto.com/id/1277972151/photo/bitter-gourd-juice-in-a-wine-glass-along-with-condiments.webp?a=1&b=1&s=612x612&w=0&k=20&c=lrb2sZBiChPhPUOTIjh5RLXmoTVjmk_01IyknB6mY0I=" },
    { id: 6, name: "Orange Juice", cat: "Fruit Juice", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s === slides.length - 1 ? 0 : s + 1)), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white min-h-screen">
      
      {/* HERO SLIDER */}
      <header className="relative h-[550px] overflow-hidden">
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.img} className="w-full h-full object-cover" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <span style={{ backgroundColor: springGreen }} className="px-4 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wider">
                  {slide.accent}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 max-w-2xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-lg">{slide.desc}</p>

                <Link to="/product" style={{ backgroundColor: springGreen }} className="inline-flex px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-lg hover:scale-105 transition-all items-center gap-2">
                  Shop Catalog <ArrowRight size={20} />
                </Link>

              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-10 right-10 flex gap-4 z-20">
          <button onClick={() => setCurrentSlide(s => s === 0 ? slides.length-1 : s-1)} className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40">
            <ChevronLeft />
          </button>
          <button onClick={() => setCurrentSlide(s => s === slides.length-1 ? 0 : s+1)} className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40">
            <ChevronRight />
          </button>
        </div>
      </header>


      {/* UNIQUE STORE INFO SECTION */}
      <section className="py-14 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">

          <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-green-400 to-emerald-300">
            <div className="bg-white rounded-3xl p-8 flex items-center gap-6 shadow-lg hover:scale-[1.03] transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Truck size={28}/>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Service Area</h3>
                <p className="text-gray-600">
                  Delivery available only in <b>Junagadh City</b>
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-green-400 to-emerald-300">
            <div className="bg-white rounded-3xl p-8 flex items-center gap-6 shadow-lg hover:scale-[1.03] transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <ShieldCheck size={28}/>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Store Timing</h3>
                <p className="text-gray-600">
                  Open daily from <b>8:00 AM – 10:00 PM</b>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* CATEGORY SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div style={{ backgroundColor: cat.color }} className="w-20 h-20 rounded-full flex items-center justify-center text-gray-700 group-hover:scale-110 shadow-sm">
                  {React.cloneElement(cat.icon, { size: 32 })}
                </div>
                <span className="mt-3 font-bold text-gray-700">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PROMO SECTION */}
      <section style={{ backgroundColor: softApricot }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800" alt="promo" />
          </div>
          <div className="p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 italic">
              "Nature's best, directly from our soil to your soul."
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg text-green-500"><Leaf /></div>
                <div>
                  <h4 className="font-bold">Organic Certified</h4>
                  <p className="text-gray-600">No pesticides, ever.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg text-green-500"><Truck /></div>
                <div>
                  <h4 className="font-bold">Same Day Delivery</h4>
                  <p className="text-gray-600">Order before 11 AM.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* BEST SELLERS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Our Best Sellers</h2>
          <div style={{ backgroundColor: springGreen }} className="h-1.5 w-24 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {p.cat}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                  <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/></div>
                </div>
                <p className="text-gray-500 text-sm mb-2">Organic, Non-GMO, Locally sourced</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;