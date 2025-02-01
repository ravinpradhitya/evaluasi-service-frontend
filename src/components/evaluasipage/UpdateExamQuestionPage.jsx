import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function UpdateExamQuestionPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    examQuestion: "",
    examAnswer: "",
    examGrade: "",
  });

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  const fetchQuestionDetails = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await EvaluasiService.getExamQuestionById(questionId, token);
      setQuestion(response);
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await EvaluasiService.updateExamQuestion(question, token);
      alert("Question updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h2>Update Exam Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <textarea name="examQuestion" value={question.examQuestion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Answer:</label>
          <textarea name="examAnswer" value={question.examAnswer} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <input type="number" name="examGrade" value={question.examGrade} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>

          <button type="submit">Update</button>
        </div>

      </form>
    </div>
  );
}

export default UpdateExamQuestionPage;
