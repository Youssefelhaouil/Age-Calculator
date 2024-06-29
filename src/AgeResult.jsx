import React, { useState } from "react";

function AgeResult() {
    const [year, setYear] = useState('--');
    const [month, setMonth] = useState('--');
    const [day, setDay] = useState('--');
    const [error, setError] = useState({ day: false, month: false, year: false });
    const [validationMessage, setValidationMessage] = useState({ day: false, month: false, year: false });

    function CalcAge() {
        const birthDay = parseInt(document.getElementById("day").value, 10);
        const birthMonth = parseInt(document.getElementById("month").value, 10);
        const birthYear = parseInt(document.getElementById("year").value, 10);

        setValidationMessage({ day: false, month: false, year: false });

        if (!birthDay || !birthMonth || !birthYear) {
            setValidationMessage({
                day: !birthDay,
                month: !birthMonth,
                year: !birthYear
            });
            return;
        }

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        let calculatedDay = currentDay - birthDay;
        let calculatedMonth = currentMonth - birthMonth;
        let calculatedYear = currentYear - birthYear;
        
        


        if (calculatedDay < 0) {
            calculatedDay += new Date(currentYear, currentMonth, 0).getDate();
            calculatedMonth--;
        }

        if (calculatedMonth < 0) {
            calculatedMonth += 12;
            calculatedYear--;
        }

        if(calculatedDay<10){
            calculatedDay="0"+calculatedDay;
        }
        if(calculatedMonth<10){
            calculatedMonth="0"+calculatedMonth;
        }
        if(calculatedYear<10){
            calculatedYear="0"+calculatedYear;
        }

        if (birthMonth === 2 && birthDay > 29) {
            setError({ day: true, month: false, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }
        if(birthDay<0 ){
            setError({ day: true, month: false, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }
        if(birthYear<0 ){
            setError({ day: false, month: false, year: true });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }

        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }

        // Update February days if it's a leap year
        if (isLeapYear(birthYear)) {
            daysInMonth[1] = 29;
        }

        if (birthDay > daysInMonth[birthMonth - 1]) {
            setError({ day: true, month: false, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }



        if (birthYear > currentYear) {
            setError({ day: false, month: false, year: true });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;

        }

        if (birthYear === currentYear && birthMonth > currentMonth) {
            setError({ day: false, month: true, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }
        if (birthYear === currentYear && birthMonth === currentMonth && birthDay > currentDay) {
            setError({ day: true, month: false, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;

        }

        // Check for valid month range (1-12)
        if (birthMonth <= 0 || birthMonth > 12) {
            setError({ day: false, month: true, year: false });
            setDay("--");
            setMonth('--');
            setYear("--");
            return;
        }


        setDay(calculatedDay);
        setMonth(calculatedMonth);
        setYear(calculatedYear);
    }

    const inputClassName = `font-poppins border rounded text-offBlack h-16 w-32 font-bold  text-input ${error.day || error.month || error.year ? 'border-lightRed placeholder-lightGrey-500' : 'border-lightGrey'} ${validationMessage.day || validationMessage.month || validationMessage.year ? 'border-lightRed placeholder-lightGrey-500' : 'border-lightGrey'}`;
    const labelClassName = `font-poppins text-xs ${error.day || error.month || error.year ? 'text-lightRed' : 'text-lightGrey'} ${validationMessage.day || validationMessage.month || validationMessage.year ? 'text-lightRed' : 'text-lightGrey'}`;

    return (
        <>
            <div className="container h-auto w-[550px] sm:w-full bg-white pb-12  rounded-[20px_20px_30%_20px] ">
                <div className="container  p-16 flex flex-row justify-evenly gap-12 pr-40  ">
                    <div className="flex flex-col">
                        <label htmlFor="day" className={labelClassName}>DAY</label>
                        <input type="number" name="day" id="day" className={inputClassName} placeholder={error.day ? "DD" : "DD"} />
                        {validationMessage.day && <span className="font-poppins text-lightRed text-xs mt-1">This field is required</span>}
                        {error.day && <span className="font-poppins text-lightRed text-xs mt-1">Invalid Date</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="month" className={labelClassName}>MONTH</label>
                        <input type="number" name="month" id="month" className={inputClassName} placeholder={error.month ? "MM" : "MM"} />
                        {validationMessage.month && <span className="font-poppins text-lightRed text-xs mt-1">This field is required</span>}
                        {error.month && <span className="font-poppins text-lightRed text-xs mt-1">Invalid Date</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="year" className={labelClassName}>YEAR</label>
                        <input type="number" name="year" id="year" className={inputClassName} placeholder={error.year ? "YY" : "YY"} />
                        {validationMessage.year && <span className="font-poppins text-lightRed text-xs mt-1">This field is required</span>}
                        {error.year && <span className="font-poppins text-lightRed text-xs mt-1">Invalid Date</span>}
                    </div>
                </div>
                <div className="container  h-16  flex flex-row p-8">
                    <span className="w-full bg-lightGrey flex justify-center sm:justify-end items-center ">
                        <button onClick={CalcAge}>
                            <svg className="h-20 w-20 text-white bg-purple hover:bg-offBlack rounded-full" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
                                <g fill="none" stroke="#FFF" strokeWidth="2">
                                    <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                                </g>
                            </svg>
                        </button>
                    </span>
                </div>
                <div className="container pl-8">
                    <div>
                        <h1 className="date-text font-poppins font-extrabold text-purple text-8xl">{year} <span className="text-black">years</span></h1>
                    </div>
                    <div>
                        <h1 className="date-text  font-poppins font-extrabold text-purple text-8xl">{month} <span className="text-black">months</span></h1>
                    </div>
                    <div>
                        <h1 className="date-text font-poppins font-extrabold text-purple text-8xl">{day} <span className="text-black">days</span></h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgeResult;
