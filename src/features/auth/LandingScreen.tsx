import { Button } from "../../components/Button";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/student.jpeg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ArrowBigRight } from "lucide-react";

const SUBJECTS = [
  { name: "Math", blurb: "Number work, algebra, and geometry from your BECE syllabus." },
  { name: "English", blurb: "Reading, writing, and comprehension skills." },
  { name: "Science", blurb: "Integrated science topics, explained simply." },
  { name: "Social Studies", blurb: "Citizenship, history, and everyday life topics." },
];

const STEPS = [
  { title: "Pick a subject", body: "Choose from Math, English, Science, or Social Studies." },
  { title: "Go through the topic", body: "Follow the curriculum, topic by topic, at your own pace." },
  { title: "Watch or read the lesson", body: "Video and reading resources for every subtopic." },
  { title: "Take the quiz", body: "Test what you've learned and track your progress." },
];

export function LandingScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* NAV */}
      <nav className="flex justify-between items-center px-4 max-sm:py-3 pt-5 md:px-10 md:py-4">
        <img src={logo} alt="PaceMate logo" className="w-25 md:w-30 transition-transform duration-200 hover:scale-105" />
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            type="button"
            onClick={() => navigate(routes.login())}
            styles="w-25 md:w-25 bg-transparent border text-xs border-orange-400 text-orange-400  py-1.5 text-sm md:py-2 md:text-base transition-all duration-200 hover:bg-orange-400/10 active:scale-95"
          >
            SIGN IN
          </Button>
          <Button
            type="button"
            onClick={() => navigate(routes.signup())}
            styles="bg-orange-400 text-amber-50 px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-base"
          >
            SIGN UP
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col max-md:flex-col-reverse md:flex-row md:items-center gap-6 md:gap-12 px-4 py-8 md:px-10 md:py-16 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-4 md:gap-6 md:w-1/2 max-md:text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Extra tuition for JHS students, right from home
          </h1>
          <p className="text-sm md:text-lg text-gray-700">
            Missed a class? Need more help than your teacher has time for?
            PaceMate gives you curriculum-aligned lessons, videos, reading, and
            quizzes for Math, English, Science, and Social Studies — free,
            whenever you have time to study.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 ">
            <Button type="button" onClick={() => navigate(routes.signup())} styles="group bg-orange-400 flex justify-center items-center font-bold gap-2 text-amber-50 text-sm md:w-42 max-md:w-50 self-center">
              GET STARTED
              <ArrowBigRight  className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"/>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={heroImage} alt="PaceMate" className="max-md:size-59 max-md: w-40 sm:w-59 md:w-full md:max-w-md rounded-full" />
        </div>
      </section>

      {/* WHY / PROBLEM */}
      <section className="bg-orange-400 text-white px-4 py-8 md:px-10 md:py-12 max-md:text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
          <h2 className="text-xl md:text-2xl font-bold md:w-1/3">Why students use PaceMate</h2>
          <ul className="flex flex-col gap-3 md:gap-4 md:w-2/3 text-sm md:text-base">
            <li>You missed a class and need to catch up.</li>
            <li>Your teacher doesn't have time for one-on-one help.</li>
            <li>You want extra practice before your BECE exams.</li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-8 md:px-10 md:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-10">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.title}   className="flex flex-col gap-2 bg-white/60 rounded-lg p-4 md:p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-gray-400 hover:border-gray-600 hover:bg-white/80">
              <span className="text-orange-400 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-700">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="px-4 py-8 md:px-10 md:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-10">Subjects covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SUBJECTS.map((subject) => (
            <div key={subject.name} className="flex flex-col gap-2 bg-white rounded-lg border border-orange-400/30 p-4 md:p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">
              <h3 className="font-semibold text-orange-400">{subject.name}</h3>
              <p className="text-sm text-gray-700">{subject.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-10 md:py-16 flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900">Ready to catch up and get ahead?</h2>
        <Button type="button" onClick={() => navigate(routes.signup())} styles="bg-orange-400 text-sm px-2 text-amber-50 md:w-52">
          SIGN UP FREE
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto flex flex-col border-t border-orange-500 bg-orange-400/10 md:flex-row md:justify-between items-center gap-2 px-4 py-4 md:px-10 text-xs md:text-sm text-gray-600">
        <img src={logo} alt="PaceMate logo" className="w-20" />
        <p>&copy; {new Date().getFullYear()} PaceMate. All rights reserved.</p>
      </footer>
    </div>
  );
}