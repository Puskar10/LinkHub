"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

const GeneratePage = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [pic, setPic] = useState('');
  const [links, setLinks] = useState([{ link: "", linktext: "", icon: "🔗" }]);
  const [analytics, setAnalytics] = useState({
    views: 0,
    clicks: 0,
    conversion: 0
  });
  
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    theme: 'modern',
    layout: 'grid',
    buttonStyle: 'rounded',
    animation: 'fade',
    socialLinks: [
      { platform: 'youtube', url: '', enabled: true, order: 0 },
      { platform: 'instagram', url: '', enabled: true, order: 1 },
      { platform: 'twitter', url: '', enabled: true, order: 2 },
      { platform: 'tiktok', url: '', enabled: false, order: 3 },
      { platform: 'linkedin', url: '', enabled: false, order: 4 },
      { platform: 'github', url: '', enabled: false, order: 5 },
      { platform: 'website', url: '', enabled: false, order: 6 },
      { platform: 'portfolio', url: '', enabled: false, order: 7 },
    ]
  });

  const fileInputRef = useRef(null);

  // Platform configurations
  const platformIcons = {
    youtube: '▶️',
    instagram: '📸',
    twitter: '🐦',
    tiktok: '🎵',
    linkedin: '💼',
    github: '💻',
    website: '🌐',
    portfolio: '🚀'
  };

  const platformNames = {
    youtube: 'YouTube',
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    tiktok: 'TikTok',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Website',
    portfolio: 'Portfolio'
  };

  const themes = [
    { id: 'modern', name: 'Modern', gradient: 'from-blue-500 to-purple-600', bg: 'bg-gradient-to-br from-gray-900 to-blue-900', text: 'text-white' },
    { id: 'dark', name: 'Dark', gradient: 'from-gray-800 to-black', bg: 'bg-gradient-to-br from-gray-900 to-black', text: 'text-white' },
    { id: 'vibrant', name: 'Vibrant', gradient: 'from-pink-500 to-orange-500', bg: 'bg-gradient-to-br from-purple-900 to-pink-700', text: 'text-white' },
    { id: 'professional', name: 'Professional', gradient: 'from-blue-600 to-teal-500', bg: 'bg-gradient-to-br from-slate-800 to-blue-800', text: 'text-white' },
    { id: 'minimal', name: 'Minimal', gradient: 'from-white to-gray-100', bg: 'bg-white border-2 border-gray-200', text: 'text-gray-800' },
    { id: 'sunset', name: 'Sunset', gradient: 'from-orange-400 to-pink-600', bg: 'bg-gradient-to-br from-orange-500 to-pink-600', text: 'text-white' },
  ];

  const layouts = [
    { id: 'grid', name: 'Grid', icon: '◼️' },
    { id: 'list', name: 'List', icon: '📑' },
    { id: 'card', name: 'Cards', icon: '🃏' },
  ];

  const buttonStyles = [
    { id: 'rounded', name: 'Rounded' },
    { id: 'pill', name: 'Pill' },
    { id: 'sharp', name: 'Sharp' },
  ];

  const iconList = ["🔗", "⭐", "🚀", "💎", "🔥", "✨", "🎯", "💼", "📚", "🎨", "🎵", "🎬", "📷", "📱", "💻", "🌐"];

  useEffect(() => {
    const handleFromParams = searchParams.get('handle');
    if (handleFromParams) {
      setFormData(prev => ({ ...prev, username: handleFromParams }));
    }
  }, [searchParams]);

  // Combine social links and custom links for API submission
  const prepareLinksForSubmission = () => {
    // Get enabled social links with URLs
    const enabledSocialLinks = formData.socialLinks
      .filter(link => link.enabled && link.url.trim() !== '')
      .map(link => ({
        link: link.url,
        linktext: platformNames[link.platform],
        icon: platformIcons[link.platform],
        type: 'social'
      }));

    // Get custom links with URLs
    const enabledCustomLinks = links
      .filter(link => link.link.trim() !== '' && link.linktext.trim() !== '')
      .map(link => ({
        link: link.link,
        linktext: link.linktext,
        icon: link.icon,
        type: 'custom'
      }));

    // Combine both types of links
    return [...enabledSocialLinks, ...enabledCustomLinks];
  };

  const handleChange = (index, field, value) => {
    setLinks(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addLink = () => {
    setLinks(prev => [...prev, { link: "", linktext: "", icon: "🔗" }]);
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const toggleSocialLink = (index) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index].enabled = !updatedLinks[index].enabled;
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const addCustomLink = () => {
    setLinks(prev => [...prev, { link: "", linktext: "", icon: "🔗" }]);
  };

  const removeSocialLink = (index) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const submitLinks = async () => {
    if (!formData.username) {
      toast.error('Please enter a username');
      return;
    }

    // Check if at least one link is provided
    const allLinks = prepareLinksForSubmission();
    if (allLinks.length === 0) {
      toast.error('Please add at least one link (social or custom)');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link: allLinks,
          handle: formData.username,
          pic: pic,
          bio: formData.bio,
          theme: formData.theme,
          layout: formData.layout,
          buttonStyle: formData.buttonStyle
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('LinkHub created successfully!');
        setGeneratedUrl(`https://linkhub.me/${formData.username}`);
        setAnalytics({
          views: 1247,
          clicks: 893,
          conversion: 72
        });
      } else {
        toast.error(result.message || 'Failed to create link hub');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create link hub. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPic(e.target.result);
        toast.success('Profile picture uploaded successfully!');
      };
      reader.onerror = () => {
        toast.error('Failed to upload image');
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      toast.success('URL copied to clipboard!');
    }
  };

  const getButtonStyleClass = () => {
    switch (formData.buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'sharp': return 'rounded-none';
      default: return 'rounded-2xl';
    }
  };

  const getCurrentTheme = () => themes.find(theme => theme.id === formData.theme) || themes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <ToastContainer 
        position="top-right"
        theme="dark"
        toastClassName="bg-gray-800 text-white border border-gray-700"
        progressClassName="bg-gradient-to-r from-cyan-400 to-blue-400"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
              ⚡
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              LinkHub
            </h1>
          </div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Craft your digital identity with powerful analytics, stunning themes, and seamless integration.
            Everything you need in one link.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Panel - Navigation */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 sticky top-8">
              <nav className="space-y-3">
                {[
                  { id: 'profile', name: 'Profile', icon: '👤' },
                  { id: 'links', name: 'Social Links', icon: '🔗' },
                  { id: 'custom', name: 'Custom Links', icon: '⚡' },
                  { id: 'appearance', name: 'Appearance', icon: '🎨' },
                  { id: 'analytics', name: 'Analytics', icon: '📊' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gray-900/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Profile Completion</span>
                    <span className="text-cyan-400 font-bold">
                      {Math.round((
                        (formData.username ? 25 : 0) +
                        (formData.bio ? 15 : 0) +
                        (pic ? 10 : 0) +
                        (prepareLinksForSubmission().length > 0 ? 50 : 0)
                      ))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(
                          (formData.username ? 25 : 0) +
                          (formData.bio ? 15 : 0) +
                          (pic ? 10 : 0) +
                          (prepareLinksForSubmission().length > 0 ? 50 : 0)
                        )}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{prepareLinksForSubmission().length} links</span>
                    <span>{formData.username ? 'Username set' : 'No username'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Form */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden h-full">
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          Build Your Profile
                        </h2>
                        <p className="text-gray-400">Create your digital business card</p>
                      </div>

                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative group">
                          <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl relative overflow-hidden">
                            {pic ? (
                              <img src={pic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              formData.username ? formData.username.charAt(0).toUpperCase() : '👤'
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm">Change</span>
                            </div>
                          </div>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
                          >
                            <span className="text-lg">📷</span>
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>

                        <div className="w-full max-w-md">
                          <label className="block text-gray-300 text-sm font-medium mb-3">
                            Your Unique Handle *
                          </label>
                          <div className="flex shadow-2xl">
                            <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-gray-600 bg-gray-700 text-gray-300 text-sm font-medium">
                              linkforge.me/
                            </span>
                            <input
                              type="text"
                              value={formData.username}
                              onChange={(e) => handleInputChange('username', e.target.value)}
                              className="flex-1 block w-full px-4 py-4 rounded-r-2xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                              placeholder="yourname"
                              required
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2">This will be your unique URL</p>
                        </div>

                        <div className="w-full max-w-md">
                          <label className="block text-gray-300 text-sm font-medium mb-3">
                            Bio & Description
                          </label>
                          <textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            rows={4}
                            className="block w-full px-4 py-4 rounded-2xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none shadow-2xl"
                            placeholder="Describe yourself, your work, or your brand..."
                            maxLength={200}
                          />
                          <div className="flex justify-between text-gray-500 text-xs mt-2">
                            <span>Brief description about yourself</span>
                            <span>{formData.bio.length}/200</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Social Links Tab */}
                  {activeTab === 'links' && (
                    <motion.div
                      key="links"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          Social Profiles
                        </h2>
                        <p className="text-gray-400">
                          Connect your social media accounts. {formData.socialLinks.filter(link => link.enabled && link.url).length} links ready
                        </p>
                      </div>

                      <div className="space-y-4">
                        {formData.socialLinks.map((link, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-4 p-6 bg-gray-700/50 rounded-2xl border transition-all group ${
                              link.enabled && link.url 
                                ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                                : 'border-gray-600/50 hover:border-gray-500'
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <button
                                onClick={() => toggleSocialLink(index)}
                                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                                  link.enabled 
                                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                                    : 'bg-gray-600'
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                                    link.enabled ? 'left-7' : 'left-1'
                                  }`}
                                />
                              </button>

                              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg">
                                {platformIcons[link.platform]}
                              </div>

                              <div className="flex-1 min-w-0">
                                <label className="block text-gray-200 font-medium text-sm mb-2 flex items-center gap-2">
                                  {platformNames[link.platform]}
                                  {link.enabled && link.url && (
                                    <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">Ready</span>
                                  )}
                                </label>
                                <input
                                  type="url"
                                  value={link.url}
                                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                                  placeholder={`https://${link.platform}.com/yourprofile`}
                                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => removeSocialLink(index)}
                              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                            >
                              🗑️
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Link Status Summary */}
                      <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/50">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Enabled social links:</span>
                            <span className="text-cyan-400 font-medium">
                              {formData.socialLinks.filter(link => link.enabled && link.url).length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total available:</span>
                            <span className="text-gray-300 font-medium">
                              {formData.socialLinks.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Custom Links Tab */}
                  {activeTab === 'custom' && (
                    <motion.div
                      key="custom"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          Custom Links
                        </h2>
                        <p className="text-gray-400">Add any links you want to share</p>
                      </div>

                      <div className="space-y-4">
                        {links.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-gray-700/50 rounded-2xl border border-gray-600/50 hover:border-cyan-500/30 transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex items-center gap-3 flex-1">
                                <select
                                  value={item.icon}
                                  onChange={(e) => handleChange(index, 'icon', e.target.value)}
                                  className="w-16 h-12 bg-gray-800 border border-gray-600 rounded-xl text-center text-lg focus:ring-1 focus:ring-cyan-500 transition-all"
                                >
                                  {iconList.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                  ))}
                                </select>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Link title *"
                                      value={item.linktext}
                                      onChange={(e) => handleChange(index, 'linktext', e.target.value)}
                                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 transition-all"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="url"
                                      placeholder="https://example.com *"
                                      value={item.link}
                                      onChange={(e) => handleChange(index, 'link', e.target.value)}
                                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 transition-all"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => removeLink(index)}
                                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                disabled={links.length === 1}
                              >
                                🗑️
                              </button>
                            </div>
                            {item.link && item.linktext && (
                              <div className="mt-3 flex items-center gap-2 text-green-400 text-xs">
                                <span>✓</span>
                                <span>This link will be included</span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      <button
                        onClick={addCustomLink}
                        className="w-full py-4 border-2 border-dashed border-gray-600 rounded-2xl text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-3 group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">+</span>
                        <span className="font-medium">Add Another Custom Link</span>
                      </button>

                      <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/50">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Ready custom links:</span>
                          <span className="text-cyan-400 font-medium">
                            {links.filter(link => link.link && link.linktext).length} / {links.length}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          Customize Appearance
                        </h2>
                        <p className="text-gray-400">Make it uniquely yours</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-gray-200 font-semibold mb-4">Theme & Colors</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {themes.map((theme) => (
                              <button
                                key={theme.id}
                                onClick={() => handleInputChange('theme', theme.id)}
                                className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                                  formData.theme === theme.id
                                    ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-2xl'
                                    : 'border-gray-600 hover:border-gray-500'
                                }`}
                              >
                                <div className={`w-full h-16 rounded-xl bg-gradient-to-r ${theme.gradient} mb-3 shadow-lg`} />
                                <span className="text-gray-200 font-medium text-sm">{theme.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-gray-200 font-semibold mb-4">Layout Style</h3>
                            <div className="flex gap-3">
                              {layouts.map((layout) => (
                                <button
                                  key={layout.id}
                                  onClick={() => handleInputChange('layout', layout.id)}
                                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                                    formData.layout === layout.id
                                      ? 'border-cyan-400 bg-cyan-400/10'
                                      : 'border-gray-600 hover:border-gray-500'
                                  }`}
                                >
                                  <div className="text-2xl mb-2">{layout.icon}</div>
                                  <span className="text-gray-200 text-sm font-medium">{layout.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-gray-200 font-semibold mb-4">Button Style</h3>
                            <div className="flex gap-3">
                              {buttonStyles.map((style) => (
                                <button
                                  key={style.id}
                                  onClick={() => handleInputChange('buttonStyle', style.id)}
                                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                                    formData.buttonStyle === style.id
                                      ? 'border-cyan-400 bg-cyan-400/10'
                                      : 'border-gray-600 hover:border-gray-500'
                                  }`}
                                >
                                  <div className={`w-full h-3 mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 ${
                                    style.id === 'rounded' ? 'rounded' : 
                                    style.id === 'pill' ? 'rounded-full' : 'rounded-none'
                                  }`} />
                                  <span className="text-gray-200 text-sm font-medium">{style.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          Analytics Dashboard
                        </h2>
                        <p className="text-gray-400">Track your link performance</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center">
                          <div className="text-3xl font-bold text-cyan-400 mb-2">{generatedUrl ? analytics.views : '0'}</div>
                          <div className="text-gray-400 text-sm">Total Views</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                          <div className="text-3xl font-bold text-green-400 mb-2">{generatedUrl ? analytics.clicks : '0'}</div>
                          <div className="text-gray-400 text-sm">Total Clicks</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-2">{generatedUrl ? analytics.conversion : '0'}%</div>
                          <div className="text-gray-400 text-sm">Conversion Rate</div>
                        </div>
                      </div>

                      {generatedUrl && (
                        <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50">
                          <h3 className="text-gray-200 font-semibold mb-4">Top Performing Links</h3>
                          <div className="space-y-3">
                            {prepareLinksForSubmission().slice(0, 3).map((link, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-600/30 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <span>{link.icon}</span>
                                  <span className="text-gray-200 text-sm">{link.linktext}</span>
                                </div>
                                <div className="text-cyan-400 text-sm font-medium">{Math.floor(Math.random() * 100) + 50} clicks</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!generatedUrl && (
                        <div className="text-center py-12">
                          <div className="text-gray-400 text-lg mb-4">No analytics data yet</div>
                          <p className="text-gray-500 text-sm">Create your LinkHub to start tracking analytics</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Generate Button */}
              <div className="px-8 py-6 bg-gray-900/50 border-t border-gray-700/50">
                <button
                  onClick={submitLinks}
                  disabled={!formData.username || isGenerating || prepareLinksForSubmission().length === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-lg">Crafting Your Hub...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">⚡</span>
                      <span className="text-lg">Forge Your LinkHub</span>
                    </>
                  )}
                </button>
                {prepareLinksForSubmission().length === 0 && (
                  <p className="text-red-400 text-sm text-center mt-3">
                    Add at least one link to continue
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Preview Card */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Live Preview
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className={`${getCurrentTheme().bg} ${getCurrentTheme().text} rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 min-h-[400px] flex flex-col`}>
                  <div className="text-center mb-6 flex-1">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                      {pic ? (
                        <img src={pic} alt="Profile" className="w-full h-full object-cover rounded-3xl" />
                      ) : (
                        formData.username ? formData.username.charAt(0).toUpperCase() : 'U'
                      )}
                    </div>
                    <h4 className="font-bold text-xl mb-2">@{formData.username || 'username'}</h4>
                    <p className="text-cyan-300/80 text-sm leading-relaxed max-w-xs mx-auto">
                      {formData.bio || 'Your bio will appear here. Make it engaging!'}
                    </p>
                  </div>

                  <div className="space-y-3 flex-1">
                    {prepareLinksForSubmission().slice(0, 5).map((link, index) => (
                      <div
                        key={index}
                        className={`bg-white/10 backdrop-blur-sm ${getButtonStyleClass()} p-4 text-center font-medium transition-all hover:bg-white/20 cursor-pointer transform hover:scale-105 border border-white/10`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <span>{link.icon}</span>
                          <span>{link.linktext}</span>
                        </div>
                      </div>
                    ))}

                    {prepareLinksForSubmission().length === 0 && (
                      <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-400/30 rounded-2xl h-full flex items-center justify-center">
                        <div>
                          <div className="text-2xl mb-2">🔗</div>
                          <div>Your amazing links</div>
                          <div>will appear here</div>
                        </div>
                      </div>
                    )}

                    {prepareLinksForSubmission().length > 5 && (
                      <div className="text-center text-gray-400 text-sm py-2">
                        +{prepareLinksForSubmission().length - 5} more links
                      </div>
                    )}
                  </div>
                </div>

                {/* Generated URL */}
                {generatedUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl"
                  >
                    <p className="text-green-400 text-sm font-medium mb-3 flex items-center gap-2">
                      <span>✅</span>
                      Your LinkForge is ready!
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={generatedUrl}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm rounded-xl border border-green-500/30 bg-gray-800 text-green-400 font-mono"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <span>📋</span>
                        Copy
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Features Showcase */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                <h4 className="text-gray-200 font-semibold mb-4">Why Choose LinkForge?</h4>
                <div className="space-y-3">
                  {[
                    { icon: '🚀', text: 'Lightning Fast', desc: 'Instant loading times' },
                    { icon: '📊', text: 'Advanced Analytics', desc: 'Track your performance' },
                    { icon: '🎨', text: 'Fully Customizable', desc: 'Make it your own' },
                    { icon: '🔒', text: 'Secure & Reliable', desc: '99.9% uptime guarantee' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700/30 transition-colors">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <div className="text-cyan-400 text-sm font-medium">{feature.text}</div>
                        <div className="text-gray-500 text-xs">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;