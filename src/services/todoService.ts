import { Todo } from "../types";

const BASE_URL = "http://localhost:5173/api/todos";
export const getAll = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Non 200 response in getAll");
    }
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const saveTodo = async (newTodo: {
  month: string;
  day: string;
  year: string;
  title: string;
  description?: string;
}) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
      throw new Error("Non 200 response creating a new todo!");
    }

    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const updateTodo = async (id: number, todo: Partial<Todo>) => {
  try {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error("Non 200 response updating a new todo!");
    }
    const data = await res.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const deleteTodo = async (id: number) => {
  let status;
  try {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204 || res.status === 404) {
      return { success: true, status: res.status };
    }
    status = res.status;
  } catch (e: unknown) {
    console.error(e);
  }

  return { success: false, status };
};
