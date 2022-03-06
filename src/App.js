import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

const OWNER = 'kindofone';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${OWNER}/repos`)
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <div className="app">
      <div className="repos-list">
        {repos.map(repo => (
          <Link key={repo.name} to={`/${repo.name}`}>{repo.name}</Link>
        ))}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
