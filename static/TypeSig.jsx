import React from 'react'
import { unAlias } from './util'


const StringTypeSig = ({ simple, full }) => {
    let unlaliasedFull = unAlias(full);
    if (unlaliasedFull.length > 50) {
      return <span>{unAlias(simple)}</span>;
    } else {
      return <span>{unlaliasedFull}</span>;
    }
  };

  
  export default StringTypeSig