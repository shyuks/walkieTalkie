import React from 'react';

let ChatJoinModal = ({searchResults}) => {



    if (searchResults) {
      let searchOption = searchResults.option;
      let host = searchResults.res.host;
      
      if ((searchOption === 1 && host === true) || (searchOption === 2 && host === true)) {
        console.log('No available rooms found, you are now the host');
      } else if (searchOption === 2) {
        console.log(`A user ${searchResults.res.distance} miles away was found`);
      } else if (searchOption === 3) {
        console.log('A user with these similar interest was found: ', searchResults.res.interest);
      }
    }
return (
  <div>Hello</div>
)
}

export default ChatJoinModal;