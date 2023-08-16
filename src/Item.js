import React, { useState } from 'react'

function Item({item, editDescription, onDeleteItem}) {

    const [edit, setEdit] = useState("")
    const [isClicked, setIsClicked] = useState(false)

    const handleChange = (e) => {
        setEdit(e.target.value)
    }

    const handleSubmit = (e, itemId) => {
        e.preventDefault()
        fetch(`http://localhost:9292/items/${itemId}`, {
           method: "PATCH",
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify({description: edit})
        })
        .then((r) => r.json())
        .then(object => editDescription(object))
        
        setIsClicked(false)
    }

    const handleIsClicked = () => {
        setIsClicked(!isClicked)
    }

    const handleDeleteClick = (itemId) => {
        fetch(`http://localhost:9292/items/${itemId}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => onDeleteItem(item.category_id, itemId))
    }

    return (
        <div>
            <div className="card" key={item.id}>
                    <h3>{item.name}</h3>
            {item.description}<img onClick={handleIsClicked} src="https://tinyurl.com/mrxct9mf" alt="edit" width="20" height="20" /><br></br>
            {isClicked ? <form onSubmit={(e) => handleSubmit(e, item.id)}>Edit Description:<input onChange={handleChange} type="text" name="edit" value={edit}></input><button type="submit">Submit</button></form> : null}
            <img
            src={item.img_url}
            alt={`${item.id}`}
            width="200"
            height="150"
            /><br></br>
          Condition : {item.condition}<br></br>
          Contact : <a href={`mailto:${item.email_address}`}>{item.email_address}</a><br></br>
          Price : ${item.price}<br></br>
          Category : {item.category_name}<br></br>
          <button onClick={() => handleDeleteClick(item.id)}>Delete Item</button>
                </div>
        </div>
    )
}

export default Item