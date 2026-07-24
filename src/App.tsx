// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardScreen } from "./features/dashboard/DashboardScreen";
import { LoginScreen } from "./features/auth/LoginScreen";
import { LandingScreen } from "./features/auth/LandingScreen";
import { SignUpScreen } from "./features/auth/SignUpScreen";
import { SelectGradeScreen } from "./features/auth/SelectGradeScreen";
import { SubjectScreen } from "./features/subjects/SubjectScreen";
import { TopicScreen } from "./features/subjects/TopicScreen";
import { QuizScoreScreen } from "./features/quiz/QuizScoreScreen";
import { QuizScreen } from "./features/quiz/QuizScreen";
import { EditProfileScreen } from "./features/profile/EditProfileScreen";
import { ProfileScreen } from "./features/profile/ProfileScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { CurriculumProvider } from "./context/CurriculumContext";
import { CoursesScreen } from "./features/subjects/CoursesScreen";
import { ProgressProvider } from "./context/ProgressContext";
import { RecapQuizScreen } from "./features/quiz/RecapQuizScreen";

function App() {
  return (
    <AuthProvider>
        <CurriculumProvider>
          <ProgressProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth flow */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/select-grade" element={<SelectGradeScreen />} />
          </Route>

          {/* Main app */}
          <Route element={<MainLayout />}>
            {/* primary tabs only here - nav visible */}
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/courses" element={<CoursesScreen/>}/>
          </Route>

          {/* back buttons only for this screen */}
          <Route path="/subject/:subjectId" element={<SubjectScreen />} />
          <Route
            path="/subject/:subjectId/topic/:topicId/subtopic/:subtopicId"
            element={<TopicScreen />}
          />
          <Route
            path="/subject/:subjectId/topic/:topicId/subtopic/:subtopicId/quiz"
            element={<QuizScreen />}
          />
          <Route
            path="/subject/:subjectId/topic/:topicId/subtopic/:subtopicId/quiz-score"
            element={<QuizScoreScreen />}
          />
          <Route path="/recap-quiz/:subjectId" element={<RecapQuizScreen />} />
          <Route path="/edit-profile" element={<EditProfileScreen />} />
        </Routes>
      </BrowserRouter>
      </ProgressProvider>
      </CurriculumProvider>
    </AuthProvider>
  );
}

export default App;
