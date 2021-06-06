import React from 'react'

export default function Header ({ sortActiveCases }) {
    return (
        <div className="headerWrapper">
            <button className="btn headerbtn" onClick={sortActiveCases}>Sort by names</button>
        </div>
    )
}
