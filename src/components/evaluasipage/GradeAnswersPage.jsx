import React, { useEffect, useState } from "react";
import EvaluasiService from "../service/EvaluasiService";
import { useParams, useNavigate } from "react-router-dom";

function GradeAnswersPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    fetchQuestionDetails();
    fetchAnswers();
  }, []);

  const fetchQuestionDetails = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await EvaluasiService.getExamQuestionById(questionId, token);
      // console.log(response);

      setQuestion(response);
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // console.log(token);
      
      const response = await EvaluasiService.getAnswersByQuestionId(questionId, token);
      setAnswers(response);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const gradeAnswer = async (answerId, isCorrect, marks) => {
    try {
      const token = localStorage.getItem('token')
      await EvaluasiService.gradeAnswer(answerId, isCorrect, marks, token);
      alert("Answer graded successfully!");
      fetchAnswers();
    } catch (error) {
      console.error("Error grading answer:", error);
      alert("Failed to grade answer. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back
  };
  // console.log(answers);

  return (
    <div className="page-container">
      <h2>Grade Answers for Question: {question.examQuestion}</h2>
      <div className="add-button-container">
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Answer</th>
            <th>Marks Obtained</th>
            <th>Correct</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={answer.id}>
              <td>{index + 1}</td>
              <td>{answer.studentId || "N/A"}</td>
              <td>{answer.answer}</td>
              <td>{answer.marksObtained != null ? answer.marksObtained : "-"}</td>
              <td>{answer.isCorrect ? "Yes" : "No"}</td>
              <td>
                <div className="actions-container">
                  <button
                    className="grade-button correct"
                    onClick={() => gradeAnswer(answer.id, true, 10)}>
                    Mark Correct (10 Marks)
                  </button>

                  <button
                    className="grade-button incorrect"
                    onClick={() => gradeAnswer(answer.id, false, 0)}>
                    Mark Incorrect (0 Marks)
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeAnswersPage;
