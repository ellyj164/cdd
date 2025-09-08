import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Buy */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Buy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/registration" className="text-gray-600 hover:text-blue-600">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/bidding-help" className="text-gray-600 hover:text-blue-600">
                  Bidding & buying help
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-600 hover:text-blue-600">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/creator-collections" className="text-gray-600 hover:text-blue-600">
                  Creator Collections
                </Link>
              </li>
              <li>
                <Link href="/charity" className="text-gray-600 hover:text-blue-600">
                  eBay for Charity
                </Link>
              </li>
              <li>
                <Link href="/charity-shop" className="text-gray-600 hover:text-blue-600">
                  Charity Shop
                </Link>
              </li>
              <li>
                <Link href="/seasonal-sales" className="text-gray-600 hover:text-blue-600">
                  Seasonal Sales and events
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-600 hover:text-blue-600">
                  eBay Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Sell</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/start-selling" className="text-gray-600 hover:text-blue-600">
                  Start selling
                </Link>
              </li>
              <li>
                <Link href="/how-to-sell" className="text-gray-600 hover:text-blue-600">
                  How to sell
                </Link>
              </li>
              <li>
                <Link href="/business-sellers" className="text-gray-600 hover:text-blue-600">
                  Business sellers
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-gray-600 hover:text-blue-600">
                  Affiliates
                </Link>
              </li>
            </ul>
            
            <h3 className="text-sm font-semibold mb-4 mt-6 text-gray-900">Tools & apps</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/developers" className="text-gray-600 hover:text-blue-600">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/security-center" className="text-gray-600 hover:text-blue-600">
                  Security center
                </Link>
              </li>
              <li>
                <Link href="/site-map" className="text-gray-600 hover:text-blue-600">
                  Site map
                </Link>
              </li>
            </ul>
          </div>

          {/* eBay companies */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">eBay companies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tcgplayer" className="text-gray-600 hover:text-blue-600">
                  TCGplayer
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold mb-4 mt-6 text-gray-900">Stay connected</h3>
            <div className="flex items-center space-x-3">
              <Link href="/facebook" className="text-gray-600 hover:text-blue-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <Link href="/twitter" className="text-gray-600 hover:text-blue-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </div>
              </Link>
            </div>
          </div>

          {/* About eBay */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">About eBay</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/company-info" className="text-gray-600 hover:text-blue-600">
                  Company info
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-blue-600">
                  News
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-gray-600 hover:text-blue-600">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-blue-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/diversity" className="text-gray-600 hover:text-blue-600">
                  Diversity & Inclusion
                </Link>
              </li>
              <li>
                <Link href="/global-impact" className="text-gray-600 hover:text-blue-600">
                  Global Impact
                </Link>
              </li>
              <li>
                <Link href="/government-relations" className="text-gray-600 hover:text-blue-600">
                  Government relations
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-600 hover:text-blue-600">
                  Advertise with us
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-gray-600 hover:text-blue-600">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/verified-rights-owner" className="text-gray-600 hover:text-blue-600">
                  Verified Rights Owner (VeRO) Program
                </Link>
              </li>
              <li>
                <Link href="/eci-licenses" className="text-gray-600 hover:text-blue-600">
                  eCI Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Contact / Community */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Help & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/seller-center" className="text-gray-600 hover:text-blue-600">
                  Seller Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-blue-600">
                  eBay Returns
                </Link>
              </li>
              <li>
                <Link href="/money-back-guarantee" className="text-gray-600 hover:text-blue-600">
                  eBay Money Back Guarantee
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold mb-4 mt-6 text-gray-900">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/announcements" className="text-gray-600 hover:text-blue-600">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-blue-600">
                  eBay Community
                </Link>
              </li>
              <li>
                <Link href="/business-podcast" className="text-gray-600 hover:text-blue-600">
                  eBay for Business Podcast
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold mb-4 mt-6 text-gray-900">eBay Sites</h3>
            <div className="relative">
              <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-blue-600 border border-gray-300 px-3 py-2 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold text-lg">🇺🇸</span>
                  <span>United States</span>
                </div>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
            <p>
              Copyright © 1995-2025 eBay Inc. All Rights Reserved.{' '}
              <Link href="/accessibility" className="text-blue-600 hover:underline">Accessibility</Link>,{' '}
              <Link href="/user-agreement" className="text-blue-600 hover:underline">User Agreement</Link>,{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy</Link>,{' '}
              <Link href="/consumer-health-data" className="text-blue-600 hover:underline">Consumer Health Data</Link>,{' '}
              <Link href="/payments-terms" className="text-blue-600 hover:underline">Payments Terms of Use</Link>,{' '}
              <Link href="/cookies" className="text-blue-600 hover:underline">Cookies</Link>,{' '}
              <Link href="/ca-privacy-notice" className="text-blue-600 hover:underline">CA Privacy Notice</Link>,{' '}
              <Link href="/your-privacy-choices" className="text-blue-600 hover:underline">Your Privacy Choices</Link>{' '}
              and{' '}
              <Link href="/adchoice" className="text-blue-600 hover:underline">AdChoice</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}