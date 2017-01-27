import React from 'react';
import { Checkbox } from 'react-bootstrap';

let AvailableInterests = ({checked, interest, toggleInterest}) => (
 <Checkbox 
 checked={checked}
 onChange={()=>{toggleInterest(interest.id); checked=!checked}}
 inline>
 {
   interest.Interest
 }
 </Checkbox>
) 

export default AvailableInterests;