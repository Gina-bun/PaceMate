// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardScreen } from "./features/dashboard/DashboardScreen";
import {LoginScreen} from "./features/auth/LoginScreen";
import { SplashScreen } from "./features/auth/SplashScreen";
import { SignUpScreen } from "./features/auth/SignUpScreen";
import { SelectGradeScreen } from "./features/auth/SelectGradeScreen";
import { SubjectScreen } from "./features/subjects/SubjectScreen";
import { TopicScreen } from "./features/subjects/TopicScreen";
import { QuizScoreScreen } from "./features/quiz/QuizScoreScreen";
import { QuizScreen } from "./features/quiz/QuizScreen";
import "./App.css";
import { EditProfileScreen } from "./features/profile/EditProfileScreen";
import { ProfileScreen } from "./features/profile/ProfileScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/select-grade" element={<SelectGradeScreen />} />
        <Route path="/subject/:subjectId" element={<SubjectScreen />} />
        <Route path="/subject/:subjectId/topic/:topicId" element={<TopicScreen/>}/>
        <Route path="/subject/:subjectId/topic/:topicId/quiz" element={<QuizScreen />} />
        <Route path="/subject/:subjectId/topic/:topicId/quiz-score" element={<QuizScoreScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
