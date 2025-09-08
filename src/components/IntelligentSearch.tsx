'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Mic, 
  Camera, 
  Filter, 
  Sparkles,
  TrendingUp,
  History,
  X,
  ChevronRight,
  Star,
  MapPin,
  Zap
} from 'lucide-react'

interface SearchSuggestion {
  id: string
  text: string
  type: 'product' | 'category' | 'brand' | 'trending'
  category?: string
  popularity?: number
  image?: string
}

interface IntelligentSearchProps {
  onSearch: (query: string, filters?: any) => void
  className?: string
}

const IntelligentSearch: React.FC<IntelligentSearchProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches] = useState([
    'wireless headphones',
    'gaming laptop',
    'smart watch',
    'winter jackets',
    'coffee maker'
  ])
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock suggestions data
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'iPhone 15 Pro', type: 'product', category: 'Electronics', popularity: 95 },
    { id: '2', text: 'Samsung Galaxy', type: 'brand', popularity: 90 },
    { id: '3', text: 'Electronics', type: 'category', popularity: 85 },
    { id: '4', text: 'wireless earbuds', type: 'trending', popularity: 88 },
    { id: '5', text: 'MacBook Pro', type: 'product', category: 'Electronics', popularity: 92 },
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Auto-complete functionality
    if (query.length > 1) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      
      onSearch(searchQuery)
      setIsExpanded(false)
      setQuery('')
    }
  }

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsVoiceActive(true)
      }
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsVoiceActive(false)
        handleSearch(transcript)
      }
      
      recognition.onerror = () => {
        setIsVoiceActive(false)
      }
      
      recognition.onend = () => {
        setIsVoiceActive(false)
      }
      
      recognition.start()
    } else {
      alert('Voice search is not supported in your browser')
    }
  }

  const handleImageSearch = () => {
    // Create file input for image upload
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // In a real app, you would upload the image and get search results
        console.log('Image search:', file)
        alert('Image search feature coming soon!')
      }
    }
    input.click()
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-orange-500" />
      case 'category':
        return <Filter className="w-4 h-4 text-blue-500" />
      case 'brand':
        return <Star className="w-4 h-4 text-purple-500" />
      default:
        return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className={`flex items-center bg-white dark:bg-gray-800 rounded-full border-2 transition-all duration-300 ${
          isExpanded 
            ? 'border-blue-500 shadow-lg' 
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}>
          <div className="flex items-center pl-4">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Search for products, brands, categories..."
            className="flex-1 px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
          />
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pr-2">
            {/* Voice Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                isVoiceActive ? 'bg-red-100 text-red-600' : 'text-gray-500'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </motion.button>
            
            {/* Image Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleImageSearch}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Image Search"
            >
              <Camera className="w-4 h-4" />
            </motion.button>
            
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch(query)}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </motion.button>
          </div>
        </div>
        
        {/* Voice Recording Indicator */}
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3"
          >
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Listening...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {/* Suggestions Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                  Smart Suggestions
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {/* Auto-complete Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion) => (
                    <motion.button
                      key={suggestion.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleSearch(suggestion.text)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        {getSuggestionIcon(suggestion.type)}
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {suggestion.text}
                          </div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-500">
                              in {suggestion.category}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && query.length === 0 && (
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 flex items-center">
                    <History className="w-3 h-3 mr-1" />
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <History className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const updated = recentSearches.filter((_, i) => i !== index)
                          setRecentSearches(updated)
                          localStorage.setItem('recentSearches', JSON.stringify(updated))
                        }}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {query.length === 0 && (
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending Now
                  </div>
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      <div className="ml-auto">
                        <Zap className="w-3 h-3 text-yellow-500" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IntelligentSearch