import axios from "axios";

class EvaluasiService {
  static BASE_URL = "http://localhost:8081";

  // Login
  static async login(email, password) {
    try {
      const url = 'http://localhost:8080';
      const response = await axios.post(`${url}/auth/login`, { email, password });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Get user profile
  static async getUserProfile(userId, token) {
    try {
      // const response = await axios.get(`${EvaluasiService.BASE_URL}/profile/${userId}`, {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // users/profile
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Exams
  static async getAllExams(token) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getAllExams`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
  }
  static async getExamById(id, token) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getExamById/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async addExam(exam, token) {
    try {
      const response = await axios.post(`${EvaluasiService.BASE_URL}/addExam`, exam, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateExam(exam, token) {
    try {
      const response = await axios.put(`${EvaluasiService.BASE_URL}/updateExam`, exam, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteExam(id, token) {
    try {
      const response = await axios.delete(`${EvaluasiService.BASE_URL}/deleteExam/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Exam Questions
  static async getAllExamQuestions() {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getAllExamQuestions`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getExamQuestionById(id, token) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getExamQuestionById/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getQuestionsByExamId(examId, token) {
    const response = await axios.get(`${EvaluasiService.BASE_URL}/getQuestionsByExamId/${examId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  static async addExamQuestion(question, token) {
    // console.log(token);

    try {
      const response = await axios.post(`${EvaluasiService.BASE_URL}/addExamQuestion`, question,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateExamQuestion(question, token) {
    try {
      const response = await axios.put(`${EvaluasiService.BASE_URL}/updateExamQuestion`, question, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteExamQuestion(id, token) {

    try {
      
      // const response = await axios.delete(`${EvaluasiService.BASE_URL}/deleteExamQuestion/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      const response = await axios.delete(
        `${EvaluasiService.BASE_URL}/deleteExamQuestion/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Answers
  static async getAllAnswers() {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getAllAnswers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all answers:", error);
      throw error;
    }
  }

  static async getAnswersByQuestionId(questionId, token) {
    try {
       
      const response = await axios.get(`${EvaluasiService.BASE_URL}/question/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async gradeAnswer(answerId, isCorrect, marks, token) {
    try {
      const response = await axios.put(
        `${EvaluasiService.BASE_URL}/grade/${answerId}?isCorrect=${isCorrect}&marks=${marks}`, {
        headers: { Authorization: `Bearer ${token}` }
      }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }


}

export default EvaluasiService;
