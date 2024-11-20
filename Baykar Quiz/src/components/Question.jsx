import Options from "./Options";
import { useEffect, useState } from "react";

export default function Question({ question, selectedOption, time, onSubmit, onEmpty }) {
    const [remainingTime, setRemainingTime] = useState(time);
    const [value, setValue] = useState("");

    function handleClick(value) {
        onSubmit(value);
    }

    useEffect(() => {
        const timer = setTimeout(onEmpty, time);
        return () => clearTimeout(timer);
    }, [onEmpty])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 1000)
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    let isDisabled = remainingTime / 1000 > 20;
    return (
        <div className="">
            <h3>Question {question.id}</h3>
            <h5 className="mt-2">{question.question}</h5>
            <Options
                options={question.options}
                onClick={handleClick}
                isDisabled={isDisabled}
            />
            <div>{remainingTime / 1000}</div>
        </div>
    )
}
