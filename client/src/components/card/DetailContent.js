import React from 'react'

const DetailContent = ({image, description}) => {
  return (
      <>
        <div className='container mt-16'>
            <img src={image} alt="detailcontent" className='' />
        </div>

        <div className='container my-16 font-roboto text-lg text-grey text-justify'>
            <p dangerouslySetInnerHTML={{__html:description}}>
            </p>
        </div>
    </>
  )
}

export default DetailContent