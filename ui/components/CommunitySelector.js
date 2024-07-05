import React from "react"
import { Texts } from "../../infra/constants"

export const DEFAULT_COMMUNITY_SELECTION = "none"

export const CommunitySelector = ({ communities, selectedCommunity, setSelectedCommunity }) => {
    return (
        <div className='flex justify-center items-center gap-2 m-[20px]'>
            <label className="font-bold" htmlFor="communitySelector">{Texts.COMMUNITY}:</label>
            <select
                id="communitySelector"
                className='border-2 p-3 rounded-xl'
                onChange={(e) => setSelectedCommunity(e.target.value)} 
                value={selectedCommunity}>
                <option value={DEFAULT_COMMUNITY_SELECTION}>{Texts.SELECT_A_COMMUNITY}</option>
                { communities.map((community, key) => (
                    <option key={key} value={community._id}>{community.name}</option>
                )) }
            </select>
        </div>
    )
}