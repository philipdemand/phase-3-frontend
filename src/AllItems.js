import Item from './Item'

function AllItems({ categories, onDeleteItem, editDescription }) {

    const itemsWithCategoryName = [];

    categories.forEach(category => {
        const categoryName = category.name;
        category.items.forEach(item => {
            itemsWithCategoryName.push({
                ...item,
                category_name: categoryName,
            });
        });
    });

    return (
        <div>
            <h1>All Items</h1>
            {itemsWithCategoryName.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} editDescription={editDescription}/>)}
        </div>
    )
}

export default AllItems