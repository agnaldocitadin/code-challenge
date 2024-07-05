import React from "react"
import { Texts } from "../../infra/constants"

export const SummaryCard = ({ peopleInTheEvent, notCheckedIn, companyGroupStr}) => {

    return (
        <section className="rounded-xl shadow-lg p-2.5 bg-slate-300">
            <Label text={Texts.PEOPLE_RIGHT_NOW} value={peopleInTheEvent} />
            <Label text={Texts.PEOPLE_BY_COMPANY} value={companyGroupStr} />
            <Label text={Texts.PEOPLE_NOT_CHECKED_IN} value={notCheckedIn} />
        </section>
    )
}

const Label = ({ text, value }) => {
    return (
        <h2><span className="font-bold">{text}:</span> {value}</h2>
    )
}