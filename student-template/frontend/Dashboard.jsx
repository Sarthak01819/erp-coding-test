import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Fetch data from '/api/inventory/alerts' inside this useEffect
  useEffect(() => {
    // Implement fetch logic here
    fetch('/api/inventory/alerts') 
      .then(response => response.json()) 
      .then(data => { 
        setInventoryData(data); 
        setLoading(false); 
      }) 
      .catch(error => { 
        console.error('Error fetching inventory alerts:', error); 
        setLoading(false); 
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  // TODO: If inventoryData is empty, return <p>All inventory levels are healthy.</p>
  if (inventoryData.length === 0) { 
    return <p>All inventory levels are healthy.</p>; 
  }
  // TODO: Render a table with columns: Product Name, Quantity, Reorder Level
  
  return (
    <div>
      <h2>Inventory Alerts</h2>
      {/* Implement Table Here */}
      <table> 
        <thead> 
          <tr> 
            <th>Product Name</th> 
            <th>Quantity</th> 
            <th>Reorder Level</th> 
          </tr> 
        </thead> 
        <tbody> 
          {inventoryData.map(item => ( 
            <tr key={item.id}> 
              <td>{item.product_name}</td> 
              <td>{item.quantity}</td> 
              <td>{item.reorder_level}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table>
    </div>
  );
};

export default Dashboard;
