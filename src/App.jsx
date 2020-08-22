import { h } from 'preact';
import { useState } from 'preact/hooks';
import './App.css';

const App = () => {
  const [name, setName] = useState('zephyrus-wctl');

  return (
    <div class="App">
      <h1>
        Welcome to
        {name}
      </h1>
    </div>
  );
};

export default App;
