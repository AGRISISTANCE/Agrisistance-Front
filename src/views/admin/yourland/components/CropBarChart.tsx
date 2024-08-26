import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Crop } from '../../../../redux/landsSlice';


const CropBarChart: React.FC = () => {
    const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);
    
    const crops = selectedLand?.crops || [];
  
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#ffbb28']; // Example colors
  
    return (
      <div style={{ width: '100%', height: 400 }}>
        {crops.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={crops} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="CropName" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cropProfit" fill="#8884d8">
                {crops.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            <h3>No land selected</h3>
            <p>Please select a land to view crop data.</p>
          </div>
        )}
      </div>
    );
  };
  
  const CustomTooltip: React.FC<{ active?: boolean, payload?: any[] }> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as Crop;
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p><strong>{data.CropName}</strong></p>
          <p>Crop Profit: ${data.cropProfit}</p>
          <p>Expected Money Revenue: ${data.expectedMoneyRevenue}</p>
          <p>Expected Weight Revenue: {data.expectedWeightRevenue} kg</p>
          <p>Crop Cost: ${data.cropCost}</p>
        </div>
      );
    }
  
    return null;
  };
  
  export default CropBarChart;