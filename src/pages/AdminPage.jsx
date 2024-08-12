import React, { useState } from "react";

function AdminPage() {
  const [formState, setFormState] = useState({ name: "", type: "", highDemand: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = "Name is required";
    if (!formState.type) newErrors.type = "Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <label>
        Type:
        <input
          type="text"
          value={formState.type}
          onChange={(e) => setFormState({ ...formState, type: e.target.value })}
        />
        {errors.type && <span>{errors.type}</span>}
      </label>
      <label>
        High Demand:
        <input
          type="checkbox"
          checked={formState.highDemand}
          onChange={(e) => setFormState({ ...formState, highDemand: e.target.checked })}
        />
      </label>
      {formState.highDemand && (
        <div>
          <label>
            Special Offer:
            <input type="text" />
          </label>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdminPage;
