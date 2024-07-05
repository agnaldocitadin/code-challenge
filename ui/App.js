import React, { useState } from 'react';
import { Texts } from '../infra/constants';
import { CommunitySelector, DEFAULT_COMMUNITY_SELECTION } from './components/CommunitySelector';
import { PersonCard } from './components/PersonCard';
import { SummaryCard } from './components/SummaryCard';
import { useCheckInData } from './hooks/useCheckInData';
import { useSummary } from './hooks/useSummary';

export const App = () => {

  const [ selectedCommunity, setSelectedCommunity ] = useState(DEFAULT_COMMUNITY_SELECTION)
  
  const { 
    isLoadingData, 
    people, 
    communities, 
    registering, 
    handleCheckOut, 
    handleCheckIn,
    definePersonStatus
  } = useCheckInData(selectedCommunity)

  const { peopleInTheEvent, notCheckedIn, companyGroupStr } = useSummary(selectedCommunity, people, registering)
  const peopleWithStatus = definePersonStatus(people)

  if (isLoadingData) {
    return (
      <div className='flex justify-center items-center h-screen font-bold'>
        <p>{Texts.LOADING_DATA}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className='font-bold text-lg text-center p-3 bg-slate-500 text-white'>{Texts.HOME_TITLE}</h1>
      <CommunitySelector 
        communities={communities}
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
      />
      
      <div className='px-3'>
        { selectedCommunity !== DEFAULT_COMMUNITY_SELECTION && (
          <SummaryCard 
            peopleInTheEvent={peopleInTheEvent} 
            notCheckedIn={notCheckedIn}
            companyGroupStr={companyGroupStr}
          />
        ) }
        
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 py-3'>
          { peopleWithStatus.map((person, key) => (
            <PersonCard
              key={key}
              id={person._id}
              firstName={person.firstName}
              lastName={person.lastName}
              companyName={person.companyName}
              title={person.title}
              checkIn={person.checkIn}
              checkOut={person.checkOut}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          )) }
        </div>
      </div>
      
    </div>
  )
};
