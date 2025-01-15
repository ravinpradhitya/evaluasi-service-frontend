import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function AddExamPage() {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    examName: "",
    description: "",
    date: "",
    duration: "",
    totalMarks: "",
    passMarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EvaluasiService.addExam(exam);
      alert("Exam added successfully!");
      navigate("/exam-management");
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  const handleCancel = () => {
    navigate("/exam-management");
  };

  return (
    <div className="form-container">
      <h2>Add Exam</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="examName" value={exam.examName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={exam.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="datetime-local" name="date" value={exam.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Duration (minutes):</label>
          <input type="number" name="duration" value={exam.duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Total Marks:</label>
          <input type="number" name="totalMarks" value={exam.totalMarks} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pass Marks:</label>
          <input type="number" name="passMarks" value={exam.passMarks} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
        <button type="button" onClick={handleCancel}>
            Cancel
        </button>
        <button type="submit">Add Exam</button>
        </div>
        
      </form>
    </div>
  );
}

export default AddExamPage;
