import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Point from "../Point";

const themeContext = createContext(null);

const HomePage = () => {
    const [theme, setTheme] = useState("#f3ebf6");
    const [name, setName] = useState("");
    const [dateline, setDateLine] = useState("");
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const { data } = await axios.get(`${Point}/tasks`);
        setTasks(data.data);
    };

    const add = async (e) => {
        if (name === "" || dateline === "") {
            alert("masukkan lagi");
        } else {
            try {
                await axios.post(`${Point}/tasks`, {
                    name: name,
                    dateline: dateline,
                });
                getTasks();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`${Point}/tasks/${id}`);
        getTasks();
    };

    useState(() => {
        getTasks();
    }, []);

    return (
        <div className="home">
            <h1
                className="uppercase luckiest text-red-500"
                style={{ fontSize: "30px" }}
            >
                task list
            </h1>
            <form
                className="flex items-center flex-col w-3/5 form "
                onSubmit={add}
            >
                <label for="name-task" className=" mt-1 text-blue-500">
                    name task
                </label>
                <input
                    type="text"
                    id="name-task"
                    placeholder="name task"
                    onChange={(e) => setName(e.target.value)}
                    style={{ background: "none" }}
                    className="input input-success w-full max-w-xs "
                />
                <label for="dateline" className=" mt-1 text-blue-500">
                    dateline
                </label>
                <input
                    type="text"
                    id="dateline"
                    placeholder="dateline"
                    style={{ background: "none" }}
                    onChange={(e) => setDateLine(e.target.value)}
                    className="input input-success w-full max-w-xs "
                />
                <div className="flex justify-between w-3/4">
                    <button className="btn btn-success mt-5">add</button>
                </div>
            </form>
            {/* <TasksTable tasks={tasks} getTasks={getTasks} /> */}
            <div className="groupTask p-3 flex flex-wrap justify-center pp">
                {tasks.map((data, id) => {
                    return (
                        // <p>{data.id}</p>
                        <div
                            className="p-2 task flex justify-between capitalize items-center m-3 flex-col"
                            key={id}
                        >
                            <div className=" text-center flex nameTask flex-col">
                                <span className="badge badge-ghost badge-sm mt-3">
                                    {data.dateline}
                                </span>
                                <h1 className="secular mt-3">{data.name}</h1>
                            </div>
                            <div className="flex justify-between btnGroup">
                                <Link
                                    className="btn btn-ghost"
                                    to={`/updateTask/${data.id}`}
                                >
                                    <AiFillEdit size={"30px"} color={"green"} />
                                </Link>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => deleteTask(data.id)}
                                >
                                    <MdDelete size={"30px"} color={"red"} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
