import React, { useEffect, useState } from "react";
import { Texts } from "../../infra/constants";

const CHECKOUT_BUTTON_DELAY = 5 //seconds

const pastTime = (date, time) => {
    if (!date) {
        return false
    }
    const now = new Date();
    const differenceInMilliseconds = now - date;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    return differenceInSeconds > time;
}

const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
    return date.toLocaleString('en-US', options).replace(',', '');
}

export const PersonCard = ({
    id,
    firstName = "", 
    lastName = "", 
    companyName = "", 
    title = "", 
    checkIn, 
    checkOut, 
    onCheckIn,
    onCheckOut
}) => {

    const showCheckOutButton = ((checkIn && !checkOut) || (!checkIn && !checkOut)) && pastTime(checkIn, CHECKOUT_BUTTON_DELAY)
    const [ shouldRenderCheckOutBtn, setShouldRenderCheckOutBtn ] = useState(showCheckOutButton)
    const [ customLabel, setCustomLabel ] = useState("")
    const CheckButton = shouldRenderCheckOutBtn ? CheckOutButton : CheckInButton

    const handleCheckIn = (personId) => {
        onCheckIn?.(personId)
        const ms = CHECKOUT_BUTTON_DELAY * 1000
        setCustomLabel(Texts.PROCESSING)

        setTimeout(() => {
            setShouldRenderCheckOutBtn(true)
            setCustomLabel("")
        }, ms);
    }

    const handleCheckOut = (personId) => {
        onCheckOut?.(personId)
        setShouldRenderCheckOutBtn(false)
    }

    useEffect(() => {
        setShouldRenderCheckOutBtn(showCheckOutButton)
    }, [showCheckOutButton])

    return (
        <div className="flex flex-col justify-between bg-slate-200 p-2.5 rounded-xl shadow-lg h-[190px]">
            <div>
                <p className="font-bold text-lg">{firstName} {lastName}</p>
                { companyName && (
                    <p>
                        <span className="text-gray-600 mr-1">
                            {Texts.COMPANY}:
                        </span> 
                        {companyName}
                    </p>
                )}
                { title && (
                    <p>
                        <span className="text-gray-600 mr-1">
                            {Texts.TITLE}:
                        </span>
                        {title}
                    </p>
                )}
                { checkIn && (
                    <p className="text-green-600 ">
                        <span className="text-gray-600 mr-1">
                            {Texts.CHECK_IN}:
                        </span> 
                        {formatDate(checkIn)}
                    </p>
                )}
                { checkOut && (
                    <p className="text-orange-600">
                        <span className="text-gray-600 mr-1">
                            {Texts.CHECK_OUT}:
                        </span> 
                        {formatDate(checkOut)}
                    </p>
                )}
            </div>
            <div className="flex justify-end">
                <CheckButton 
                    personId={id} 
                    onCheckIn={handleCheckIn} 
                    onCheckOut={handleCheckOut}
                    customLabel={customLabel} 
                />
            </div>
        </div>
    )
}

const CheckInButton = ({ onCheckIn, personId, customLabel }) => {
    return (
        <button 
            className="bg-green-600 w-[150px] text-white rounded-xl py-2 font-bold"
            onClick={() => onCheckIn(personId)}>
            {customLabel || Texts.CHECK_IN}
        </button>
    )
}

const CheckOutButton = ({ onCheckOut, personId, customLabel }) => {
    return (
        <button
            className="bg-orange-600 w-[150px] text-white rounded-xl py-2 font-bold"
            onClick={() => onCheckOut(personId)}>
            {customLabel || Texts.CHECK_OUT}
        </button>
    )
}