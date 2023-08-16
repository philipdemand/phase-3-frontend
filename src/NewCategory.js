import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewCategory({ newCategory }) {

    const history = useNavigate();

    const [newCatName, setNewCatName] = useState("")

    const handleChange = (e) => {
        setNewCatName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const incomingCategory = {name: newCatName}
        fetch("http://localhost:9292/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incomingCategory)
        })
        .then(r => r.json())
        .then(catName => newCategory(catName))
        setNewCatName("")
        history('/categories');
    }

    return(
        <>
        <h1>Submit New Category</h1>
        <div className="card">
            <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            value={newCatName}
            onChange={handleChange}
          />
          </label>
          <button type="submit">Add Category</button>
      </form>
        </div>
        </>
    )
}

export default NewCategory