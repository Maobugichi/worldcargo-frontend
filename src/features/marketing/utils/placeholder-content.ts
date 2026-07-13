export interface ServiceItem {
  title: string;
  description: string;
  features?: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Standard Delivery",
    description: "Reliable door-to-door delivery at everyday rates.",
    features: [
      "3–5 business day delivery",
      "Real-time tracking included",
      "Signature on delivery available",
    ],
  },
  {
    title: "Express Delivery",
    description: "Faster turnaround for time-sensitive shipments.",
    features: [
      "Next-day delivery in most regions",
      "Priority handling at every hub",
      "SMS and email status alerts",
    ],
  },
  {
    title: "International Shipping",
    description: "Cross-border delivery with full tracking end to end.",
    features: [
      "Customs documentation handled for you",
      "Delivery to 150+ countries",
      "End-to-end tracking across borders",
    ],
  },
  {
    title: "Freight & Bulk",
    description: "Palletized and bulk freight for large-volume shipments.",
    features: [
      "Full and partial truckload options",
      "Dedicated freight coordinator",
      "Volume-based pricing",
    ],
  },
  {
    title: "Warehousing & Storage",
    description: "Short and long-term storage with on-demand fulfillment.",
    features: [
      "Climate-controlled facilities",
      "Pick, pack, and ship on request",
      "Live inventory visibility",
    ],
  },
  {
    title: "Shipment Insurance",
    description: "Added protection and coverage for high-value shipments.",
    features: [
      "Coverage up to full declared value",
      "Fast claims processing",
      "No paperwork at drop-off",
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "How do I track my shipment?",
    answer: "Enter your tracking number on the homepage or the Track page to see its current status and full history.",
  },
  {
    question: "My tracking number isn't working. What do I do?",
    answer: "Double-check the number for typos. If it still doesn't work, reach out through the Contact page and we'll look into it.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, international shipping is available -- see the Services page for details.",
  },
  {
    question: "How do I get email updates about my shipment?",
    answer: "Once you look up your tracking number, you'll see an option to enter your email and get notified at every status change.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery times vary by service and destination. Check the estimated delivery date shown on your tracking page.",
  },
  {
    question: "What if my package shows an exception status?",
    answer: "An exception means there's an issue that needs attention (e.g. a customs hold or delay). Check the timeline on your tracking page for details, or contact us for help.",
  },
];

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  photo?: string; 
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "I had a customs hold on an international shipment and actually knew what was happening the whole time instead of guessing. That alone is worth it.",
    name: "Emily Carter",
    role: "Small business owner",
    photo:'/andy.jpg'
  },
  {
    quote:
      "We switched our warehouse's outbound deliveries here after one too many 'where's my package' calls from customers. Those calls basically stopped.",
    name: "Oliver Bennett",
    role: "Operations lead, Bennett & Sons Logistics",
    photo:'/bruce.jpg'
  },
  {
    quote:
      "Express delivery actually meant express. My package showed up a day earlier than the estimate, and I got an email the moment it left the hub.",
    name: "Émilie Tremblay",
    role: "Frequent shipper",
     photo:'/diego.jpg'
  },
];