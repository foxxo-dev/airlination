import React from 'react';

const PlaneInfo = ({ plane }) => {
  return (
    <div style={{ marginTop: 25, paddingInline: 25 }}>
      <strong>//{plane.id}</strong> <br />
      <span>Location: {plane.location}</span> <br />
      <span>Price: {plane.price}xp</span>
      {plane.nextFlightDestination && (
        <>
          <hr style={{ marginBlock: 12.5, opacity: 0.7 }} />
          <div
            style={{
              marginLeft: 10,
              borderLeft: '5px solid #434447',
              paddingLeft: 10
            }}
          >
            <span>Destination: {plane.nextFlightDestination}</span>
            <br />
            <span>Flight Time: {plane.nextFlightTime}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaneInfo;
