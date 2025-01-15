import axios from "axios";

class EvaluasiService {
  static BASE_URL = "http://localhost:8081";

  // Login
  static async login(email, password) {
    try {
      const response = await axios.post(`${this.BASE_URL}/auth/login`, { email, password });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Get user profile
  static async getUserProfile(userId) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/profile/${userId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Exams
  static async getAllExams() {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getAllExams`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getExamById(id) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getExamById/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async addExam(exam) {
    try {
      const response = await axios.post(`${EvaluasiService.BASE_URL}/addExam`, exam);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateExam(exam) {
    try {
      const response = await axios.put(`${EvaluasiService.BASE_URL}/updateExam`, exam);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteExam(id) {
    try {
      const response = await axios.delete(`${EvaluasiService.BASE_URL}/deleteExam/${id}`);
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

  static async getExamQuestionById(id) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/getExamQuestionById/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getQuestionsByExamId(examId) {
    const response = await axios.get(`${EvaluasiService.BASE_URL}/getQuestionsByExamId/${examId}`);
    return response.data;
  }

  static async addExamQuestion(question) {
    try {
      const response = await axios.post(`${EvaluasiService.BASE_URL}/addExamQuestion`, question);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateExamQuestion(question) {
    try {
      const response = await axios.put(`${EvaluasiService.BASE_URL}/updateExamQuestion`, question);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteExamQuestion(id) {
    try {
      const response = await axios.delete(`${EvaluasiService.BASE_URL}/deleteExamQuestion/${id}`);
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

  static async getAnswersByQuestionId(questionId) {
    try {
      const response = await axios.get(`${EvaluasiService.BASE_URL}/question/${questionId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  
  static async gradeAnswer(answerId, isCorrect, marks) {
    try {
      const response = await axios.put(
        `${EvaluasiService.BASE_URL}/grade/${answerId}?isCorrect=${isCorrect}&marks=${marks}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  

}

export default EvaluasiService;
