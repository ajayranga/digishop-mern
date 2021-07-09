import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const I = styled.i`
   color: ${(props) => props.color || 'green'};
`;
const UL = styled.ul`
display:flex;
justify-content:flex-start;
align-items:center;
list-style-type:none;
padding:0 5px 0 0;
margin 0;
`;
const DIV = styled.div`
   display: flex;
`;
const Rating = ({ value, numReviews, color }) => {
   const star = [];
   for (var i = 1; i <= 5; i++) {
      if (i <= value) star.push(<I className="fas fa-star"></I>);
      else if (i - value === 0.5)
         star.push(<I className="fas fa-star-half-alt"></I>);
      else star.push(<I className="far fa-star"></I>);
   }
   return (
      <DIV>
         <UL>
            {star.map((itm, index) => (
               <li key={index}>{itm}</li>
            ))}
         </UL>
         <span>from {numReviews} reviews</span>
      </DIV>
   );
};

Rating.propTypes = {
   value: PropTypes.number.isRequired,
   numReviews: PropTypes.number.isRequired,
   color: PropTypes.string,
};
export default Rating;
