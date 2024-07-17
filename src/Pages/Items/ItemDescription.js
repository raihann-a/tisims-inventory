import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemDescription = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/items/${id}`);
        setItemData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!itemData) return <div>No data found</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src="https://cdn0-production-images-kly.akamaized.net/C3zk9jKSpft7lkLXAKjI_IcxS0I=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2960800/original/074822100_1573106818-Capacitors__7189597135_.jpg" alt="Item" className="w-full h-auto mb-4 rounded object-cover object-left" />
        </div>
        <div>
          <p className="text-red-600"><strong>Category:</strong> <span className="text-black">{itemData.category}</span></p>
          <p className="text-red-600"><strong>Part Number:</strong> <span className="text-black">{itemData.batch_number}</span></p>
          <p className="text-red-600"><strong>Brand:</strong> <span className="text-black">{itemData.manufacture_brand}</span></p>
          <p className="text-red-600"><strong>Initial Quantity:</strong> <span className="text-black">{itemData.initial_quantity}</span></p>
          <p className="text-red-600"><strong>Description:</strong> <span className="text-black">{itemData.description}</span></p>
          <p className="text-red-600"><strong>Loss Stock:</strong> <span className="text-black">{itemData.loss_stock}</span></p>
          <p className="text-red-600"><strong>Current Stock:</strong> <span className="text-black">{itemData.current_quantity}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;
