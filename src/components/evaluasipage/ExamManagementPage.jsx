import React, { useEffect, useState } from "react";
import EvaluasiService from "../service/EvaluasiService";
import { Link } from "react-router-dom";

function ExamManagementPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await EvaluasiService.getAllExams(token);
      setExams(response);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const deleteExam = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token')
        await EvaluasiService.deleteExam(id, token);
        alert("Exam deleted successfully.");
        fetchExams(); // Refresh the exam list after deletion
      } catch (error) {
        console.error("Error deleting exam:", error);
        alert("Failed to delete exam. Please try again.");
      }
    }
  };

  return (
    <div className="page-container">
      <h2>Exam Management</h2>
      <div className="add-button-container">
        <button className="add-button">
          <Link to="/add-exam" style={{ textDecoration: "none" }}>Add Exam</Link>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Exam Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Total Marks</th>
            <th>Pass Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={exam.id}>
              <td>{index + 1}</td>
              <td>{exam.examName}</td>
              <td>{exam.description}</td>
              <td>{exam.date}</td>
              <td>{exam.duration}</td>
              <td>{exam.totalMarks}</td>
              <td>{exam.passMarks}</td>
              <td>
                <div className="actions-container">
                  <button className="delete-button" onClick={() => deleteExam(exam.id)}>
                    Delete
                  </button>

                  <button className="update-button">
                    <Link to={`/update-exam/${exam.id}`} style={{ textDecoration: "none" }}>
                      Update
                    </Link>
                  </button>

                  <button className="question-button">
                    <Link to={`/exam/${exam.id}/questions`} style={{ textDecoration: "none" }}>
                      Questions
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

export default ExamManagementPage;
