import mathBg from "../assets/maths-bg.jpeg";
import scienceBg from "../assets/science-bg.jpeg";
import englishBg from "../assets/english-bg.jpeg";
import socialBg from "../assets/social-bg.jpeg";
import ictBg from "../assets/ict-bg.jpeg";
import rmeBg from "../assets/rme-bg.jpeg";
import creativeArtsBg from "../assets/creative-arts-bg.jpeg";
import bdtBg from "../assets/bdt-bg.jpeg";
import ghLangBg from "../assets/gh-lang-bg.jpeg";
import frenchBg from "../assets/french-bg.jpeg";

import type { Subject } from "../features/types";


export const subjects: Subject[] = [
  { id: "social", name: "Social Studies", slug: "social-studies", image: socialBg, comingSoon: false },
  { id: "science", name: "Science", slug: "science", image: scienceBg, comingSoon: false },
  { id: "math", name: "Mathematics", slug: "mathematics", image: mathBg, comingSoon: false },
  { id: "english", name: "English", slug: "english", image: englishBg, comingSoon: false },
  { id: "ict", name: "Computing(ICT)", slug: "ict", image: ictBg, comingSoon: true },
  { id: "rme", name: "Religious & Moral Education", slug: "rme", image: rmeBg, comingSoon: true },
  { id: "creative-arts", name: "Creative Arts", slug: "creative-arts", image: creativeArtsBg, comingSoon: true },
  { id: "bdt", name: "Basic Design and Technology", slug: "bdt", image: bdtBg, comingSoon: true },
  { id: "ghanaian-language", name: "Ghanaian Language", slug: "ghanaian-language", image: ghLangBg, comingSoon: true },
  { id: "french", name: "French", slug: "french", image: frenchBg, comingSoon: true },
];

