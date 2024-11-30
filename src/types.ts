import { z } from "zod";

export interface Todo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

export interface GroupedTodos {
  all: {
    [k: string]: Todo[];
  };
  completed: {
    [k: string]: Todo[];
  };
}

export interface SelectedGroupType {
  group: "all" | "completed";
  date: null | string;
}

export const NewTodoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  date: z.string().date(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type NewTodoType = z.infer<typeof NewTodoSchema>;
