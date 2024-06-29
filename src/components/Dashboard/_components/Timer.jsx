import { useEffect, useState } from "react";

const Timer = ({
    setTotalSeconds,
    isChecked,
    setIsChecked,
    countdown,
    setCountdown,
}) => {
    const [timeInput, setTimeInput] = useState("1");
    const [inputType, setInputType] = useState("minutes");

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        // Reset timer when checkbox is unchecked
        if (!event.target.checked) {
            setCountdown(null);
            setTimeInput("");
        }
    };

    // Function to handle time input change
    const handleTimeInputChange = (event) => {
        setTimeInput(event.target.value.trim());
    };

    // Function to handle input type change
    const handleInputTypeChange = (event) => {
        setInputType(event.target.value);
    };

    // Function to start countdown
    const startCountdown = () => {
        if (timeInput.trim() !== "") {
            const inputAsNumber = parseInt(timeInput, 10);
            if (!isNaN(inputAsNumber)) {
                let totalSeconds = inputAsNumber;
                if (inputType === "minutes") {
                    totalSeconds = inputAsNumber * 60;
                }
                setTotalSeconds(totalSeconds);
                setIsChecked(false);
            }
        }
    };

    // Effect to handle countdown logic
    useEffect(() => {
        let timer = null;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            // Handle countdown completion
            setCountdown(null);
            setTimeInput("");
        }
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    return (
        <div className="form-control gap-4 my-5">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    className="checkbox checkbox-success me-2"
                    onChange={handleCheckboxChange}
                />{" "}
                Set Timer{" "}
            </label>
            {isChecked && (
                <div>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="minutes"
                            checked={inputType === "minutes"}
                            onChange={handleInputTypeChange}
                            className="radio radio-success me-2"
                        />{" "}
                        Minutes
                        <input
                            type="radio"
                            value="seconds"
                            checked={inputType === "seconds"}
                            onChange={handleInputTypeChange}
                            className="radio radio-success me-2 ms-4"
                        />{" "}
                        Seconds
                    </label>
                    <label>
                        Timer Input ({inputType}):{" "}
                        <input
                            type="number"
                            className="input input-bordered w-full max-w-80 px-4 py-2"
                            value={timeInput}
                            onChange={handleTimeInputChange}
                        />
                    </label>
                    <button
                        onClick={startCountdown}
                        className="bg-pink-400 py-2 px-4 rounded-xl ms-5 my-4">
                        {" "}
                        Set Timer
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timer;
