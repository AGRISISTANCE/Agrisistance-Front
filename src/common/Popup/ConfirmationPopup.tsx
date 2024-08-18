import React, { useState } from 'react';
import './ConfirmationPopup.css'; // Add styles

interface ConfirmationPopupProps {
  title: string;
  message: string;
  inputFields?: Array<{ label: string; name: string }>; // Optional for inputs
  onSubmit: (data: any) => void; // What happens on confirm
  onCancel: () => void; // What happens on cancel  
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  inputFields,
  onSubmit,
  onCancel,
}) => {
  const [inputData, setInputData] = useState<{ [key: string]: string }>({});
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // Check if all inputs are filled for button enabling
  const allInputsFilled = inputFields?.every(input => inputData[input.name]?.trim()) ?? true;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{title}</h2>
        <p>{message}</p>
        
        {inputFields?.map((field, idx) => (
          <div key={idx}>
            <label>{field.label}</label>
            <input 
              type="text" 
              name={field.name}
              value={inputData[field.name] || ''} 
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className="popup-buttons">
          <button 
            className={`submit-btn ${allInputsFilled ? 'enabled' : 'disabled'}`}
            onClick={() => onSubmit(inputData)} 
            disabled={!allInputsFilled}
          >
            Save Changes
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;