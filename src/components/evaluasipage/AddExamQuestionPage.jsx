import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function AddExamQuestionPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    examQuestion: "",
    examAnswer: "",
    examGrade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token')
      await EvaluasiService.addExamQuestion({
        ...question,
        exam: { id: examId },
      }, token);
      alert("Question added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h2>Add Exam Question</h2>
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
          <button type="submit">Add Question</button>
        </div>

      </form>
    </div>
  );
}

export default AddExamQuestionPage;
