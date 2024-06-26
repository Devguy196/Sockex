  import React, { useState } from 'react';
  import initialSockData from '../assets/initialSockData.json';
  
  const NewSockForm = () => {
    const [formData, setFormData] = useState(initialSockData);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const [section, key] = name.split(".");
  
      if (section === "sockDetails" || section === "additionalFeatures") {
        setFormData((prevData) => ({
          ...prevData,
          [section]: {
            ...prevData[section],
            [key]: type === 'checkbox' ? checked : value
          }
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("https://ecs.the-sock-exchange.com/api/socks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to add sock");
        }
  
        const result = await response.json();
        console.log("Sock added successfully:", result);
      } catch (error) {
        console.error("Error adding sock:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add a New Sock</h2>
  
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <h3>Sock Details</h3>
          <label>Size:</label>
          <input
            type="text"
            name="sockDetails.size"
            value={formData.sockDetails.size}
            onChange={handleChange}
          />
          <label>Color:</label>
          <input
            type="text"
            name="sockDetails.color"
            value={formData.sockDetails.color}
            onChange={handleChange}
          />
          <label>Pattern:</label>
          <input
            type="text"
            name="sockDetails.pattern"
            value={formData.sockDetails.pattern}
            onChange={handleChange}
          />
          <label>Material:</label>
          <input
            type="text"
            name="sockDetails.material"
            value={formData.sockDetails.material}
            onChange={handleChange}
          />
          <label>Condition:</label>
          <input
            type="text"
            name="sockDetails.condition"
            value={formData.sockDetails.condition}
            onChange={handleChange}
          />
          <label>For Foot:</label>
          <input
            type="text"
            name="sockDetails.forFoot"
            value={formData.sockDetails.forFoot}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <h3>Additional Features</h3>
          <label>Water Resistant:</label>
          <input
            type="checkbox"
            name="additionalFeatures.waterResistant"
            checked={formData.additionalFeatures.waterResistant}
            onChange={handleChange}
          />
          <label>Padded:</label>
          <input
            type="checkbox"
            name="additionalFeatures.padded"
            checked={formData.additionalFeatures.padded}
            onChange={handleChange}
          />
          <label>Anti Bacterial:</label>
          <input
            type="checkbox"
            name="additionalFeatures.antiBacterial"
            checked={formData.additionalFeatures.antiBacterial}
            onChange={handleChange}
          />
        </div>
  
        <button type="submit">Add Sock</button>
      </form>
    );
  };
  
  export default NewSockForm;