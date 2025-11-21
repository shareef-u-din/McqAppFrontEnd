import { ExamType, Question } from "@/types";
import { MOCK_QUESTIONS } from "@/data/mockQuestions";

export class QuestionsService {
  static async getQuestionsByExam(examType: ExamType): Promise<Question[]> {
    // In a real app, this would be a database query
    // For now, we're using the mock data
    const questions = MOCK_QUESTIONS.filter((q) => q.examType === examType);
    return questions;
  }

  static async getQuestionById(id: string): Promise<Question | undefined> {
    // In a real app, this would be a database query
    const question = MOCK_QUESTIONS.find((q) => q.id === id);
    return question;
  }

  static async checkAnswer(
    questionId: string,
    answer: any
  ): Promise<boolean> {
    // In a real app, this would validate against a database
    const question = await this.getQuestionById(questionId);
    if (!question) return false;

    switch (question.type) {
        case "single":
            if (typeof answer === "string") {
                const opt = question.options.find(o => o.id === answer);
                return !!opt?.isCorrect;
            }
            return false;
        case "multiple":
            if (Array.isArray(answer)) {
                const correctIds = question.options.filter(o => o.isCorrect).map(o => o.id);
                return answer.length === correctIds.length && answer.every(id => correctIds.includes(id));
            }
            return false;
        case "match":
            // Mock validation for match
            return true; 
        case "numerical":
             if (question.correctValue !== undefined) {
                 return Math.abs(parseFloat(answer) - question.correctValue) < (question.tolerance || 0.0001);
             } else if (question.correctRange) {
                 const val = parseFloat(answer);
                 return val >= question.correctRange.min && val <= question.correctRange.max;
             }
             return false;
        case "assertion-reason":
            return answer === question.correctOption;
        case "fill-blanks":
            // Mock validation: check if answer array matches correctAnswers
            if (Array.isArray(answer) && question.correctAnswers) {
                return answer.length === question.correctAnswers.length && 
                       answer.every((a: string, i: number) => a.toLowerCase().trim() === question.correctAnswers[i].toLowerCase().trim());
            }
            return false;
        case "case-study":
            return true;
        default:
            return false;
    }
  }
}