import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!todo) return;

        addTodo({ todo, completed: false });
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Your Todos are saved even if the tab is closed"
                className="w-full border text-[#5d608c] dark:text-white border-black/10 dark:border-2 dark:border-white rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="dark:border-2 border-l-none dark:border-white rounded-r-lg px-3 py-1 bg-[#979CDB] dark:bg-[#162666] text-white shrink-0"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
