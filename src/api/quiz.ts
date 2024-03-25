import { useQuery } from "@tanstack/react-query";
import api from "./api";

export interface Quiz {
  id: number;
  moduleId: number;
  description: string;
  validationScore: number;
  createdAt: string;
  updatedAt: string;
  Quizzquestion: Quizzquestion[];
}

export interface Quizzquestion {
  id: number;
  question: string;
  type: "Multiple" | "Single";
  description: string;
  quizzId: number;
  createdAt: string;
  updatedAt: string;
  QuizzQuestionsElement: QuizzQuestionsElement[];
}

export interface QuizzQuestionsElement {
  answer: string;
  id: number;
}

export function useGetOneQuiz(id: number) {
  return useQuery(["GET_PATHOLOGIE", id], async () => {
    const { data } = await api.get<Quiz>(`/quiz/${id}`);
    return data;
  });
}
