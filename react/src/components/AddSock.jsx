import React, { useState } from 'react';

const AddSock = () => {
  const [formData, setFormData] = useState({
    userId: "",
    sockDetails: {
      size: "Small",
      color: "",
      pattern: "",
      material: "",
      condition: "New",
      forFoot: "Left"
    },
    additionalFeatures: {
      waterResistant: false,
      padded: false,
      antiBacterial: false
    },
    addedTimestamp: new Date().toISOString()
  });

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
    <form className="p-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.size">Size</label>
        <select
          className="form-control"
          id="size"
          name="sockDetails.size"
          value={formData.sockDetails.size}
          onChange={handleChange}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.color">Color</label>
        <input
          type="text"
          className="form-control"
          id="color"
          name="sockDetails.color"
          value={formData.sockDetails.color}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.pattern">Pattern</label>
        <input
          type="text"
          className="form-control"
          id="pattern"
          name="sockDetails.pattern"
          value={formData.sockDetails.pattern}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.material">Material</label>
        <input
          type="text"
          className="form-control"
          id="material"
          name="sockDetails.material"
          value={formData.sockDetails.material}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.condition">Condition</label>
        <select
          className="form-control"
          id="condition"
          name="sockDetails.condition"
          value={formData.sockDetails.condition}
          onChange={handleChange}
        >
          <option>Used</option>
          <option>New</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sockDetails.forFoot">For Foot</label>
        <select
          className="form-control"
          id="forFoot"
          name="sockDetails.forFoot"
          value={formData.sockDetails.forFoot}
          onChange={handleChange}
        >
          <option>Left</option>
          <option>Right</option>
          <option>Both</option>
        </select>
      </div>
      <div className="row">
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="additionalFeatures.waterResistant"
            name="additionalFeatures.waterResistant"
            checked={formData.additionalFeatures.waterResistant}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="additionalFeatures.waterResistant">
            Water Resistant
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="additionalFeatures.padded"
            name="additionalFeatures.padded"
            checked={formData.additionalFeatures.padded}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="additionalFeatures.padded">
            Padded
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="additionalFeatures.antiBacterial"
            name="additionalFeatures.antiBacterial"
            checked={formData.additionalFeatures.antiBacterial}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="additionalFeatures.antiBacterial">
            Anti Bacterial
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddSock;