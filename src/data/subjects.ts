import mathBg from "../assets/maths-bg.jpeg";
import scienceBg from "../assets/science-bg.jpeg";
import englishBg from "../assets/english-bg.jpeg";
import socialBg from "../assets/social-bg.jpeg";
import ictBg from "../assets/ict-bg.jpeg";

import type { Subject } from "../features/types";


export const subjects: Subject[] = [
  { id: "math", name: "Mathematics", slug: "mathematics", image: mathBg, comingSoon: false },
  { id: "science", name: "Science", slug: "science", image: scienceBg, comingSoon: false },
  { id: "english", name: "English", slug: "english", image: englishBg, comingSoon: false },
  { id: "social", name: "Social Studies", slug: "social-studies", image: socialBg, comingSoon: false },
  { id: "ict", name: "History", slug: "history", image: ictBg, comingSoon: true },
];

