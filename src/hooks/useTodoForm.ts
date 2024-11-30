import { useState } from "react";
import { useModal } from "../contexts/modalContext";

import { formatNewTodo } from "../utils";
import { saveTodo, updateTodo } from "../services/todoService";

import { Todo, NewTodoType, NewTodoSchema } from "../types";

interface UseTodoFormArgs {
  existingTodo?: NewTodoType & Todo;
  existingErrors: {
    title?: string[];
    date?: string[];
  };
  todoActionUpdate: (newTodo: Todo) => void;
}

const useTodoForm = ({
  existingTodo,
  existingErrors,
  todoActionUpdate,
}: UseTodoFormArgs) => {
  const [newTodo, setNewTodo] = useState<NewTodoType>({
    title: existingTodo?.title || "",
    date: existingTodo?.date || "",
    description: existingTodo?.description || "",
  });

  const [errors, setErrors] = useState<{
    title?: string[];
    date?: string[];
  }>(existingErrors);

  const { closeModal } = useModal();

  const handleCreateNew = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const parseResult = NewTodoSchema.safeParse(newTodo);

    if (!parseResult.success) {
      setErrors({ title: ["Invalid form data"], date: ["Invalid form data"] });
      setNewTodo({ title: "", date: "", description: "" });
      return;
    }
    const formattedTodo = formatNewTodo(parseResult.data);
    const savedTodo = await saveTodo(formattedTodo);
    todoActionUpdate(savedTodo);

    setNewTodo({ title: "", date: "", description: "" });
    closeModal(e);
  };

  const handleUpdateExisting = async (
    e: React.SyntheticEvent,
    completedTodo?: NewTodoType & { completed: true },
  ) => {
    e.preventDefault();
    if (!existingTodo || !("id" in existingTodo)) return;

    const todoData = completedTodo ? completedTodo : newTodo;

    const parseResult = NewTodoSchema.safeParse(todoData);
    if (!parseResult.success) {
      setErrors({ title: ["Invalid form data"], date: ["Invalid form data"] });
      setNewTodo({ title: "", date: "", description: "" });
      return;
    }

    const formattedTodo = formatNewTodo(parseResult.data);
    const updatedTodo = await updateTodo(existingTodo.id, formattedTodo);

    todoActionUpdate(updatedTodo);

    setNewTodo({ title: "", date: "", description: "" });
    closeModal(e);
  };

  const markComplete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!existingTodo || !("id" in existingTodo)) return;

    const completedTodo: NewTodoType & { completed: true } = {
      ...newTodo,
      completed: true,
    };

    handleUpdateExisting(e, completedTodo);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof NewTodoType,
  ) => {
    const { value } = e.target;
    const parseResult = NewTodoSchema.shape[field].safeParse(value);

    let errorMessages = parseResult.success
      ? []
      : parseResult.error.issues.map((obj) => obj.message);

    setErrors((current) => {
      return { ...current, [field]: errorMessages };
    });
    setNewTodo((current) => {
      return { ...current, [field]: value };
    });
  };

  return {
    newTodo,
    errors,
    handleChange,
    markComplete,
    handleUpdateExisting,
    handleCreateNew,
  };
};

export default useTodoForm;
