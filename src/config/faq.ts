import { FAQItem, Testimonial } from "@/types";

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does the WanderLuxe AI Concierge craft bespoke itineraries?",
    answer:
      "Our 2026 proprietary AI model analyzes your personal aesthetic preferences, dietary choices, mobility, and travel style alongside real-time satellite weather, foot-traffic data, and local insider recommendations to build minute-by-minute custom schedules.",
    category: "perks",
  },
  {
    id: "faq-2",
    question: "Can I cancel or pause my annual Travel Pass at any time?",
    answer:
      "Yes! All WanderLuxe memberships come with a 30-day money-back guarantee. You can pause or downgrade your tier directly in your profile dashboard with no penalty or hidden exit fees.",
    category: "membership",
  },
  {
    id: "faq-3",
    question: "How do room upgrades & VIP resort credits work?",
    answer:
      "Upon presenting your digital WanderLuxe Membership Pass at check-in with any of our 500+ partner resorts (Belmond, Aman, Four Seasons, St. Regis), room upgrades are instantly processed, and your $500 annual amenity credit is automatically applied to your room folio.",
    category: "perks",
  },
  {
    id: "faq-4",
    question: "Are flight bookings included with the Travel Pass?",
    answer:
      "Members enjoy direct wholesale access to commercial first-class and business-class fares with zero booking markup, as well as preferred seat pricing on our private jet seat sharing network.",
    category: "booking",
  },
  {
    id: "faq-5",
    question: "What happens if my travel plans change due to weather or emergencies?",
    answer:
      "All First Class and Jetsetter pass holders receive automatic complimentary VIP travel disruption protection. Our 24/7 human lifestyle team immediately rebooks cancelled flights and extends hotel stays at no additional cost.",
    category: "cancellation",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Victoria Sterling",
    role: "Managing Director, Apex Capital",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote:
      "WanderLuxe transformed our Kyoto anniversary into an unforgettable masterpiece. The private ryokan onsen reservation was impossible to get elsewhere. Flawless execution!",
    rating: 5,
    destination: "Kyoto, Japan",
    location: "London, UK",
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Tech Founder & Angel Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote:
      "The AI Concierge saved me 20+ hours of vacation planning for Amalfi Coast. The empty-leg private flight alert alone paid for my annual First Class Pass 10 times over.",
    rating: 5,
    destination: "Amalfi Coast, Italy",
    location: "San Francisco, USA",
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Architectural Designer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote:
      "The aesthetic of the platform matches the luxury of the destinations. From Bora Bora to Zermatt, every perk promised was honored at check-in effortlessly.",
    rating: 5,
    destination: "Bora Bora",
    location: "Zurich, Switzerland",
  },
];
