import { FAQItem, Testimonial } from "@/types";

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does QIFESS Travel manage overland excursions and dispatching?",
    answer:
      "QIFESS Travel integrates real-time collector bookings, regional dispatcher grouping, fleet checklists, crew availability, and inter-region ferry handovers into one unified control tower.",
    category: "perks",
  },
  {
    id: "faq-2",
    question: "How are BOP field allowances disbursed to Tour Managers?",
    answer:
      "Tour Managers submit BOP requests directly via QIFESS Travel. Business Managers review and approve requests, which are then cleared for bank transfer disbursal with complete audit logs.",
    category: "membership",
  },
  {
    id: "faq-3",
    question: "How do inter-region ferry handovers work between East Java and Bali?",
    answer:
      "During Java-Bali overland trips, Outgoing BM (Java) transfers vehicle, crew, and guest manifests at Ketapang Ferry Port to Incoming BM (Bali) with instant ASDP boarding pass verification.",
    category: "perks",
  },
  {
    id: "faq-4",
    question: "What vehicle safety checks are performed before deployment?",
    answer:
      "Every fleet vehicle undergoes a 9-category pre-deployment checklist (brakes, tires, engine oil, AC, emergency tools, cleanliness, fuel %) before being cleared by the Dispatcher.",
    category: "booking",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Victoria Sterling",
    role: "Lead Travel Coordinator, Apex Tours",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote:
      "QIFESS Travel transformed our East Java Bromo-Ijen operations. The real-time dispatch clearance and ferry handover management are flawless!",
    rating: 5,
    destination: "Bromo & Ijen, Indonesia",
    location: "Surabaya, ID",
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Fleet Operations Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote:
      "The 9-category vehicle checklist and digital fuel logbook saved our depot over 50 hours of paperwork each month.",
    rating: 5,
    destination: "Java-Bali Overland Corridor",
    location: "Banyuwangi, ID",
  },
];
