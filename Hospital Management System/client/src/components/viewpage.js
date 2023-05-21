import React from 'react';
import '../Styles/viewpage.module.css';

const Card = ({ title, photo, field1, field2, field3, field4 }) => {
  const handleRequestClick = () => {
    // Handle request button click
    console.log('Request button clicked for', title);
  };

  return (
    <div className="card">
      <img src={photo} alt={title} />
      <h2>{title}</h2>
      <p>Field 1: {field1}</p>
      <p>Field 2: {field2}</p>
      <p>Field 3: {field3}</p>
      <p>Field 4: {field4}</p>
      <button onClick={handleRequestClick}>Request</button>
    </div>
  );
};

const CardPage = () => {
  const cardsData = [
    {
      title: 'Card 1',
      photo: 'https://example.com/card1.jpg',
      field1: 'Value 1',
      field2: 'Value 2',
      field3: 'Value 3',
      field4: 'Value 4',
    },
    {
      title: 'Card 2',
      photo: 'https://example.com/card2.jpg',
      field1: 'Value 1',
      field2: 'Value 2',
      field3: 'Value 3',
      field4: 'Value 4',
    },
    // Add more cards here...
  ];

  return (
    <div className="card-page">
      <h1>My Card Page</h1>
      <div className="card-container">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            photo={card.photo}
            field1={card.field1}
            field2={card.field2}
            field3={card.field3}
            field4={card.field4}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPage;
