import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function UpdateExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    examName: "",
    description: "",
    date: "",
    duration: "",
    totalMarks: "",
    passMarks: "",
  });

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const response = await EvaluasiService.getExamById(examId);
      setExam(response);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EvaluasiService.updateExam(exam);
      alert("Exam updated successfully!");
      navigate("/exam-management");
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  const handleCancel = () => {
    navigate("/exam-management");
  };

  return (
    <div className="form-container">
      <h2>Update Exam</h2>
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
        <button type="submit">Update</button>
        </div>
        
      </form>
    </div>
  );
}

export default UpdateExamPage;