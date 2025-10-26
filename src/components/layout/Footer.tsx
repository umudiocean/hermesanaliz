'use client';

import { useTranslations } from 'next-intl';
import { Github, Twitter, Send } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-background-card/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold glow-text mb-4">
              Hermes AI Analyzer
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              AI-powered token analysis platform on BSC. Get comprehensive risk assessment and security analysis powered by blockchain data.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t('docs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t('support')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t('terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t('privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Community</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-background-secondary border border-primary/20 hover:border-primary/40 hover:scale-110 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background-secondary border border-primary/20 hover:border-primary/40 hover:scale-110 transition-all"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background-secondary border border-primary/20 hover:border-primary/40 hover:scale-110 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-gray-400">
          <p>© {currentYear} Hermes AI Analyzer. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}

