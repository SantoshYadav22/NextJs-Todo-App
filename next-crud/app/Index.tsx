import React, { useEffect, useState } from 'react';

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/read')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default Index;
