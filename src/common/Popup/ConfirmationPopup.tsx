import React, { ChangeEvent } from 'react';

interface Input {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  type?: string;
}

interface ConfirmationPopupProps {
  title: string;
  message: string;
  inputs?: Input[];
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmPhase: boolean;
  showPopup: boolean;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  inputs = [],  // Default value set to an empty array
  onConfirm,
  onCancel,
  isConfirmPhase,
  showPopup,
}) => {
  // Handle the confirmation action
  const handleConfirm = () => {
    onConfirm();
  };

  // Validate if all inputs are filled
  const allInputsFilled = inputs.every(input => input.value !== null && input.value !== undefined);

  if (!showPopup) return null;

  return (
    <div
      className="popup-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="popup"
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '10px' }}>
          {isConfirmPhase ? "Do you confirm your new modifications?" : title}
        </h2>
        <p style={{ marginBottom: '20px' }}>
          {isConfirmPhase ? "These modifications will be saved and your data and business model will be changed accordingly." : message}
        </p>

        {!isConfirmPhase && inputs.length > 0 && inputs.map((input, index) => (
          <div key={index} style={{ width: '100%', marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{input.label}</label>
            <input
              type={input.type || "number"}
              value={input.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => input.onChange(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
          </div>
        ))}

        <div className='w-full flex' style={{ marginTop: '20px' }}>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmPhase && !allInputsFilled}
            style={{
              backgroundColor: isConfirmPhase || allInputsFilled ? '#4CAF50' : 'gray',
              cursor: isConfirmPhase || allInputsFilled ? 'pointer' : 'not-allowed',
              padding: '10px 20px',
              borderRadius: '5px',
              color: 'white',
              flex: 1,
              marginRight: '10px',
              border: 'none',
            }}
          >
            {isConfirmPhase ? "Confirm" : "Save Changes"}
          </button>

          <button
            onClick={onCancel}
            style={{
              backgroundColor: '#2C4026',
              padding: '10px 20px',
              borderRadius: '5px',
              color: 'white',
              flex: 1,
              border: 'none',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
