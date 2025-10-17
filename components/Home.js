"use client";
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();

  const createTree = () => {
    if (text.trim()) {
      router.push(`/generate?handle=${text}`);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createTree();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>LinkHub - Your Digital Identity</title>
        <meta name="description" content="Connect all your digital presence in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="relative z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">⎔</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                LinkHub
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                Features
              </a>
              <a href="#showcase" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                Showcase
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                Pricing
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 text-gray-300 font-medium hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/10">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  <span className="text-cyan-300 text-sm font-medium">Join 2M+ creators worldwide</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Your Digital
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Identity Hub
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  Consolidate your entire online presence into one beautiful, customizable hub. 
                  Share your world with a single link that connects to everything that matters.
                </p>

                {/* Input Section */}
                <div className="max-w-lg">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <h3 className="text-white text-2xl font-bold mb-4">Claim Your LinkHub</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            linkhub.me/
                          </span>
                          <input
                            type="text"
                            value={text}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            className="w-full pl-28 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                            placeholder="yourname"
                          />
                        </div>
                      </div>
                      <button
                        onClick={createTree}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
                      >
                        <span>Create Hub</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                      Free forever. No credit card required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                    
                    {/* Image Container */}
                    <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-1">
                      <div className="w-full h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-lg font-semibold">Your Digital Hub</p>
                          <p className="text-sm opacity-80">Beautiful & Professional</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Links */}
                    <div className="space-y-3">
                      {['Portfolio Website', 'Social Media', 'Contact Info', 'Latest Projects', 'Newsletter'].map((item, index) => (
                        <div
                          key={item}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-white font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer text-center"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
                  </div>
                  
                  {/* Background glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-slate-900 to-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Creators Love <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">LinkHub</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Built with powerful features to help you grow your audience and share your content effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🚀',
                  title: 'Lightning Fast',
                  description: 'Instant loading times keep your audience engaged and ready to explore your content.'
                },
                {
                  icon: '🎨',
                  title: 'Fully Customizable',
                  description: 'Match your brand with custom colors, fonts, and layouts that represent your unique style.'
                },
                {
                  icon: '📊',
                  title: 'Smart Analytics',
                  description: 'Track clicks and understand your audience with built-in analytics and insights.'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Reliable',
                  description: 'Enterprise-grade security with 99.9% uptime guarantee for your links.'
                },
                {
                  icon: '📱',
                  title: 'Mobile First',
                  description: 'Perfect experience on any device with our mobile-optimized design.'
                },
                {
                  icon: '⚡',
                  title: 'Zero Maintenance',
                  description: 'Set it up once and focus on creating. We handle all the technical details.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Your Digital Hub?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of creators who use LinkHub to share their work with the world.
            </p>
            <button 
              onClick={createTree}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
            >
              Create Your Free Hub Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⎔</span>
                </div>
                <span className="text-xl font-bold text-white">LinkHub</span>
              </div>
              <p className="text-gray-400">
                Your digital identity, beautifully connected.
              </p>
            </div>
            
            {['Product', 'Company', 'Resources', 'Legal'].map((category) => (
              <div key={category}>
                <h3 className="text-white font-bold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {['Features', 'Examples', 'Pricing'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 LinkHub. All rights reserved. Built with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}