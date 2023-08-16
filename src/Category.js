import { useParams } from 'react-router-dom'
import Item from './Item'

function Category({ categories, editDescription, onDeleteItem }) {

    const { id } = useParams()

    const targetId = parseInt(id)
    const targetCategory = categories.find(category => category.id === targetId)
    const items = targetCategory?.items || [];

    const itemsWithCategoryName = [];


        items.forEach(item => {
            itemsWithCategoryName.push({
                ...item,
                category_name: targetCategory.name,
            });
        });

    return (
        <div>
            <h1>{targetCategory?.name} Items</h1>
            {itemsWithCategoryName.map(item => <Item key={item.id} item={item} editDescription={editDescription} onDeleteItem={onDeleteItem}/>)}
        </div>
    );
}

export default Category