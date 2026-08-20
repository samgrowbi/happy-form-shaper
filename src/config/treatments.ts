import treatmentImage from "@/assets/treatment-facial.webp";
import stepConsultationImg from "@/assets/thankyou/consultation.webp";
import stepPreparationImg from "@/assets/thankyou/skin-preparation.webp";
import stepSessionImg from "@/assets/thankyou/treatment-session.webp";
import stepPostCareImg from "@/assets/thankyou/post-treatment-care.webp";
import bodyConsultationImg from "@/assets/body-consultation.webp";
import bodyPreparationImg from "@/assets/body-preparation.webp";
import bodySessionImg from "@/assets/body-session.webp";
import bodyPostTreatmentImg from "@/assets/body-post-treatment.webp";
import bodyHeather from "@/assets/before-after/body_heather.webp.asset.json";
import bodyChloe from "@/assets/before-after/body_chloe.webp.asset.json";
import bodyDaniela from "@/assets/before-after/body_daniela.webp.asset.json";
import bodyEmily from "@/assets/before-after/body_emily.webp.asset.json";
import bodyTatiana from "@/assets/before-after/body_tatiana.webp.asset.json";

export interface BeforeAfterResult {
  id: number;
  /** For split before/after cards */
  before?: string;
  after?: string;
  /** For composite images that already contain before+after */
  composite?: string;
  label: string;
  name?: string;
  age?: number;
}

export interface TreatmentConfig {
  /** URL slug, e.g. "led" or "led-cryo" */
  slug: string;
  /** Display label used in hero, technology, booking header */
  label: string;
  /** Hero heading lines (supports JSX-safe plain strings) */
  heroTitle: {
    line1: string;
    highlight: string;
    line2: string;
  };
  /** Hero subtitle */
  heroSubtitle: string;
  /** Hero video URL */
  heroVideoUrl: string;
  /** Pricing */
  price: string;
  originalPrice: string;
  /** Acuity IDs */
  appointmentTypeId: string;
  calendarId: string;
  /** Duration in minutes (display only – Acuity controls actual duration) */
  duration: number;
  /** Treatment image */
  image: string;
  /** Technology section copy */
  technologyDescription: string[];
  /** Technology section title override */
  technologyTitle?: { main: string; highlight: string };
  /** Technology highlights */
  technologyHighlights: { text: string; title?: string; description?: string }[];
  /** Whether to hide the device image in technology section */
  hideDeviceImage?: boolean;
  /** FAQ entries */
  faqs: { question: string; answer: string }[];
  /** Before/after results – if provided, overrides the default facial results */
  beforeAfterResults?: BeforeAfterResult[];
  /** Video testimonials – if provided, overrides the default feedback videos */
  feedbackTestimonials?: { id: number; name: string; video: string; poster?: string; text: string }[];
  /** Visit steps – if provided, overrides default steps */
  visitSteps?: { title: string; description: string; image?: string }[];
  /** Client text reviews – if provided, overrides default facial reviews */
  clientReviews?: { id: number; name: string; image: string; timeAgo: string; rating: number; review: string }[];
  /** About section video URL override */
  aboutVideoUrl?: string;
  /** Whether to hide the Expert Opinion section */
  hideExpertOpinion?: boolean;
  /** Problem/Solution section overrides */
  problemSolution?: {
    hook?: { line1: string; line2: string };
    hookNote?: string;
    signs: string[];
    outcomeTitle: string;
    outcomeHighlight: string;
    outcomeDescription: string;
    badgeText: string;
    emotionalClose?: { text: string; highlight: string };
  };
  /** "Who Is This For?" section overrides (falls back to the default facial concerns) */
  whoIsThisFor?: {
    subtitle?: string;
    concerns: string[];
  };
  /** "Feel Comfortable In Your Skin" section overrides */
  feelComfortable?: {
    problemCopy: string;
    bridgeLine?: { text: string; highlight: string };
    benefits: { title: string; description: string }[];
  };
  /** Thank-you page copy overrides */
  thankYou?: {
    noteLine?: string;
    description?: string;
    visitIncludes?: string[];
    timeline?: { title: string; duration: string | null; description: string }[];
    preparation?: string[];
  };
  /**
   * Sofia chatbot intake fields (mapped to Acuity custom fields).
   * Independent from the on-page BookingForm which fetches fields live from acuity-forms.
   */
  intakeFields?: ChatIntakeField[];
}

export interface ChatIntakeField {
  acuityFieldId: number;
  label: string;
  type: "checkboxes" | "radio" | "select" | "text" | "textarea" | "yesno";
  options?: string[];
  required: boolean;
  helpText?: string;
}

export const LED_TREATMENT: TreatmentConfig = {
  slug: "led",
  label: "Non-Surgical Face & Neck Lift Treatment",
  heroTitle: {
    line1: "Non-Surgical",
    highlight: "Face & Neck Lift",
    line2: "Treatment",
  },
  heroSubtitle:
    "No Surgery. No Pain. Zero Downtime.",
  heroVideoUrl:
    "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/03d0b648661d422d782f64fd6d137df5/manifest/video.m3u8",
  price: "69.99",
  originalPrice: "299.99",
  appointmentTypeId: "89238158",
  calendarId: "13553882",
  duration: 60,
  image: treatmentImage,
  technologyDescription: [
    "Our Non-Surgical Facelift treatment delivers specific wavelengths of light energy into the skin's deeper layers, activating the body's own natural healing process of collagen production and cellular repair. The facial is entirely non-invasive, without heat, injectables, or foreign substances.",
  ],
  technologyHighlights: [
    { text: "Clinically tested" },
    { text: "Safe for all skin types and tones" },
  ],
  hideDeviceImage: true,
  faqs: [
    {
      question: "Who is this treatment for?",
      answer:
        "The treatment is suitable for anyone over 35 experiencing visible signs of skin aging, such as fine lines, loss of firmness, uneven skin tone, or a tired-looking complexion. Compared to surgical treatments and injectables, our Non-surgical Lift & Skin Tightening Facial treatment is safer, more affordable, requires no downtime, and delivers completely natural-looking results.",
    },
    {
      question: "How does it work?",
      answer:
        "Our Non-Surgical Face & Neck Lift Treatment uses specific wavelengths of light energy to penetrate deep into the skin's layers, activating collagen production and cellular repair. The result is visibly smoother skin, restored firmness, and improved tone and texture.",
    },
    {
      question: "Is it painful?",
      answer:
        "Not at all. The treatment is designed to be comfortable and relaxing, with most clients describing it as a calming, soothing experience.",
    },
    {
      question: "Is it safe?",
      answer:
        "Yes. Our certified devices are clinically tested, non-invasive, and safe for all skin types and tones. There are no foreign substances entering your body and no risk of burns or damage. If you have a specific medical condition or take photosensitive medication, let us know before your visit, and our esthetician will advise you.",
    },
    {
      question: "Can I combine this with other treatments?",
      answer:
        "Yes. Our Non-Surgical Face & Neck Lift Treatment is compatible with a range of other aesthetic services. Your esthetician will be happy to discuss what works best alongside this session during your first visit.",
    },
    {
      question: "When will I see results?",
      answer:
        "Most clients notice brighter, refreshed skin immediately after their first session. Results continue to develop over the following days as your skin responds. With a course of sessions, improvements become increasingly visible and longer lasting.",
    },
    {
      question: "How long do results last?",
      answer:
        "Results vary by skin, age, and lifestyle. A single session delivers immediate radiance and visible improvement. For results that last and continue to build, a course of treatments is recommended. Your esthetician will advise on the best plan for your skin at your first visit.",
    },
    {
      question: "What happens after the treatment?",
      answer:
        "You can return to your normal routine immediately, including makeup, work, and exercise. There is no downtime and no redness to manage. Your esthetician will provide simple aftercare guidance at the end of your visit to help maintain and build on your results.",
    },
  ],
};

export const LED_CRYO_TREATMENT: TreatmentConfig = {
  slug: "led-cryo",
  label: "LED + Cryo Face & Neck Lift Treatment",
  heroTitle: {
    line1: "LED + Cryo",
    highlight: "Face & Neck Lift",
    line2: "Treatment",
  },
  heroSubtitle:
    "Experience the revolutionary lifting technology that rejuvenates your skin instantly without any downtime.",
  heroVideoUrl:
    "https://pub-eb17aaa123fc4145b1ee4c15fc2e5771.r2.dev/Med%20Spa/Hero%20Video/LED%20Hero%20Video.mp4",
  price: "89.99",
  originalPrice: "349.99",
  appointmentTypeId: "91765523",
  calendarId: "11004724",
  duration: 75,
  image: treatmentImage,
  technologyDescription: [
    "Our LED + Cryo Face & Neck Lift treatment delivers specific wavelengths of light energy into the skin's deeper layers, activating the body's own natural healing process of collagen production and cellular repair. The facial is entirely non-invasive, without heat, injectables, or foreign substances.",
  ],
  technologyHighlights: [
    { text: "Clinically tested" },
    { text: "Safe for all skin types and tones" },
  ],
  hideDeviceImage: true,
  faqs: [
    {
      question: "How does the Face & Neck Lift + Cryo Treatment work?",
      answer:
        "The treatment combines LED light therapy with cryotherapy to stimulate collagen production, tighten skin, and reduce inflammation. The LED penetrates deep into the dermis while cryo helps depuff and firm the skin for immediate visible results.",
    },
    {
      question: "Is the treatment painful?",
      answer:
        "Not at all. The treatment is designed to be comfortable and relaxing, with most clients describing it as a warm, soothing experience followed by a refreshing cool sensation from the cryo component.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results are cumulative and improve with each session. Many clients see immediate improvements that continue to develop over the following days. A series of treatments is recommended for optimal, long-lasting results.",
    },
    {
      question: "Is there any downtime?",
      answer:
        "No downtime at all. You can return to your normal routine immediately after the session. Many clients schedule treatments during lunch breaks.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "Many clients notice an immediate refreshed, lifted look right after the first session, with continued improvement as the skin responds over time.",
    },
  ],
  intakeFields: [
    {
      acuityFieldId: 18044943,
      label: "Please tick your main concerns",
      type: "checkboxes",
      required: true,
      options: [
        "Sagging Neck",
        "Sagging Cheeks",
        "Fine Lines",
        "Wrinkles",
        "Acne",
        "Pigmentation",
        "Sun Damage",
        "Dark Circles",
        "Rosacea",
        "Big Pores",
        "Skin Texture",
        "No Concerns",
      ],
    },
    {
      acuityFieldId: 18044944,
      label: "Please specify your age range",
      type: "radio",
      required: true,
      options: ["Below 20", "21-34", "35-49", "50-65", "66+"],
    },
    {
      acuityFieldId: 18044945,
      label: "I agree to the promotional cancellation policy",
      type: "yesno",
      required: true,
      helpText:
        "Promotional appointments can be rescheduled once, at least 24 hours in advance. No-shows or late reschedules forfeit the promo.",
    },
    {
      acuityFieldId: 18044951,
      label: "I agree to receive SMS + email appointment reminders",
      type: "yesno",
      required: true,
    },
  ],
};

