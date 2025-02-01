import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from './components/evaluasipage/ProfilePage';
import ExamManagementPage from "./components/evaluasipage/ExamManagementPage";
import ExamQuestionManagementPage from "./components/evaluasipage/ExamQuestionManagementPage";
import AddExamPage from "./components/evaluasipage/AddExamPage";
import AddExamQuestionPage from "./components/evaluasipage/AddExamQuestionPage";
import UpdateExamPage from "./components/evaluasipage/UpdateExamPage";
import UpdateExamQuestionPage from "./components/evaluasipage/UpdateExamQuestionPage";
import GradeAnswersPage from "./components/evaluasipage/GradeAnswersPage";
import EvaluasiService from "./components/service/EvaluasiService";

function App() {
  const isAuthenticated = EvaluasiService.isAuthenticated();

  return (
    <Router>
      {/* {isAuthenticated && <Navbar />} 
     {isAuthenticated && <Navbar />}  */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/exam-management" element={<ExamManagementPage />} />
        <Route path="/exam/:examId/questions" element={<ExamQuestionManagementPage />} />
        <Route path="/add-exam" element={<AddExamPage />} />
        <Route path="/exam/:examId/add-question" element={<AddExamQuestionPage />} />
        <Route path="/update-exam/:examId" element={<UpdateExamPage />} />
        <Route path="/update-exam-question/:questionId" element={<UpdateExamQuestionPage />} />
        <Route path="/exam/:questionId/grade-answers" element={<GradeAnswersPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
