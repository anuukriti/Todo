import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./componenets/TodoForm";
import TodoItems from "./componenets/TodoItems";
import { ThemeProvider } from "./contexts/theme";
import ThemeBtn from "./componenets/themeBtn";

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((pprevtodo) => (pprevtodo.id === id ? todo : pprevtodo))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleCompleted = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));

        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date();
    const day = weekday[date.getDay()];
    const month = months[date.getMonth()];
    const todayDate = date.getDate();

    // theme change
    const [themeMode, setThemeMode] = useState("Light");

    const lightTheme = () => {
        setThemeMode("light");
    };
    const darkTheme = () => {
        setThemeMode("dark");
    };

    //actual theme change
    useEffect(() => {
        document.querySelector("html").classList.remove("light", "dark");
        document.querySelector("html").classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
            <TodoProvider
                value={{
                    todos,
                    addTodo,
                    updateTodo,
                    deleteTodo,
                    toggleCompleted,
                }}
            >
                <div className="bg-[#BFD8EC] bg-cover min-h-screen pb-8 w-full dark:bg-[#0A0A0E]  dark:bg-repeat dark:bg-contain">
                    {/* <div className="bg-[url('./assets/bgPattern.jpg')] bg-repeat bg-contain bg-opacity-50 w-full min-h-screen"> */}
                    <div className="dark:bg-[url('./assets/header-bg.jpg')] bg-[url('./assets/bgLight.jpg')] bg-cover w-full h-[200px] shadow-xl mb-10">
                        <div className="flex items-center justify-between h-full w-full dark:bg-black/20 px-[50px] py-10 dark:text-white text-[#240750]">
                            <div className="flex flex-col item-start justify-center">
                                <h1 className="text-2xl font-bold">{day}</h1>
                                <h2 className="font-semibold text-lg">
                                    {month}, {todayDate}
                                </h2>
                            </div>
                            <div className="flex justify-center items-center">
                                <h1 className="text-5xl font-bold text-center mb-8 mt-2">
                                    My Todo List
                                </h1>
                            </div>
                            <div>
                                <ThemeBtn />
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                        <div className="mb-4">
                            <TodoForm />
                        </div>
                        <div className="flex flex-wrap gap-y-3">
                            {todos.map((todo) => (
                                <div key={todo.id} className="w-full">
                                    <TodoItems todo={todo} />
                                </div>
                            ))}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </TodoProvider>
        </ThemeProvider>
    );
}

export default App;
