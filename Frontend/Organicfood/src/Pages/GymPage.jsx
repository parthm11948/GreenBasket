import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Calendar, Clock, Flame, CheckCircle2, Leaf, Apple } from "lucide-react";

const GymPage = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [activeDay, setActiveDay] = useState("Mon");
  const springGreen = "#31E981";

  const months = [1, 2, 3, 4];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthlyThemes = {
    1: { title: "Foundation & Detox", proteinBoost: 0, calBoost: 0 },
    2: { title: "Strength Building", proteinBoost: 8, calBoost: 150 },
    3: { title: "Muscle Hypertrophy", proteinBoost: 15, calBoost: 300 },
    4: { title: "Peak Performance", proteinBoost: 22, calBoost: 450 }
  };

  // Expanded libraries to ensure no repeats
  const proteinSources = ["Paneer", "Soya Chunks", "Tofu", "Sprouted Moong", "Chickpeas", "Lentils", "Tempeh", "Greek Yogurt", "Seitan", "Black Beans"];
  const carbSources = ["Brown Rice", "Quinoa", "Oats", "Sweet Potato", "Bajra Roti", "Lentil Pasta", "Multigrain Bread", "Couscous", "Millet", "Buckwheat"];
  const veggies = ["Broccoli", "Spinach", "Bell Peppers", "Asparagus", "Kale", "Green Beans", "Mushrooms", "Zucchini", "Carrots", "Bok Choy"];

  // THE FIX: Improved unique meal generator
  const generateUniqueMeal = (m, d, mealIndex) => {
    const dayIdx = days.indexOf(d);
    
    /* We use math logic to ensure high variety:
       pIdx: shifts based on month * day + meal index
       cIdx: uses a prime number multiplier to jump across the array
       vIdx: simple offset to keep it distinct from the others
    */
    const pIdx = (dayIdx + (m * 2) + mealIndex) % proteinSources.length;
    const cIdx = ((dayIdx * 3) + m + (mealIndex * 2)) % carbSources.length;
    const vIdx = (dayIdx + m + (mealIndex * 4)) % veggies.length;

    // Macro scaling based on month progression
    const baseProtein = 18 + (mealIndex * 4) + monthlyThemes[m].proteinBoost;
    const baseCals = 350 + (mealIndex * 80) + monthlyThemes[m].calBoost;

    const mealNames = ["Breakfast", "Lunch", "Dinner"];
    
    return {
      type: mealNames[mealIndex],
      name: `${veggies[vIdx]} & ${proteinSources[pIdx]} with ${carbSources[cIdx]}`,
      protein: `${baseProtein}g`,
      cals: `${baseCals}`
    };
  };

  const currentMeals = [
    generateUniqueMeal(activeMonth, activeDay, 0),
    generateUniqueMeal(activeMonth, activeDay, 1),
    generateUniqueMeal(activeMonth, activeDay, 2)
  ];

  return (
    <div className="min-h-screen bg-[#FCDDBC]/10 pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="text-green-600" size={24}/>
                <span className="font-black uppercase tracking-widest text-sm text-green-600">4-Month Organic Transformation</span>
              </div>
              <h1 className="text-5xl font-black text-gray-800 tracking-tighter italic">
                Month <span style={{color: springGreen}}>{activeMonth.toString().padStart(2, '0')}</span>
              </h1>
              <p className="text-gray-500 font-bold text-lg mt-1">{monthlyThemes[activeMonth].title}</p>
            </div>

            <div className="flex bg-white p-1.5 rounded-3xl shadow-xl border border-gray-100">
              {months.map((m) => (
                <button 
                  key={m} 
                  onClick={() => setActiveMonth(m)} 
                  className={`px-6 py-3 rounded-2xl font-black transition-all flex flex-col items-center ${activeMonth === m ? "text-white scale-105" : "text-gray-400 hover:text-gray-600"}`} 
                  style={{ backgroundColor: activeMonth === m ? springGreen : "transparent" }}
                >
                  <span className="text-[10px] uppercase opacity-60">Month</span>
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 bg-white/50 p-2 rounded-2xl border border-white/30">
            {days.map((day) => (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)} 
                className={`flex-1 min-w-[60px] py-3 rounded-xl font-bold transition-all ${activeDay === day ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-white"}`}
              >
                {day}
              </button>
            ))}
          </div>
        </header>

        

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${activeMonth}-${activeDay}`} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="space-y-4"
              >
                {currentMeals.map((meal, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group transition-all hover:shadow-md">
                    <div className="flex gap-8 items-center text-gray-800">
                      <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex flex-col items-center justify-center font-black transition-all group-hover:bg-green-50">
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Step</span>
                        <span className="text-2xl text-gray-300 group-hover:text-green-500">{idx + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Clock size={14} className="text-gray-300" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{meal.type}</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight mb-3">{meal.name}</h3>
                        <div className="flex gap-6">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase">Energy</span>
                             <span className="flex items-center gap-1.5 text-sm font-black text-gray-600"><Flame size={14} className="text-orange-400"/> {meal.cals} KCAL</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase">Protein</span>
                             <span className="flex items-center gap-1.5 text-sm font-black text-gray-600"><CheckCircle2 size={14} className="text-green-500"/> {meal.protein}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-6">
             <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h4 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Apple size={24} style={{color: springGreen}}/> Roadmap Logic
                  </h4>
                  <p className="text-gray-400 text-base italic leading-relaxed">
                    "Today is {activeDay}. In Month {activeMonth}, we have calibrated your protein intake to {currentMeals[2].protein} for dinner to maximize muscle synthesis."
                  </p>
                </div>
                <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-green-500/20 rounded-full blur-[80px]"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymPage;