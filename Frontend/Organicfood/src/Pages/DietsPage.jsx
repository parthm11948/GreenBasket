import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Calendar, Clock, Flame, CheckCircle2, Salad, Target, Coffee, Sun, Moon, Droplets } from "lucide-react";

const WeightLossPage = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [activeDay, setActiveDay] = useState("Mon");
  const springGreen = "#31E981";

  const months = [1, 2, 3, 4];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthlyThemes = {
    1: { title: "Water Weight Flush", focus: "Detox", avgCals: 1400 },
    2: { title: "Fat Oxidation Phase", focus: "Metabolism", avgCals: 1300 },
    3: { title: "Lean Toning", focus: "Definition", avgCals: 1250 },
    4: { title: "Lifestyle Integration", focus: "Maintenance", avgCals: 1500 }
  };

  // Weight Loss Specific Organic Libraries
  const baseIngredients = ["Cauliflower Rice", "Moong Dal Sprouts", "Shirataki Noodles", "Boiled Chickpeas", "Zucchini Noodles", "Steamed Asparagus", "Millet Porridge", "Roasted Makhana"];
  const thermogenics = ["Apple Cider Vinegar", "Green Tea Extract", "Organic Cinnamon", "Ginger & Lemon", "Cayenne Pepper", "Chia Seeds"];
  const leanVeggies = ["Spinach", "Cucumber", "Bell Peppers", "Celery", "Bottle Gourd (Lauki)", "Broccoli", "Radish"];

  // Unique Weight Loss Meal Generator
  const generateWeightLossMeal = (m, d, mealIndex) => {
    const dayIdx = days.indexOf(d);
    
    const bIdx = (dayIdx + (m * 2) + mealIndex) % baseIngredients.length;
    const tIdx = ((dayIdx * 3) + m + (mealIndex * 2)) % thermogenics.length;
    const vIdx = (dayIdx + m + (mealIndex * 4)) % leanVeggies.length;

    // Weight loss macros: Higher fiber, lower calories as months progress
    const fiberContent = 8 + (mealIndex * 3) + (m * 1.5);
    const calories = Math.floor(monthlyThemes[m].avgCals / 3) + (mealIndex * 20);

    const mealInfo = [
      { type: "Breakfast", icon: <Coffee size={14} className="text-orange-400"/> },
      { type: "Lunch", icon: <Sun size={14} className="text-yellow-500"/> },
      { type: "Dinner", icon: <Moon size={14} className="text-blue-400"/> }
    ];
    
    return {
      ...mealInfo[mealIndex],
      name: `${leanVeggies[vIdx]} & ${baseIngredients[bIdx]} with ${thermogenics[tIdx]}`,
      fiber: `${Math.floor(fiberContent)}g`,
      cals: `${calories}`
    };
  };

  const currentMeals = [
    generateWeightLossMeal(activeMonth, activeDay, 0),
    generateWeightLossMeal(activeMonth, activeDay, 1),
    generateWeightLossMeal(activeMonth, activeDay, 2)
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-red-500" size={24}/>
                <span className="font-black uppercase tracking-widest text-sm text-gray-500">Weight Loss Protocol</span>
              </div>
              <h1 className="text-5xl font-black text-gray-800 tracking-tighter italic">
                Month <span style={{color: springGreen}}>{activeMonth.toString().padStart(2, '0')}</span>
              </h1>
              <p className="text-gray-500 font-bold text-lg mt-1">{monthlyThemes[activeMonth].title} • {monthlyThemes[activeMonth].focus}</p>
            </div>

            <div className="flex bg-white p-1.5 rounded-3xl shadow-xl border border-gray-100">
              {months.map((m) => (
                <button 
                  key={m} 
                  onClick={() => setActiveMonth(m)} 
                  className={`px-6 py-3 rounded-2xl font-black transition-all flex flex-col items-center ${activeMonth === m ? "text-white scale-105" : "text-gray-400 hover:text-gray-600"}`} 
                  style={{ backgroundColor: activeMonth === m ? springGreen : "transparent" }}
                >
                  <span className="text-[10px] uppercase opacity-60">Phase</span>
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
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }} 
                className="space-y-4"
              >
                {currentMeals.map((meal, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group transition-all hover:shadow-md">
                    <div className="flex gap-8 items-center text-gray-800">
                      <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex flex-col items-center justify-center font-black transition-all group-hover:bg-green-50">
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter italic">Step</span>
                        <span className="text-2xl text-gray-300 group-hover:text-green-500">{idx + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                           {meal.icon}
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{meal.type}</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight mb-3">{meal.name}</h3>
                        <div className="flex gap-6">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase italic">Calorie Count</span>
                             <span className="flex items-center gap-1.5 text-sm font-black text-gray-600"><Flame size={14} className="text-orange-400"/> {meal.cals} KCAL</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase italic">Satiety Index</span>
                             <span className="flex items-center gap-1.5 text-sm font-black text-gray-600"><Leaf size={14} className="text-green-500"/> {meal.fiber} Fiber</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h4 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Droplets size={24} style={{color: springGreen}}/> Fat Burn Tip
                  </h4>
                  <p className="text-gray-400 text-base italic leading-relaxed">
                    "Today on {activeDay}, your focus is {monthlyThemes[activeMonth].focus}. To boost results, have your {currentMeals[0].name.split('with')[1]} at least 20 minutes before your first meal."
                  </p>
                  
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Monthly Deficit Goal</span>
                        <span className="text-sm font-black" style={{color: springGreen}}>-3.5kg</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "72%" }}
                          className="bg-green-400 h-full"
                        ></motion.div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-green-500/10 rounded-full blur-[50px]"></div>
             </div>

             <button className="w-full py-6 rounded-[2rem] bg-green-500 text-white font-black hover:shadow-xl hover:shadow-green-200 transition-all flex items-center justify-center gap-3">
                <CheckCircle2 size={20}/> Complete Day {activeDay}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightLossPage;