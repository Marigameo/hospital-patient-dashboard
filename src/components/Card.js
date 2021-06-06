import React from 'react'
import '../css/card.css'

export default function Card ({ item, updateData }) {
    return (
        <div className="card">
            <p>Name - {item.name}</p>
            <p>Age - {item.age}</p>
            <p>Body Temperature - {item.bodyTemperature}</p>
            <span className="tag">{item.area}</span>
            {item.isActive ? <button className="btn active" onClick={() => updateData(item)}>Resolve</button> : <button className="btn inactive" onClick={() => updateData(item)}>Mark Active</button>}
        </div>
    )
}