export const BODY_SCULPTING_TREATMENT: TreatmentConfig = {
  slug: "ems",
  label: "Body Cavitation Fat Reduction Treatment",
  heroTitle: {
    line1: "Body Cavitation",
    highlight: "Fat Reduction",
    line2: "Treatment",
  },
  heroSubtitle:
    "Experience the revolutionary body cavitation technology that tones muscles and reduces fat instantly without any downtime.",
  heroVideoUrl:
    "https://growbi.b-cdn.net/Hero%20Video/Takkra%20Body%20Sculpting.mp4",
  price: "79.99",
  originalPrice: "599.99",
  appointmentTypeId: "89277707",
  calendarId: "13553882",
  duration: 60,
  image: treatmentImage,
  technologyDescription: [
    "Get ready to feel confident and radiant with Body Cavitation. Imagine a natural, non-surgical treatment that tones your muscles, melts away stubborn fat, and smooths out cellulite.",
    "And suddenly, what you see in the mirror doesn't match how you feel inside.",
    "This treatment is designed to change that.",
    "This non-invasive treatment awakens your body's natural transformation potential, delivering visible, lasting results without any downtime.",
  ],
  technologyTitle: { main: "Advanced Body Cavitation for", highlight: "Visible Results" },
  hideDeviceImage: true,
  technologyHighlights: [
    { text: "Say goodbye to cellulite with smoother, dimple-free skin", title: "Say Goodbye to Cellulite", description: "Enjoy smoother, dimple-free skin that you'll love to show off." },
    { text: "Feel leaner and stronger with toned muscles and less stubborn fat", title: "Feel Leaner and Stronger", description: "Watch as your body firms up naturally, with toned muscles and less stubborn fat." },
    { text: "Experience long-lasting firmness with a sculpted, contoured look", title: "Experience Long-Lasting Firmness", description: "Revel in a more sculpted, contoured look with skin that feels tight and smooth." },
  ],
  faqs: [
    {
      question: "How soon can I expect to see results?",
      answer:
        "Many clients notice visible improvements after their first session, with continued enhancement over time. A series of treatments is recommended for optimal, long-lasting results.",
    },
    {
      question: "Is the treatment painful?",
      answer:
        "Not at all. The treatment is designed to be comfortable and relaxing. Most clients describe it as a warm, soothing experience with gentle muscle contractions.",
    },
    {
      question: "Is there any downtime?",
      answer:
        "No downtime at all. You can return to your normal routine immediately after the session. Many clients schedule treatments during lunch breaks.",
    },
    {
      question: "How long is the treatment?",
      answer:
        "Each session takes approximately 60 minutes. We recommend arriving a few minutes early for your first visit.",
    },
    {
      question: "How should I prepare for my treatment?",
      answer:
        "No special preparation is needed. Simply wear comfortable clothing and stay hydrated. Avoid heavy meals right before your appointment.",
    },
  ],
  beforeAfterResults: [
    { id: 1, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a05d900b60e1b475557b9_BA1.jpeg", label: "Body Contouring" },
    { id: 2, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a05e7c400512d0c4317f6_BA2.jpeg", label: "Fat Reduction" },
    { id: 3, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a0606853ecaa0e283d832_BA3.jpeg", label: "Cellulite Treatment" },
    { id: 4, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a0616e6fa1365e1af68ab_BA4.jpeg", label: "Muscle Toning" },
    { id: 5, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a062594fb46324cd230ca_BA5.jpeg", label: "Skin Tightening" },
    { id: 6, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a0638054f50fa0260bf63_BA6.jpeg", label: "Body Cavitation" },
    { id: 7, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a0654a660916951396e18_BA7.png", label: "Abdomen Contouring" },
    { id: 8, composite: "https://cdn.prod.website-files.com/675c3e115f240194d06e370c/681a06666983359c983c5dd3_BA8.png", label: "Full Body Transformation" },
    { id: 9, composite: bodyHeather.url, label: "Body Cavitation", name: "Heather", age: 48 },
    { id: 10, composite: bodyChloe.url, label: "Body Contouring", name: "Chloe", age: 32 },
    { id: 11, composite: bodyDaniela.url, label: "Fat Reduction", name: "Daniela", age: 29 },
    { id: 12, composite: bodyEmily.url, label: "Muscle Toning", name: "Emily", age: 35 },
    { id: 13, composite: bodyTatiana.url, label: "Skin Tightening", name: "Tatiana", age: 41 },
  ],
  feedbackTestimonials: [
    { id: 1, name: "Michelle", video: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/db126ce70e683df185bbd4ed52b68d87/manifest/video.m3u8", poster: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/db126ce70e683df185bbd4ed52b68d87/thumbnails/thumbnail.jpg?time=1s&height=800", text: "Amazing body cavitation results!" },
    { id: 2, name: "Dana", video: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/6331eeccec7b453719621b2395312236/manifest/video.m3u8", poster: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/6331eeccec7b453719621b2395312236/thumbnails/thumbnail.jpg?time=1s&height=800", text: "I can really see the difference in my body." },
    { id: 3, name: "Laura", video: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/60b57bf111ef1c1b7f50602a634c95e1/manifest/video.m3u8", poster: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/60b57bf111ef1c1b7f50602a634c95e1/thumbnails/thumbnail.jpg?time=1s&height=800", text: "The treatment really works. I feel so confident!" },
    { id: 4, name: "Jessica", video: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/6fd2f2b340bb5059130b8161ecc19e56/manifest/video.m3u8", poster: "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/6fd2f2b340bb5059130b8161ecc19e56/thumbnails/thumbnail.jpg?time=1s&height=800", text: "Incredible transformation. Highly recommend!" },
  ],
  visitSteps: [
    { title: "Consultation & Body Assessment", description: "A personalized assessment to understand your body goals, target areas, and create your custom cavitation plan.", image: bodyConsultationImg },
    { title: "Body Preparation", description: "The target area is prepped and positioning is optimized to ensure maximum effectiveness during your session.", image: bodyPreparationImg },
    { title: "Body Cavitation Session", description: "Advanced non-invasive technology works to tone muscles, reduce fat, and contour your body with zero downtime.", image: bodySessionImg },
    { title: "Post-Treatment Guidance", description: "You'll receive aftercare tips and hydration guidance to support optimal fat reduction and muscle toning results.", image: bodyPostTreatmentImg },
  ],
  aboutVideoUrl: "https://pub-eb17aaa123fc4145b1ee4c15fc2e5771.r2.dev/Med%20Spa/Body/lumiere%20new.mp4",
  clientReviews: [
    { id: 1, name: "Jessica Taylor", image: "https://randomuser.me/api/portraits/women/45.jpg", timeAgo: "JUL 3, 2026", rating: 5, review: "I couldn't believe how much my abdomen changed after just a few sessions. My clothes fit so much better now!" },
    { id: 2, name: "Monica Rivera", image: "https://randomuser.me/api/portraits/women/50.jpg", timeAgo: "JUN 25, 2026", rating: 5, review: "Finally got rid of the stubborn belly fat that wouldn't budge no matter how much I worked out. This treatment is a game changer." },
    { id: 3, name: "Tanya Brooks", image: "https://randomuser.me/api/portraits/women/54.jpg", timeAgo: "JUL 14, 2026", rating: 5, review: "The cellulite on my thighs has reduced so much. I feel confident wearing shorts again for the first time in years." },
    { id: 4, name: "Lauren Kim", image: "https://randomuser.me/api/portraits/women/38.jpg", timeAgo: "JUN 30, 2026", rating: 5, review: "I was skeptical about non-surgical body cavitation but the results speak for themselves. My waist is noticeably more contoured." },
    { id: 5, name: "Angela Martinez", image: "https://randomuser.me/api/portraits/women/72.jpg", timeAgo: "JUL 9, 2026", rating: 5, review: "Love the muscle toning effect! My arms and abs feel firmer than they have in years. Zero downtime too." },
    { id: 6, name: "Christine Davis", image: "https://randomuser.me/api/portraits/women/29.jpg", timeAgo: "JUL 17, 2026", rating: 5, review: "The staff made me feel so comfortable. The treatment was relaxing and the results have been incredible on my midsection." },
    { id: 7, name: "Natalie Wong", image: "https://randomuser.me/api/portraits/women/82.jpg", timeAgo: "JUN 22, 2026", rating: 5, review: "After having kids, I thought I'd never get my body back. This treatment has been life-changing for my confidence!" },
    { id: 8, name: "Brianna Foster", image: "https://randomuser.me/api/portraits/women/61.jpg", timeAgo: "JUL 11, 2026", rating: 5, review: "I've done three sessions and can already see a huge difference in my love handles. So worth it!" },
  ],
  hideExpertOpinion: true,
  problemSolution: {
    signs: [
      "Stubborn fat that won't budge despite diet & exercise",
      "Cellulite making you self-conscious",
      "Loss of muscle tone and definition",
      "Clothes not fitting the way they used to",
      "Feeling uncomfortable in swimwear or fitted clothing",
      "Wanting a more sculpted, contoured body shape",
    ],
    outcomeTitle: "Feel confident in your body again",
    outcomeHighlight: "sculpted, toned, and naturally contoured",
    outcomeDescription: "Designed to reduce stubborn fat, tone muscles, and smooth cellulite, giving you visible results",
    badgeText: "Ideal for women 35+ wanting to sculpt and tone without surgery",
    hook: { line1: "If you've ever looked in the mirror", line2: "and thought… \"I used to feel so confident\"" },
    hookNote: "Your body is ready for a change.",
    emotionalClose: { text: "This isn't just about your body. It's about", highlight: "feeling confident again." },
  },
  intakeFields: [
    {
      acuityFieldId: 18044945,
      label: "I agree to the promotional cancellation policy",
      type: "yesno",
      required: true,
      helpText:
        "Promotional appointments can be rescheduled once, at least 24 hours in advance. No-shows or late reschedules forfeit the promo.",
    },
    {
      acuityFieldId: 18044951,
      label: "I agree to receive SMS + email appointment reminders",
      type: "yesno",
      required: true,
    },
  ],
};

// Instant Lift treatment - duplicate of LED with different appointment type
export const INSTANT_LIFT_TREATMENT: TreatmentConfig = {
  ...LED_TREATMENT,
  slug: "instant-lift",
  label: "Instant Lift & Skin Tightening Treatment",
  appointmentTypeId: "93509464",
  calendarId: "14112013",
  price: "79.99",
  originalPrice: "349.99",
  duration: 60,
  technologyDescription: [
    "Our Instant Lift & Skin Tightening treatment delivers specific wavelengths of light energy into the skin's deeper layers, activating the body's own natural healing process of collagen production and cellular repair. The facial is entirely non-invasive, without heat, injectables, or foreign substances.",
  ],
};

// Facial Cryotherapy - standalone treatment page (/facial-cryotherapy)
export const FACIAL_CRYO_TREATMENT: TreatmentConfig = {
  slug: "facial-cryotherapy",
  label: "Facial Cryotherapy Treatment",
  heroTitle: {
    line1: "Facial",
    highlight: "Cryotherapy",
    line2: "Treatment",
  },
  heroSubtitle: "No Surgery. No Pain. Zero Downtime.",
  heroVideoUrl:
    "https://customer-vgdtdepv6dn1f10z.cloudflarestream.com/03d0b648661d422d782f64fd6d137df5/manifest/video.m3u8",
  price: "79.99",
  originalPrice: "399.99",
  appointmentTypeId: "97274146",
  calendarId: "13553882",
  duration: 60,
  image: treatmentImage,
  technologyTitle: { main: "Advanced Facial Cryotherapy for", highlight: "Visible Results" },
  technologyDescription: [
    "Our Facial Cryotherapy treatment uses controlled cooling to instantly tighten the skin, calm inflammation, and stimulate circulation across the face and neck. The sudden drop in temperature triggers your body's natural response, sending fresh, oxygen-rich blood to the surface for an immediate lift and glow.",
    "The treatment is entirely non-invasive, with no heat, injectables, or foreign substances, and no downtime afterwards.",
  ],
  technologyHighlights: [
    { text: "Clinically tested" },
    { text: "Safe for all skin types and tones" },
  ],
  hideDeviceImage: true,
  whoIsThisFor: {
    subtitle: "Anyone looking to depuff, tighten, and refresh their skin instantly",
    concerns: [
      "Puffiness & Facial Swelling",
      "Loss of Firmness & Sagging",
      "Dull or Tired-Looking Complexion",
      "Redness & Skin Irritation",
      "Enlarged Pores & Rough Texture",
      "Under-Eye Puffiness & Dark Circles",
    ],
  },
  feelComfortable: {
    problemCopy:
      "Skin that looks puffy, tired, and dull isn't always about age. Poor circulation, inflammation, and everyday stress leave the face swollen and lacking definition, and no cream can cool and reset the skin the way controlled cryotherapy can.",
    bridgeLine: { text: "Your skin needs a reset.", highlight: "Cryotherapy delivers it." },
    benefits: [
      {
        title: "Depuffs & Defines Instantly",
        description: "Controlled cooling reduces swelling for a sharper jawline and brighter eyes",
      },
      {
        title: "Tightens & Firms The Skin",
        description: "Cold therapy contracts pores and boosts firmness for a lifted look",
      },
      {
        title: "Calms Redness & Boosts Glow",
        description: "Soothes irritation and drives circulation for a healthy, natural radiance",
      },
    ],
  },
  visitSteps: [
    {
      title: "Consultation & Skin Analysis",
      description: "A brief, personalized assessment to understand your skin concerns and treatment goals.",
      image: stepConsultationImg,
    },
    {
      title: "Expert Skin Preparation",
      description: "Your skin is gently cleansed and prepped so the cooling reaches the skin evenly.",
      image: stepPreparationImg,
    },
    {
      title: "Facial Cryotherapy Session",
      description: "Controlled cooling is guided across the face and neck to depuff, tighten, and refresh the skin.",
      image: stepSessionImg,
    },
    {
      title: "Post-Treatment Care & Guidance",
      description: "Soothing skincare is applied, along with clear aftercare guidance to support optimal results.",
      image: stepPostCareImg,
    },
  ],
  clientReviews: [
    { id: 1, name: "Isabella Rodriguez", image: "https://randomuser.me/api/portraits/women/44.jpg", timeAgo: "AUG 2, 2026", rating: 5, review: "I booked the cryo facial before a wedding and honestly my face has never looked this snatched. The puffiness was gone within minutes and my makeup sat so much better." },
    { id: 2, name: "Sarah Mitchell", image: "https://randomuser.me/api/portraits/women/68.jpg", timeAgo: "JUL 29, 2026", rating: 5, review: "The cold sounds scary but it's actually so refreshing. My jawline looks more defined and the redness on my cheeks calmed right down. Booking again next month." },
    { id: 3, name: "Gabriela Santos", image: "https://randomuser.me/api/portraits/women/33.jpg", timeAgo: "AUG 9, 2026", rating: 5, review: "My skin is super sensitive and this was the first treatment that didn't leave me irritated. Just calm, tight, glowy skin. I was genuinely shocked." },
    { id: 4, name: "Amanda Rose", image: "https://randomuser.me/api/portraits/women/85.jpg", timeAgo: "JUL 24, 2026", rating: 5, review: "I wake up puffy every single morning. After the cryotherapy session my under eyes looked so much brighter and it lasted for days." },
    { id: 5, name: "Carolina Herrera", image: "https://randomuser.me/api/portraits/women/91.jpg", timeAgo: "AUG 6, 2026", rating: 5, review: "60 minutes of pure relaxation and I walked out looking like I'd slept 10 hours. My pores look smaller too. Worth every penny." },
    { id: 6, name: "Rachel Johnson", image: "https://randomuser.me/api/portraits/women/26.jpg", timeAgo: "AUG 12, 2026", rating: 5, review: "I've done facials for years and nothing gave me this instant lift. My skin felt firm and tight straight away with zero downtime." },
    { id: 7, name: "Valentina Cruz", image: "https://randomuser.me/api/portraits/women/17.jpg", timeAgo: "JUL 27, 2026", rating: 5, review: "The cryo really helped my breakouts settle. Less inflammation, less redness, and my texture is smoother than it's been in ages." },
    { id: 8, name: "Diana Miller", image: "https://randomuser.me/api/portraits/women/63.jpg", timeAgo: "AUG 4, 2026", rating: 5, review: "Such a calming experience and the results were immediate. My cheeks looked lifted and my whole face just looked awake again." },
    { id: 9, name: "Sofia Morales", image: "https://randomuser.me/api/portraits/women/79.jpg", timeAgo: "AUG 14, 2026", rating: 5, review: "Total skeptic here. But my face looked visibly tighter the second I got off the bed, and my friends kept asking what I'd had done." },
  ],
  thankYou: {
    noteLine:
      "It is a real, results-driven treatment performed by trained professionals who specialize in advanced skincare technology.",
    description:
      "Our Facial Cryotherapy treatment uses controlled cooling to depuff, tighten, and calm the skin, boosting circulation for an immediate lift and a natural, healthy glow.",
    visitIncludes: [
      "A professional consultation",
      "A customized facial cryotherapy session",
      "Personalized recommendations based on your goals",
    ],
    timeline: [
      { title: "Check-In", duration: "5 minutes", description: "Confirm your goals and medical intake." },
      { title: "Professional Consultation", duration: "10-15 minutes", description: "We assess your skin and explain exactly how facial cryotherapy works." },
      { title: "Facial Cryotherapy Session", duration: null, description: "Comfortable, non-invasive, and guided by a specialist." },
      { title: "Optional Next Steps", duration: null, description: "Only if you want to enhance or extend your results." },
    ],
    preparation: [
      "Arrive 5-10 minutes early",
      "Stay hydrated",
      "Come with a clean face where possible, makeup can be removed on arrival",
      "Avoid heavy lotions on the treatment area",
      "Bring any questions you may have",
    ],
  },
  faqs: [
    {
      question: "Who is this treatment for?",
      answer:
        "Facial Cryotherapy suits anyone wanting to depuff, tighten, and refresh their skin. It is especially effective for puffiness, dullness, redness, enlarged pores, and skin that has lost its firmness. It is non-invasive, requires no downtime, and is safe for all skin types and tones.",
    },
    {
      question: "How does it work?",
      answer:
        "Controlled cooling is guided across the face and neck. The drop in temperature constricts blood vessels and then triggers a rush of fresh, oxygen-rich blood to the surface. That process reduces swelling and inflammation, tightens the skin, and leaves the complexion firmer and brighter.",
    },
    {
      question: "Is it painful?",
      answer:
        "Not at all. Most clients describe it as a refreshing, invigorating cool sensation. The temperature is carefully controlled throughout and your esthetician will adjust to keep you comfortable.",
    },
    {
      question: "Is it safe?",
      answer:
        "Yes. The treatment is non-invasive, uses no injectables or foreign substances, and is safe for all skin types and tones. If you have a specific medical condition, such as cold sensitivity or Raynaud's, let us know before your visit and our esthetician will advise you.",
    },
    {
      question: "How long is the treatment?",
      answer:
        "Each session takes approximately 60 minutes. We recommend arriving a few minutes early for your first visit.",
    },
    {
      question: "When will I see results?",
      answer:
        "Results are immediate. Most clients leave with visibly depuffed, tighter, brighter skin straight after the first session. With a course of sessions, firmness and tone continue to improve.",
    },
    {
      question: "How long do results last?",
      answer:
        "The instant lift and depuffing typically lasts several days. For longer lasting firmness and tone, a course of treatments is recommended. Your esthetician will advise on the best plan for your skin at your first visit.",
    },
    {
      question: "What happens after the treatment?",
      answer:
        "You can return to your normal routine immediately, including makeup, work, and exercise. There is no downtime and no redness to manage. Your esthetician will provide simple aftercare guidance at the end of your visit.",
    },
  ],
  intakeFields: [
    {
      acuityFieldId: 18044945,
      label: "I agree to the promotional cancellation policy",
      type: "yesno",
      required: true,
      helpText:
        "Promotional appointments can be rescheduled once, at least 24 hours in advance. No-shows or late reschedules forfeit the promo.",
    },
    {
      acuityFieldId: 18044951,
      label: "I agree to receive SMS + email appointment reminders",
      type: "yesno",
      required: true,
    },
  ],
};

// Standalone LED page (/led) - duplicate of the homepage LED treatment with its own appointment type
export const LED_PAGE_TREATMENT: TreatmentConfig = {
  ...LED_TREATMENT,
  slug: "led-page",
  appointmentTypeId: "97010057",
};
