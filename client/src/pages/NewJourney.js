import React from 'react';
import AppBarUser from '../components/AppBarUser';
import CreateJourney from '../components/card/CreateJourney';

const NewJourney = () => {
  return (
    <div>
        <AppBarUser />
        <div className='container mt-20'>
            <h1 className='font-roboto text-5xl font-semibold'>New Journey</h1>
        </div>
        <CreateJourney />
    </div>
  )
}

export default NewJourney