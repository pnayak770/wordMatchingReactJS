import React, { useState, useEffect } from "react";
import WordGrid from "./components/wordGrid/WordGrid";
import ConfigPanel from "./components/config/ConfigPanel";
import { connectedWords } from "./data";
import "./App.css";

const App = () => {
  const [groupSize, setGroupSize] = useState(2); 
  const [itemCount, setItemCount] = useState(5); 
  const [columns, setColumns] = useState(4); 
  const [words, setWords] = useState([]); 
  const [wordColors, setWordColors] = useState({}); 
  const [selectedWords, setSelectedWords] = useState([]); 
  const [showConfig, setShowConfig] = useState(false); 
  const [gameCompleted, setGameCompleted] = useState(false); 

  const [attempts, setAttempts] = useState(0); 
  const [matches, setMatches] = useState(0); 


  
  const shuffleWords = () => {
    const selectedGroups = connectedWords.get(groupSize).slice(0, itemCount);
    const flattenedWords = selectedGroups.flat();
    const shuffled = flattenedWords.sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setWordColors({});
    setSelectedWords([]);
    setGameCompleted(false); 
    setAttempts(0); 
    setMatches(0);

  };

  useEffect(() => {
    shuffleWords(); // 
  }, [groupSize, itemCount]);

                 /**   handleWordClick */


  const handleWordClick = (clickedWord) => {
    const updatedSelectedWords = [...selectedWords, clickedWord];

    if (updatedSelectedWords.length === groupSize) {

      setAttempts(prev => prev + 1);

      
      
      const isValidGroup = connectedWords
        .get(groupSize)
        .some((group) =>
          group.every((word) => updatedSelectedWords.includes(word))
        );

      if (isValidGroup) {
        
        const newWordColors = { ...wordColors };
        updatedSelectedWords.forEach((word) => {
          newWordColors[word] = "green";
        });
        setWordColors(newWordColors);

        
        setTimeout(() => {
          setWords((prevWords) =>
            prevWords.filter((word) => !updatedSelectedWords.includes(word))
          );
        }, 500); 

        setMatches(prev => prev + 1);

       
        if (words.length - groupSize === 0) {
          setTimeout(() => {
            setGameCompleted(true); 
          }, 500);
        }
      } else {
       
        const newWordColors = { ...wordColors };
        updatedSelectedWords.forEach((word) => {
          newWordColors[word] = "red";
        });
        setWordColors(newWordColors);

        setTimeout(() => {
        
          const resetColors = { ...wordColors };
          updatedSelectedWords.forEach((word) => {
            delete resetColors[word];
          });
          setWordColors(resetColors);
        }, 1000);
      }

      setSelectedWords([]); 
    } else {
     
      const newWordColors = { ...wordColors, [clickedWord]: "blue" };
      setWordColors(newWordColors);
      setSelectedWords(updatedSelectedWords);
    }
  };

                   /** Reset the game */
  const handleReset = () => {
    shuffleWords();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Word Connect</h1>
        <p>Connect group of <span>{groupSize}</span> words by clicking on related words</p>
      </header>
      <button className="config-button" onClick={() => setShowConfig(!showConfig)}>
        {showConfig ? "Close Config" : "Open Config"}
      </button>
      {showConfig && (
        <ConfigPanel
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          itemCount={itemCount}
          setItemCount={setItemCount}
          columns={columns}
          setColumns={setColumns}
        />
      )}
      <WordGrid
        words={words}
        columns={columns}
        wordColors={wordColors}
        onWordClick={handleWordClick}
      />
       <p>Attempts: {attempts}</p> 
       <p>Matches: {matches}</p> 
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>

     
      {gameCompleted && (
        <div className="completion-message">
          <h2>Congratulations! You completed the game!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
