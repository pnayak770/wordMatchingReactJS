import React from "react";
import "./ConfigPanel.css"

const ConfigPanel = ({ groupSize, itemCount, columns, setGroupSize, setItemCount, setColumns }) => {
  return (
    <div className="config-panel">
      
      <h2>Config</h2>
      <div className="config-item">
        <label>GroupSize</label>
        <input
          type="range"
          min="2"
          max="4"
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
        />
        <span>{groupSize}</span>
      </div>
      <div className="config-item">
        <label>ItemCount</label>
        <input
          type="range"
          min="1"
          max="10"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
        />
        <span>{itemCount}</span>
      </div>
      <div className="config-item">
        <label>Columns</label>
        <input
          type="range"
          min="1"
          max="6"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        />
        <span>{columns}</span>
      </div>
    </div>
  );
};

export default ConfigPanel;
