import { useState } from 'react'
import Search from "./components/Search";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>GitHub User Search</h1>
      <Search />
    </div>
  );
}

export default App;
