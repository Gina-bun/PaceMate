# PaceMate

A learning platform built for Ghanaian junior high school students (Grades 7–9) to keep up with and catch up on their studies at their own pace.

Built with **React + TypeScript**.



## My Process

I'm a design-first engineer, and this project was built with that in mind — starting with the interface before writing any logic.

**1. Paper sketches first.**
Before writing a single line of code, I sketched every screen on paper. This let me think purely about user experience and flow what a student sees first, where they go next, what information matters most on each screen without getting distracted by implementation details too early.

**2. Component architecture, derived from the sketches.**
Once the screens existed on paper, patterns started to emerge naturally. The same button, the same card shape, the same checkbox kept showing up across multiple screens. Instead of guessing at architecture upfront, the component breakdown came directly from studying the sketches which pieces repeat, and which are unique to one screen.

**3. Agile / MVP mindset.**
Rather than trying to design and build every feature perfectly before writing code (a waterfall approach), this project was built as a Minimum Viable Product first the core 9 screens needed for a student to sign up, pick a grade, learn a topic, and take a quiz. Extra features (profile customization, streaks, leaderboards, etc.) are intentionally left for later iterations.

**4. Build feature by feature, branch by branch.**
Each major piece of the app (auth, dashboard, subjects, quiz) was built on its own Git branch, tested, and merged in only once that feature worked end-to-end rather than building everything on one branch at once.



## Component Architecture

Every component in this project falls into one of two categories:

### Reusable components (`src/components/`)
A component lives here if it's used by **two or more different features**. These components don't know or care about the context they're used in — they just take in data through props and render accordingly.

Examples:
- `Button` — used on Login, Sign Up, Select Grade, Quiz, and more.
- `Card` — uses a `variant` prop (`subject`, `topic`, `review`, `question`, `option`, etc.) to change its look while keeping the same underlying shape.
- `Checkbox`, `TextInput`, `ProgressBar`, `Nav`, `Accordion`, `QuizQuestion` — all follow the same rule: one component, reused wherever that pattern shows up.

**The test:** if I ever catch myself about to copy-paste a piece of UI with only slightly different text or styling, that's a signal it should be a shared, reusable component instead.

### Feature components (`src/features/<feature>/`)
A component lives inside a feature folder if it's **only used by one part of the app**. These are usually screens themselves,

## Component tree  
SCREENS → COMPONENTS FOUND ON EACH ONE

Splash Screen  
├── Button (Login)  
└── Button (Sign Up)

Login Screen  
├── TextInput (email)  
├── TextInput (password)  
├── Button (Login)  
├── Button (Google)  
├── Button (Apple)  
└── [link to Sign Up]

Sign Up Screen  
├── TextInput (full name)  
├── TextInput (email)  
├── TextInput (password)  
├── Button (Create Account)  
├── Button (Google)  
├── Button (Apple)  
└── [link to Login]

Select Grade Screen  
├── Button (Grade 7)  
├── Button (Grade 8)  
└── Button (Grade 9)  

Dashboard Screen  
├── Card (subject) × 4  
├── Card (review/warmup)  
├── StackedCard (built from Card)  
└── Nav (bottom, mobile)

Subject Screen  
├── Accordion × N (one per topic)  
│     └── Checkbox (inside each Accordion)  
├── Nav (bottom, mobile)  
└── [Card, indirectly — Accordion styling could later reuse Card]

Topic Screen  
├── Button (Ready for Quiz)  
└── Nav (bottom, mobile)

Quiz Screen  
├── ProgressBar  
├── Card (question)  
├── Card (option) × 4  
├── Checkbox × 4  
├── Button (Next / Submit)  
└── Nav (bottom, mobile)  

Quiz Score Screen  
├── Button (Retake Quiz)  
└── Button (See Summary)