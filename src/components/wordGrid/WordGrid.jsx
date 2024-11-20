import React from "react";
import "./WordGrid.css";

const WordGrid = ({ words, columns, wordColors, onWordClick }) => {
  return (
    <div
      className="word-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="word"
          onClick={() => onWordClick(word)}
          style={{
            backgroundColor: wordColors[word] || "initial",
            pointerEvents: wordColors[word] === "green" ? "none" : "auto",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default WordGrid;
