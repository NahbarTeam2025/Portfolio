import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, supabaseAnonKey } from '@/lib/supabase';
import { Star, MessageSquare, Send, LogIn, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Review {
  id: string;
  name: string;
  text: string;
  stars: number;
  created_at: string;
}

export const ReviewSystem = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', stars: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('ReviewSystem: Initializing...');
    fetchReviews();
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('ReviewSystem: Auth state changed:', event, session?.user?.email);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('ReviewSystem: Attempting to fetch from table "reviews"...');
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('ReviewSystem: Supabase returned an error object:', fetchError);
        throw fetchError;
      }
      
      console.log('ReviewSystem: Successfully fetched reviews:', data);
      if (data) setReviews(data);
    } catch (err: any) {
      console.error('ReviewSystem: EXAKTER FEHLER BEIM FETCH:', JSON.stringify(err, null, 2));
      console.error('ReviewSystem: Fehler-Details:', err);

      if (err.message === 'Failed to fetch') {
        setError('Netzwerkfehler: Verbindung zu Supabase blockiert. (Ad-Blocker aktiv oder Projekt pausiert?)');
      } else if (supabaseAnonKey?.startsWith('sb_')) {
        setError('Ungültiger Key-Typ: Der Key scheint ein Stripe-Key zu sein. Supabase-Keys beginnen meist mit "eyJ".');
      } else {
        setError(`Fehler: ${err.message || 'Verbindung fehlgeschlagen'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkUser = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      console.log('ReviewSystem: Current session:', session?.user?.email);
      setUser(session?.user ?? null);
    } catch (err) {
      console.error('ReviewSystem: Error checking session:', err);
    }
  };

  const handleLogin = async () => {
    console.log('ReviewSystem: Starting login...');
    try {
      const { error: loginError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://roberterbach.de'
        }
      });
      if (loginError) throw loginError;
    } catch (err: any) {
      console.error('ReviewSystem: Login error:', err);
      setError(`Login fehlgeschlagen: ${err.message || 'Unbekannter Fehler'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReview.text.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: submitError } = await supabase.from('reviews').insert([
        {
          name: user.user_metadata.full_name || user.user_metadata.name || user.email,
          text: newReview.text,
          stars: newReview.stars,
          user_id: user.id
        }
      ]);

      if (submitError) throw submitError;

      setNewReview({ text: '', stars: 5 });
      setIsFormOpen(false);
      fetchReviews();
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Fehler beim Senden der Bewertung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[320px] mx-auto lg:mx-0">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl overflow-hidden min-h-[180px]">
        <AnimatePresence mode="wait">
          {!isFormOpen ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
                </div>
              ) : reviews.length > 0 ? (
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < reviews[currentIndex].stars ? "currentColor" : "none"}
                          className={i < reviews[currentIndex].stars ? "" : "text-black/20"}
                        />
                      ))}
                    </div>
                    <span className="text-black/60 text-[10px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                      {reviews[currentIndex].name}
                    </span>
                  </div>
                  <p className="text-black/90 text-sm leading-relaxed italic line-clamp-3">
                    "{reviews[currentIndex].text}"
                  </p>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-black/40 text-xs italic gap-2">
                  <MessageSquare size={20} strokeWidth={1.5} />
                  <span className="text-center px-4">{error || 'Noch keine Bewertungen vorhanden.'}</span>
                  {error && (
                    <button 
                      onClick={() => fetchReviews()}
                      className="mt-2 text-blue-500 font-bold uppercase tracking-widest text-[9px] hover:underline"
                    >
                      Erneut versuchen
                    </button>
                  )}
                </div>
              )}
              
              <button
                onClick={() => user ? setIsFormOpen(true) : handleLogin()}
                className="mt-5 w-full py-2.5 bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl text-black text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
              >
                {user ? (
                  <>
                    <MessageSquare size={14} className="group-hover:scale-110 transition-transform" />
                    Bewertung abgeben
                  </>
                ) : (
                  <>
                    <LogIn size={14} className="group-hover:scale-110 transition-transform" />
                    Login für Bewertung
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-black text-[10px] font-bold uppercase tracking-[0.2em]">Neue Bewertung</span>
                <button 
                  onClick={() => setIsFormOpen(false)} 
                  className="text-black/40 hover:text-black transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="flex justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, stars: s })}
                    className="text-yellow-500 transition-transform hover:scale-125 active:scale-90"
                  >
                    <Star size={22} fill={s <= newReview.stars ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              
              <textarea
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                placeholder="Deine Meinung..."
                className="w-full bg-black/5 border border-black/10 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-black/30 min-h-[90px] resize-none placeholder:text-black/20"
              />
              
              {error && (
                <div className="text-red-500 text-[10px] font-medium text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !newReview.text.trim()}
                className="w-full py-3 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? "Wird gesendet..." : (
                  <>
                    <Send size={14} />
                    Senden
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
