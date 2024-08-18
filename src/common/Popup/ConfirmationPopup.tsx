import React, { useState } from 'react';
import './ConfirmationPopup.css'; // Add styles for blurred background

type PopupVariant = 'inputStage' | 'confirmationStage';

interface ConfirmationPopupProps {
  title: string;
  message: string;
  inputs?: { label: string; value: string; setValue: (value: string) => void }[]; // Optional inputs
  onCancel: () => void;
  onConfirm: (data?: any) => void;  // Modify to accept optional data
  showPopup: boolean;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  inputs,
  onCancel,
  onConfirm,
  showPopup,
}) => {
  const [currentStage, setCurrentStage] = useState<PopupVariant>('inputStage');
  const areInputsFilled = !inputs || inputs.every(input => input.value.trim() !== '');

  const handleSubmit = () => {
    if (currentStage === 'inputStage') {
      setCurrentStage('confirmationStage'); // Move to confirmation stage
    } else {
      const formData = inputs?.reduce((acc, input) => {
        acc[input.label] = input.value; // Collect form input values
        return acc;
      }, {} as Record<string, string>);
  
      onConfirm(formData); // Pass the form data
    }
  };

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{title}</h3>
            <p>{message}</p>
            
            {currentStage === 'inputStage' && inputs && (
              <div className="input-container">
                {inputs.map((input, index) => (
                  <div key={index}>
                    <label>{input.label}</label>
                    <input
                      type="text"
                      value={input.value}
                      onChange={(e) => input.setValue(e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="button-container">
              <button
                onClick={handleSubmit}
                disabled={!areInputsFilled && currentStage === 'inputStage'}
                style={{
                  backgroundColor: areInputsFilled ? 'green' : 'gray',
                  cursor: areInputsFilled ? 'pointer' : 'not-allowed',
                }}
              >
                {currentStage === 'inputStage' ? 'Submit' : 'Save Changes'}
              </button>
              <button onClick={onCancel} style={{ backgroundColor: '#2C4026' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationPopup;
