import React from 'react'
import PortfolioDetails from '../_components/portfolio-details'

const page = ({ params }: { params: { id: string }}) => {
  return (
    <div>
        <PortfolioDetails id={params.id}/>
    </div>
  )
}

export default page