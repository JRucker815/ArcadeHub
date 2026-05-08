import { useState, useEffect, useMemo } from "react";
import { 
  Gamepad2, 
  Search, 
  Maximize2, 
  X, 
  Trash2, 
  LayoutGrid, 
  Sparkles, 
  Trophy,
  History,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gamesData from "./games.json";

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPlaying, setIsPlaying] = useState(false);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setIsPlaying(true);
    // Scroll to top when opening a game
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-black transition-colors duration-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/50 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); closePlayer(); }}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Gamepad2 className="text-black w-4 h-4" />
            </div>
            <h1 className="text-xl font-display font-medium tracking-tighter text-white uppercase">
              Arcade<span className="opacity-40">Hub</span>
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search unblocked..." 
              className="w-full bg-zinc-900/30 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
             <button className="sleek-pill border-none text-zinc-500">
               Library
             </button>
             <button className="sleek-pill">
               Sign In
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!isPlaying ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-20"
          >
            {/* Hero Section - Sleek & Massive Typography */}
            <div className="relative flex flex-col items-center text-center py-20">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-6 block">
                  Curated Collection 2026
                </span>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-[-0.04em] mb-8 leading-[0.9]">
                  PLAY WITHOUT <br/>
                  <span className="text-zinc-700">RESTRICTION.</span>
                </h2>
                <p className="max-w-xl mx-auto text-zinc-500 text-lg md:text-xl font-light mb-12 leading-relaxed">
                  A refined portal for unblocked browser games. 
                  Minimalist design, maximum performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleGameSelect(gamesData[Math.floor(Math.random() * gamesData.length)])}
                    className="px-10 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Play className="fill-current w-4 h-4" /> Start Playing
                  </button>
                  <button className="px-10 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-colors">
                    Explore All
                  </button>
                </div>
              </motion.div>
              
              {/* Background accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-zinc-900/20 blur-[120px] rounded-full -z-10" />
            </div>

            {/* Category Filter - Sticky & Sleek */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4 border-b border-white/5">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`sleek-pill ${selectedCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                {filteredGames.length} Games Available
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGames.length > 0 ? (
                filteredGames.map((game, idx) => (
                  <motion.div
                    key={game.id}
                    layoutId={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => handleGameSelect(game)}
                    className="group sleek-card aspect-[4/5] overflow-hidden cursor-pointer relative"
                  >
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <span className="text-[8px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1 block">
                        {game.category}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">
                        {game.title}
                      </h3>
                      <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500">
                        <p className="text-zinc-400 text-xs line-clamp-2 font-light">
                          {game.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                          <Maximize2 className="w-3 h-3 text-white" />
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center">
                  <h3 className="text-xl font-display font-light text-zinc-500 uppercase tracking-widest">Nothing found</h3>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Player Header - Extremely Minimal */}
            <div className="h-14 bg-black border-b border-white/5 flex items-center justify-between px-6">
              <div className="flex items-center gap-6">
                <button 
                  onClick={closePlayer}
                  className="flex items-center gap-2 group"
                >
                  <X className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase tracking-widest transition-colors">Exit</span>
                </button>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">{selectedGame?.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-1">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-5 h-5 rounded-full border border-black bg-zinc-800" />
                   ))}
                 </div>
                 <button className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-colors">
                   Report Bug
                 </button>
              </div>
            </div>

            {/* Iframe Viewport - Cinematic */}
            <div className="flex-1 bg-black relative flex items-center justify-center">
              {selectedGame && (
                <iframe 
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-600">
          <div className="col-span-2">
            <h3 className="text-white font-display font-medium text-lg mb-6">ArcadeHub</h3>
            <p className="max-w-sm font-light leading-relaxed mb-8">
              Redefining the browser gaming experience with a focus on speed, 
              security, and uncompromised design.
            </p>
            <div className="flex gap-4">
               {/* Minimal social icons placeholder */}
               <div className="w-5 h-5 bg-zinc-900 rounded" />
               <div className="w-5 h-5 bg-zinc-900 rounded" />
               <div className="w-5 h-5 bg-zinc-900 rounded" />
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Top Rated</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
