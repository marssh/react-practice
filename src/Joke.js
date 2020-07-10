import React from "react";
import "./Joke.css";

function Joke({ id, vote, votes, text, lockJoke }) {

  const handleDownVote = e => {
    vote(id, -1);
  }
  const handleUpVote = e => {
    vote(id, 1);
  }

  const resetVotes = e => vote(id, 0);

  const handleLockJoke = e => {
    lockJoke({ id, text, votes });
  }

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={handleUpVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={handleDownVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        <button onClick={resetVotes}>Reset</button>
        <button onClick={handleLockJoke}><span>🔒</span></button>
        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );

}

export default Joke;



