import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import point from "../Point";

const UpdateTask = () => {
    const [name, setName] = useState("");
    const [dateline, setDateLine] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const change = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${point}/tasks/${id}`, {
                name: name,
                dateline: dateline,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getTask = async () => {
        const { data } = await axios.get(`${point}/tasks/${id}`);
        setName(data.name);
        setDateLine(data.dateline);
    };

    useEffect(() => {
        getTask();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center ">
            <div
                className=" w-3/6 h-3/6 flex justify-center items-center flex-col text-white wrapper"
                style={{ background: "#0F3460", borderRadius: "10px" }}
            >
                <div className="flex justify-start w-3/5">
                    <h1 className="luckiest">edit task</h1>
                </div>
                <form
                    className="flex items-center flex-col w-3/5"
                    onSubmit={change}
                >
                    <label for="dateline" className=" text-white mt-5">
                        name task
                    </label>
                    <input
                        type="text"
                        placeholder="name task"
                        value={name}
                        style={{ background: "none" }}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-success w-full max-w-xs "
                    />
                    <label for="dateline" className="  text-white mt-5">
                        name task
                    </label>
                    <input
                        type="text"
                        placeholder="dateline"
                        value={dateline}
                        style={{ background: "none" }}
                        onChange={(e) => setDateLine(e.target.value)}
                        className="input input-success w-full max-w-xs"
                    />
                    <div className="flex justify-end w-3/4 ml-3">
                        <button className="btn btn-success mt-5" type="submit">
                            change & back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
