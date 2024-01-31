import React, { useState } from 'react';

const ArrayOfList = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Carrot' },
  { id: 4, name: 'Grapes' },
  { id: 5, name: 'Pineapple' },
];

const ListItems = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClick = (id) => {
    const newSelectedItems = selectedItems.slice();
    console.log(newSelectedItems);
    if (selectedItems.includes(id)) {
      const index = selectedItems.indexOf(id);
      newSelectedItems.splice(index, 1); 
      console.log(newSelectedItems.length);
    } else {
      newSelectedItems.push(id); 
      console.log(newSelectedItems);
    }
    setSelectedItems(newSelectedItems);
    console.log(setSelectedItems);
  };

  return (
    <div>
      <h1>Task to be Completed</h1>
      {ArrayOfList.map((eachItem, id) => ( 
        <li key={id}>
          <input type="checkbox" checked={selectedItems.includes(eachItem.id)}
             onChange={() => handleClick(eachItem.id)}
          />
          {eachItem.name}         
        </li>
      ))}

      <br />
      <h3>Completed:</h3>
      {selectedItems.length > 0 && (
        <ul>
          {selectedItems.map((id) => (
            <li key={id}>{ArrayOfList.find((item) => item.id === id).name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListItems;