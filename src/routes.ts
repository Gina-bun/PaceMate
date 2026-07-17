export const routes = {
  //Auth
  splash: () => "/",
  login: () => "/login",
  signup: () => "/signup",
  selectGrade: () => "/select-grade",

  // Main tabs
  dashboard: () => "/dashboard",
  profile: () => "/profile",
  settings: () => "/settings",

  // Subject / topic / subtopic tree
  subject: (subjectId: string) => `/subject/${subjectId}`,
  subtopic: (subjectId: string, topicId: string, subtopicId: string) =>
    `/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}`,
  quiz: (subjectId: string, topicId: string, subtopicId: string) =>
    `/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}/quiz`,
  quizScore: (subjectId: string, topicId: string, subtopicId: string) =>
    `/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}/quiz-score`,

  //Profile
  editProfile: () => "/edit-profile",
  terms: () => "/terms",
  help: () => "/help",

  //Settings
  changePassword: () => "/change-password",
};
