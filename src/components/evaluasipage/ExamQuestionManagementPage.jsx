import React, { useEffect, useState } from "react";
import EvaluasiService from "../service/EvaluasiService";
import { useParams, Link } from "react-router-dom";

function ExamQuestionManagementPage() {
  const { examId } = useParams();
  const [examQuestions, setExamQuestions] = useState([]);
  const [examName, setExamName] = useState("");


  useEffect(() => {
    fetchExamDetails();
    fetchExamQuestions();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await EvaluasiService.getExamById(examId, token);
      setExamName(response.examName);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  const fetchExamQuestions = async () => {
    try {
      const token = localStorage.getItem('item')
      const response = await EvaluasiService.getQuestionsByExamId(examId, token);
      setExamQuestions(response);
    } catch (error) {
      console.error("Error fetching exam questions:", error);
    }
  };

  const deleteExamQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token')

        await EvaluasiService.deleteExamQuestion(id, token);
        alert("Exam question deleted successfully.");
        fetchExamQuestions(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting exam question:", error);
        alert("Failed to delete exam question. Please try again.");
      }
    }
  };

  return (
    <div className="page-container">
      <h2>Manage Questions for Exam: {examName}</h2>
      <div className="add-button-container">
        <button className="back-button">
          <Link to={`/exam-management/`} style={{ textDecoration: "none" }}>Back</Link>
        </button>

        <button className="add-button">
          <Link to={`/exam/${examId}/add-question`} style={{ textDecoration: "none" }}>Add Exam Question</Link>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examQuestions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
              <td>{question.examQuestion}</td>
              <td>{question.examAnswer}</td>
              <td>{question.examGrade}</td>
              <td>
                <div className="actions-container">
                  <button className="delete-button" onClick={() => deleteExamQuestion(question.id)}>
                    Delete
                  </button>

                  <button className="update-button">
                    <Link to={`/update-exam-question/${question.id}`} style={{ textDecoration: "none" }}>Update</Link>
                  </button>

                  <button className="grade-button">
                    <Link
                      to={`/exam/${question.id}/grade-answers`}
                      style={{ textDecoration: "none" }}
                    >
                      Answers
                    </Link>
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

export default ExamQuestionManagementPage;
