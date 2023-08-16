import { Link } from 'react-router-dom'

function CategoryList({ simpCategories }) {

    return (
        <>
        <h1>Categories</h1>
        <ul className="card">
            {simpCategories.map(category => <li key={category.id}><Link to={`/categories/${category.id}`}><button>{category.name}</button></Link></li>)}
        </ul>
        </>
    )
}

export default CategoryList