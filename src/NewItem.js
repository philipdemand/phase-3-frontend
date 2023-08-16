import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewItem({ simpCategories, onAddItem }) {

    const history = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        img_url: "",
        condition: "",
        email_address: "",
        price: 0,
        category: ""
      });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        const itemData = {
            name: formData.name,
            description: formData.description,
            img_url: formData.img_url,
            condition: formData.condition,
            email_address: formData.email_address,
            price: parseInt(formData.price),
            category_id: parseInt(formData.category)
        }
        fetch("http://localhost:9292/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(itemData)
        })
        .then((r) => r.json())
        .then(object => onAddItem(object))
        
        setFormData({
            name: "",
            description: "",
            img_url: "",
            condition: "new",
            email_address: "",
            price: 0,
            category: simpCategories.length > 0 ? simpCategories[0] : ""
          });
          history('/categories');
      }
    

    return(
        <div>
            <h1>New Item</h1>
            <section className="card">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label><br></br>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label><br></br>
        <label>
          Image URL:
          <input
            type="text"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
          />
        </label><br></br>
        Condition: <select
            id="selectCondition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="" disabled>
          --Select Condition--
        </option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select><br></br>
        <label>
          Your Email Address:
          <input
            type="text"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
          />
        </label><br></br>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label><br></br>
        Category: <select
            id="selectCategory"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
          --Select Category--
        </option>
            {simpCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select><br></br>
        <button type="submit">Add Item</button>
      </form>
    </section>
        </div>
    )
}

export default NewItem