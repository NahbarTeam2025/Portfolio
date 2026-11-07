import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2, Copy, Check, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const UTMLinkBuilder: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: ''
  });

  const [generatedLink, setGeneratedLink] = useState('');

  useEffect(() => {
    if (!formData.url) {
      setGeneratedLink('');
      return;
    }

    try {
      let baseUrl = formData.url;
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }

      const url = new URL(baseUrl);
      if (formData.source) url.searchParams.set('utm_source', formData.source);
      if (formData.medium) url.searchParams.set('utm_medium', formData.medium);
      if (formData.campaign) url.searchParams.set('utm_campaign', formData.campaign);
      if (formData.content) url.searchParams.set('utm_content', formData.content);
      if (formData.term) url.searchParams.set('utm_term', formData.term);

      setGeneratedLink(url.toString());
    } catch (e) {
      setGeneratedLink('');
    }
  }, [formData]);

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if ((window as any).gtag) {
        (window as any).gtag('event', 'tool_interaction', {
          tool_name: 'UTMLinkBuilder',
          action: 'copy_link'
        });
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isInvalid = !formData.url || !formData.source;

  return (
    <div className="flex flex-col items-center gap-4 p-2 w-full h-full max-w-4xl mx-auto overflow-y-auto lg:overflow-hidden">
      <div className="text-center md:text-left w-full space-y-1 shrink-0">
        <h2 className="text-lg md:text-xl font-bold heading-gradient">
          {t.tools.utmBuilder.title}
        </h2>
        <p className="text-black/40 text-[9px]">
          {t.tools.utmBuilder.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-1 min-h-0 overflow-y-auto lg:overflow-hidden pb-4">
        {/* Input Form */}
        <div className="space-y-3 p-4 bg-white/40 rounded-2xl border border-black/5 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/60 flex items-center gap-1.5">
              {t.tools.utmBuilder.websiteUrl} <span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder={t.tools.utmBuilder.placeholderUrl}
              className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/60 flex items-center gap-1.5">
              {t.tools.utmBuilder.source} <span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder={t.tools.utmBuilder.placeholderSource}
              className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                {t.tools.utmBuilder.medium}
              </label>
              <input
                type="text"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                placeholder={t.tools.utmBuilder.placeholderMedium}
                className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                {t.tools.utmBuilder.campaign}
              </label>
              <input
                type="text"
                name="campaign"
                value={formData.campaign}
                onChange={handleChange}
                placeholder={t.tools.utmBuilder.placeholderCampaign}
                className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                {t.tools.utmBuilder.content}
              </label>
              <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={t.tools.utmBuilder.placeholderContent}
                className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                {t.tools.utmBuilder.term}
              </label>
              <input
                type="text"
                name="term"
                value={formData.term}
                onChange={handleChange}
                placeholder={t.tools.utmBuilder.placeholderTerm}
                className="w-full px-3 py-2 bg-white/80 border border-black/10 rounded-xl text-xs focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80 font-mono">Generierter Link</span>
              </div>
              <AnimatePresence>
                {isInvalid && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-1.5 text-red-400 text-[9px] font-bold uppercase tracking-wider"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {t.tools.utmBuilder.error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 bg-white/60 border border-black/5 rounded-xl p-4 font-mono text-[11px] break-all text-black/70 leading-relaxed select-all">
              {generatedLink || 'https://...'}
            </div>

            <button
              onClick={handleCopy}
              disabled={isInvalid || !generatedLink}
              className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all duration-300 ${
                isInvalid || !generatedLink
                  ? 'bg-black/5 text-black/20 cursor-not-allowed'
                  : 'bg-blue-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  {t.tools.utmBuilder.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t.tools.utmBuilder.copy}
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-black/5 rounded-xl border border-black/5 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-500/50 shrink-0 mt-0.5" />
            <p className="text-[10px] text-black/50 leading-relaxed italic">
              {t.tools.utmBuilder.hint}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
