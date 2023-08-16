import React, { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home'
import CategoryList from './CategoryList'
import Category from './Category'
import NewItem from './NewItem'
import NewCategory from './NewCategory'
import AllItems from './AllItems'

function App() {

  const [categories, setCategories] = useState([])

  const API = "http://localhost:9292/categories"

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(data => setCategories(data))
  }, [])

  const simplifiedCategories = categories.map(category => {
    return { id: category.id, name: category.name };
  });

  const handleEditDescription = (editedItem) => {
    const updatedCategories = categories.map(category =>
      category.id === editedItem.category_id
        ? {
          ...category,
          items: category.items.map(item => (item.id === editedItem.id ? editedItem : item)),
        }
        : category
    );
    setCategories(updatedCategories);
  };

  const handleAddItem = (newItem) => {
    const updatedCategories = categories.map(category =>
      category.id === newItem.category_id
        ? { ...category, items: [...category.items, newItem] }
        : category
    );
    setCategories(updatedCategories);
  }

  const handleDeleteItem = (categoryId, itemId) => {
    const updatedCategories = categories.map(category =>
      category.id === categoryId
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    );
    setCategories(updatedCategories);
  }

  const handleNewCategory = (newItem) => {
    setCategories([...categories, newItem]);
  }

  return (
    <div className="App">
      <div>
        <nav className="nav">
          <Link to="/"><button>Home</button></Link>
          <Link to="/categories"><button>Categories</button></Link>
          <Link to="/categories/all"><button>All Items</button></Link>
          <Link to="/items/new"><button>New Item</button></Link>
          <Link to="/categories/new"><button>New Category</button></Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoryList simpCategories={simplifiedCategories} />} />
        <Route path="/categories/all" element={<AllItems editDescription={handleEditDescription} onDeleteItem={handleDeleteItem} categories={categories} />} />
        <Route path="/categories/:id" element={<Category editDescription={handleEditDescription} categories={categories} onDeleteItem={handleDeleteItem} />} />
        <Route path="/items/new" element={<NewItem simpCategories={simplifiedCategories} onAddItem={handleAddItem} />} />
        <Route path="/categories/new" element={<NewCategory newCategory={handleNewCategory} />} />
      </Routes>
    </div>
  );
}

export default App;
