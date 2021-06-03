import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
//--------------------------------------
const Deck = () => {
  const [cards, setCards] = useState([]);
  const [draw, setDraw] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const deckId = useRef(null);
  const start = useRef(true);
  const remaining = useRef(null);

  //------------------------------------
  const shuffleDeck = () => {
    setCards([]);
    setDraw(false);
    setShuffle(!shuffle);
    start.current = true;
  };
  useEffect(() => {
    const getDeckId = async () => {
      const result = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      // setDeckId(result.data.deck_id);
      deckId.current = result.data.deck_id;
    };
    //
    getDeckId();
  }, [shuffle]);
  //-------------------------------------
  useEffect(() => {
    //if not in start mode process getCard function
    if (!start.current) {
      const getCard = async () => {
        const result = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
        );
        console.log(result.data);
        const drawn = result.data.cards[0];
        remaining.current = result.data.remaining;
        console.log(drawn);
        setCards((cards) => [
          ...cards,
          {
            id: drawn.code,
            image: drawn.image,
            suit: drawn.suit,
            value: drawn.value,
            remaining: result.data.remaining,
          },
        ]);
      };
      getCard();
    }
    start.current = false; //signal app that app no longer in start mode
  }, [draw]);
  //-------------------------------------
  const cardsMap = cards.map((card) => <Card card={card} key={card.id} />);

  return (
    <div className="Deck">
      <h3>Deck of Cards Exercise</h3>
      {remaining.current !== 0 ? (
        <button onClick={() => setDraw(!draw)} className="Deck-btn">
          GIMMIE A CARD!
        </button>
      ) : (
        <h1>Game Over</h1>
      )}
      <div>{cardsMap}</div>
      <button onClick={shuffleDeck} className="Deck-btn">
        Shuffle
      </button>
    </div>
  );
};
export default Deck;
