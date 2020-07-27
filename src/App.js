import React from 'react';
import './App.css';
import './tailwind.output.css';

// import Left from './left';
// import Right from './right';

import Todo from './todo';

function App() {
  return (
    <div className="container">
       <div className="flex mb-4 p-5">
          {/* <Left></Left>
          <Right></Right> */}

           <Todo></Todo> 

        </div>

 
    </div>
  );
}

export default App;
