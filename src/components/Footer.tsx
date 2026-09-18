import React from 'react';

const Footer: React.FC = () => {
  return (
    // Background ko completely hata kar solid Indian Flag Green (#138808) kar diya gaya hai
    <footer className="bg-[#138808] text-white pt-16 pb-8 relative z-20 overflow-hidden">
      
      {/* Top Border Line: Saffron and White gradient to complete the flag theme */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#FF9933]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Section 1: Brand & About */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-3xl font-extrabold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF9933]">Citizen</span> Suvidha
            </h2>
            <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
              An AI-powered smart public transport and civic safety platform. Developed for the Smart India Hackathon 2026 to ensure smarter, safer, and predictable commutes.
            </p>
            {/* Social / GitHub Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#138808] transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5 text-white hover:text-[#138808]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Section 2: Platform Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Platform Links</h3>
            <ul className="space-y-3">
              <li><a href="#live-transit" className="text-white/90 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 font-medium"><span>▸</span> Live Transit Status</a></li>
              <li><a href="#route-search" className="text-white/90 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 font-medium"><span>▸</span> Search Active Routes</a></li>
              <li><a href="#alerts" className="text-white/90 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 font-medium"><span>▸</span> Transport Alerts</a></li>
              <li><a href="#report" className="text-[#FF9933] hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 font-bold"><span>▸</span> Report Crowd (Contribute)</a></li>
            </ul>
          </div>

          {/* Section 3: Clickable Emergency Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Emergency Help</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:1090" className="group text-white hover:text-[#FF9933] transition-colors flex items-center gap-2 font-bold">
                  <span className="group-hover:animate-ping">🚨</span> Women Helpline (1090)
                </a>
              </li>
              <li>
                <a href="tel:112" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 font-medium">
                  <span>🚓</span> National Emergency (112)
                </a>
              </li>
              <li>
                <a href="tel:108" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 font-medium">
                  <span>🚑</span> Medical Ambulance (108)
                </a>
              </li>
              <li>
                <a href="tel:101" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 font-medium">
                  <span>🚒</span> Fire Department (101)
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact & SIH Team */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact & Support</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">📍</span>
                <span className="text-sm font-medium text-white/90">
                  SIH 2026 Nodal Center<br/>
                  Smart India Hackathon Initiative
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <a href="mailto:support@citizensuvidha.in" className="text-sm font-medium text-white/90 hover:text-white hover:underline transition-all">
                  support@citizensuvidha.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Border adjusted to look good on Green background */}
        <div className="border-t border-white/20 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-white/80">
            &copy; 2026 Citizen Suvidha. Built for SIH 2026.
          </p>
          <div className="flex gap-6 text-sm font-medium text-white/80">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Data Security</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;