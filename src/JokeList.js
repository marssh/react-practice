import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lockJokes, setLockJokes] = useState(new Set());
  useEffect(() => {
    if (!localStorage.jokes) {
      getJokes()
    } else {
      let parse = JSON.parse(localStorage.jokes);
      setJokes(parse);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes])

  async function getJokes() {
    let tracker = new Set();
    

    while (tracker.size < numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" }
      });

      if (!tracker.has(response.data.id)) {
        tracker.add(response.data.id);
        response.data.votes = 0;
        setJokes(oldJokes => [...oldJokes, response.data]);
      };
    };
    setLoading(false);
  };

  // function fixStorage() {
  //   let pass = JSON.stringify(jokes);
  //   console.log(pass);
  // }

  async function getNewJokes() {
    setLoading(false);
    setJokes([]);
    getJokes();
  };

  const changeVote = (id, delta) => {
    
    setJokes(oldJokes => {
      return oldJokes.map((joke) => {
        if (joke.id === id && delta) {
          return { ...joke, votes: joke.votes + delta }
        } else if (joke.id === id && !delta) {
          return {...joke, votes: 0}
        } else {
          return joke
}
}) 
})
  }

  const addLockJoke = joke => {
    let total = 0;
    setLockJokes(oldJokes => {
      oldJokes.forEach(el => {
        if (el.id === joke.id) total++;
      
      })
      console.log(total);
      if (!total) return new Set([...oldJokes, joke])
    })

  }

 

  return (
    <div>
      {isLoading ? (

        <div className="loading">
          < i className="fas fa-4x fa-spinner fa-spin" />
        </div >)
        :
        (< div className="JokeList" >
          <button
            className="JokeList-getmore"
            onClick={getNewJokes}> Get New Jokes </button>

          {
            jokes.map(j => (
              <Joke
                text={j.joke}
                key={j.id}
                id={j.id}
                votes={j.votes}
                vote={changeVote}
                lockJoke={addLockJoke}
              />
            ))}
          { lockJokes &&
            lockJokes.forEach(j => (
              <Joke
                text={j.text}
                key={j.id}
                id={j.id}
                votes={j.votes}
                vote={changeVote}
                lockJoke={addLockJoke}
              />
  
            ))}
        </div>
        )
      }
    </div>
  );
};

export default JokeList;

