
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Leaf, 
  AlertTriangle, 
  Share2, 
  Search, 
  Clock, 
  Wallet, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { DEMO_ITINERARY } from './constants';
import { ItineraryResponse, DayItinerary } from './types';
import { GoogleGenAI, Type } from "@google/genai";

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResponse | null>(null);
  const [showCarbonReport, setShowCarbonReport] = useState(false);
  const [carbonProgress, setCarbonProgress] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDemo = () => {
    setQuery("3-day temple tour Chennai to Madurai");
    handleSearch("3-day temple tour Chennai to Madurai");
  };

  const handleSearch = async (overrideQuery?: string) => {
    const activeQuery = overrideQuery || query;
    if (!activeQuery) return;

    setLoading(true);
    setResult(null);

    // Simulated AI processing delay
    setTimeout(() => {
      if (activeQuery.toLowerCase().includes("3-day temple tour")) {
        setResult(DEMO_ITINERARY);
      } else {
        // Fallback or Gemini call here (Mocked for speed as per user request for functional demo)
        setResult(DEMO_ITINERARY); 
      }
      setLoading(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const openWhatsApp = (day: DayItinerary) => {
    const text = `Check out my Day ${day.day} plan for ${day.route}! 🙏\n\nTemple: ${day.temples[0].nameEn}\nBus: ${day.bus.type} (${day.bus.timing})\nCarbon Saved: ${day.carbonSaved}kg CO2! 🌿`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const startCarbonReport = () => {
    setShowCarbonReport(true);
    setCarbonProgress(0);
    const interval = setInterval(() => {
      setCarbonProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-900 text-white py-6 px-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-emerald-900 font-bold text-xl shadow-inner">
              TN
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Tamil Nadu Travel AI</h1>
              <p className="text-emerald-200 text-xs tamil-font">தமிழ்நாடு சுற்றுலா செயற்கை நுண்ணறிவு</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30">
                <Award size={14} /> StartupTN AI Hackathon Winner
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold">Live Demo Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="gradient-green py-20 px-4 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Discover the Heart of South India with AI
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Plan spiritual retreats, temple tours, and eco-friendly bus journeys across Tamil Nadu in seconds.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto mb-6">
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search className="text-emerald-600" size={20} />
              <input 
                type="text" 
                placeholder="Where do you want to go? (e.g., Chennai to Madurai 3 days)"
                className="w-full py-4 text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Generate"}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleDemo}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <Calendar size={16} className="text-amber-400" />
              Try Temple Tour (Demo)
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200 px-5 py-2.5 rounded-full text-sm font-medium transition-all">
              Hill Station Guide
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200 px-5 py-2.5 rounded-full text-sm font-medium transition-all">
              Coastline Explorer
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8" ref={resultsRef}>
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
                <Leaf size={32} className="animate-bounce" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-700 mb-2">Analyzing Routes & Timings...</p>
            <p className="text-slate-500 font-medium tamil-font">சிறந்த பயணத் திட்டத்தை உருவாக்குகிறோம்...</p>
          </div>
        )}

        {result && !loading && (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-md gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Your Curated Itinerary</h3>
                <p className="text-emerald-600 font-medium flex items-center gap-2">
                  <Leaf size={16} /> Total Potential Carbon Savings: 15.6kg CO₂
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={startCarbonReport}
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2"
                >
                  <Leaf size={18} /> Get Carbon Report
                </button>
                <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
                  <ExternalLink size={18} /> Book SETC Bus
                </button>
              </div>
            </div>

            {/* Itinerary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.days.map((day, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:shadow-2xl transition-all group">
                  <div className="h-3 bg-emerald-700"></div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Day {day.day}
                      </span>
                      <button 
                        onClick={() => openWhatsApp(day)}
                        className="text-slate-400 hover:text-green-600 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>

                    <h4 className="text-xl font-bold text-slate-800 mb-2">{day.title}</h4>
                    <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium bg-slate-50 p-2 rounded-lg">
                      <MapPin size={16} className="text-emerald-600" />
                      {day.route}
                    </div>

                    {/* Temple Section */}
                    <div className="space-y-6 mb-8">
                      {day.temples.map((temple, tIdx) => (
                        <div key={tIdx} className="border-l-2 border-amber-400 pl-4 py-1">
                          <h5 className="font-bold text-slate-800 text-lg mb-1">{temple.nameEn}</h5>
                          <p className="tamil-font text-emerald-800 font-bold text-sm mb-2">{temple.nameTa}</p>
                          <div className="space-y-1 text-sm text-slate-600">
                            <div className="flex items-start gap-2">
                              <Clock size={14} className="mt-0.5 text-slate-400" />
                              <div className="flex flex-col">
                                <span>{temple.timingsEn}</span>
                                <span className="tamil-font text-xs text-slate-400">{temple.timingsTa}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bus Section */}
                    <div className="bg-emerald-50 rounded-2xl p-4 mb-4 border border-emerald-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Bus className="text-emerald-700" size={20} />
                        <span className="font-bold text-emerald-900">SETC Travel</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-emerald-800 font-medium">{day.bus.type}</p>
                        <div className="flex justify-between items-center text-emerald-700">
                          <span>{day.bus.timing}</span>
                          <span className="font-bold">₹{day.bus.cost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alert / Warning */}
                    {day.festivalWarning && (
                      <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200 mb-4 animate-pulse">
                        <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                        <p className="text-xs text-amber-900 font-bold leading-tight">
                          FESTIVAL ALERT: {day.festivalWarning}
                        </p>
                      </div>
                    )}

                    {/* Budget Options */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                        <Wallet size={14} /> Budget Alternatives
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2 rounded-xl text-[10px] border border-slate-100">
                          <p className="font-bold text-slate-500 uppercase">Budget</p>
                          <p className="text-slate-800 font-bold">{day.budgetOptions.ttdc}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl text-[10px] border border-slate-100">
                          <p className="font-bold text-slate-500 uppercase">Premium</p>
                          <p className="text-slate-800 font-bold">{day.budgetOptions.private}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900 px-6 py-3 flex justify-between items-center text-white">
                    <span className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
                      <Leaf size={14} className="text-emerald-400" /> Carbon Saved
                    </span>
                    <span className="font-black text-emerald-300">+{day.carbonSaved}kg</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Phrases Section */}
            <div className="mt-16 text-center py-12 border-t border-slate-200">
              <h5 className="text-emerald-800 font-bold text-lg mb-4">Common Tamil Phrases for Your Trip</h5>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-800 mb-1">Vanakkam</span>
                  <span className="tamil-font text-emerald-600 font-bold">வணக்கம்</span>
                  <span className="text-xs text-slate-400 uppercase font-bold mt-1">Hello / Welcome</span>
                </div>
                <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-800 mb-1">Nandri</span>
                  <span className="tamil-font text-emerald-600 font-bold">நன்றி</span>
                  <span className="text-xs text-slate-400 uppercase font-bold mt-1">Thank You</span>
                </div>
                <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-800 mb-1">Saapaadu</span>
                  <span className="tamil-font text-emerald-600 font-bold">சாப்பாடு</span>
                  <span className="text-xs text-slate-400 uppercase font-bold mt-1">Food / Meal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
            <MapPin size={64} className="text-slate-300 mb-6" />
            <p className="text-2xl font-bold text-slate-400">Your spiritual journey starts here.</p>
            <p className="text-slate-400 tamil-font">உங்கள் பயணத்தை இங்கே தொடங்குங்கள்.</p>
          </div>
        )}
      </main>

      {/* Carbon Report Overlay */}
      {showCarbonReport && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="gradient-green p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <Leaf size={40} className="text-emerald-300 mb-4" />
                 <h2 className="text-3xl font-black mb-2">Sustainable Journey Report</h2>
                 <p className="text-emerald-100 opacity-80">Calculating your environmental impact...</p>
               </div>
               <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                 <Leaf size={200} />
               </div>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Analyzing Transport Emissions</span>
                  <span className="font-black text-emerald-600">{carbonProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${carbonProgress}%` }}
                  ></div>
                </div>
              </div>

              {carbonProgress === 100 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                    <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-1">You Saved</p>
                    <p className="text-6xl font-black text-emerald-700 mb-2">15.6<span className="text-2xl ml-1 uppercase">kg</span></p>
                    <p className="text-emerald-900 font-bold">Carbon Dioxide (CO₂)</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Leaf size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-600">Equivalent to planting <span className="text-slate-900 font-bold">3 new trees</span> in Tamil Nadu's forests.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Bus size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-600">Bus travel reduces your footprint by <span className="text-slate-900 font-bold">82%</span> compared to private SUV travel.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCarbonReport(false)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Close Report
                  </button>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <p className="font-medium">Please wait while we cross-reference travel data...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-emerald-900 font-bold">TN</div>
              <h4 className="text-white font-bold text-xl">Tamil Nadu Travel AI</h4>
            </div>
            <p className="max-w-xs text-sm">Empowering eco-friendly and spiritual exploration of India's heritage heartland.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-400 transition-colors text-sm font-medium">GitHub Repository</a>
            <a href="#" className="hover:text-emerald-400 transition-colors text-sm font-medium">Data Sources</a>
            <a href="#" className="hover:text-emerald-400 transition-colors text-sm font-medium">Terms</a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs uppercase tracking-widest font-bold mb-1">Built with ❤️ at StartupTN Hackathon</p>
            <p className="text-slate-600 text-[10px] uppercase font-bold tracking-tighter">© 2024 Tamil Nadu Travel AI. Not for official government use.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
