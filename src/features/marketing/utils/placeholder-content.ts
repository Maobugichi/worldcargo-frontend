export interface ServiceItem {
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  { title: "Standard Delivery", description: "Reliable door-to-door delivery at everyday rates." },
  { title: "Express Delivery", description: "Faster turnaround for time-sensitive shipments." },
  { title: "International Shipping", description: "Cross-border delivery with full tracking end to end." },
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
  photo?: string; // optional path/URL to a headshot, e.g. "/images/testimonials/adaeze.jpg"
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "I had a customs hold on an international shipment and actually knew what was happening the whole time instead of guessing. That alone is worth it.",
    name: "Adaeze Okonkwo",
    role: "Small business owner",
  },
  {
    quote:
      "Switched our warehouse's outbound deliveries here after one too many 'where's my package' calls from customers. Those calls basically stopped.",
    name: "Michael Chen",
    role: "Operations lead, Northwind Goods",
  },
  {
    quote:
      "Express delivery actually meant express. Package showed up a day earlier than the estimate, and I got an email the moment it left the hub.",
    name: "Fatima Bello",
    role: "Frequent shipper",
  },
];