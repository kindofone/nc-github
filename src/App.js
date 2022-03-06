import { BrowserRouter } from "react-router-dom";
import './App.css';
import { useEffect, useState } from 'react';

const OWNER = '';

function App() {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${OWNER}/repos`)
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  useEffect(() => {
    if (selectedRepo !== null) {
      fetch(`https://api.github.com/repos/${OWNER}/${selectedRepo}/commits`)
        .then(response => response.json())
        .then(data => setCommits(data));
    }
  }, [selectedRepo]);

  useEffect(() => {
    if (commits.length > 0) {
      fetch(`https://api.github.com/repos/${OWNER}/${selectedRepo}/commits/${commits[0].sha}`)
        .then(response => response.json())
        .then(data => setFiles(data.files)); 
    } else {
      setFiles([]);
    }
  }, [commits]);

  return (
    <BrowserRouter>
      <div className="App">
        <select onChange={e => setSelectedRepo(e.target.value)}>
          {repos.map(repo => (
            <option value={repo.name}>{repo.name}</option>
          ))}
        </select>
        {files.map(file => (
          <>
            <a href={file.raw_url}>{file.filename}</a><br />
          </>
        ))}
      </div>
    </BrowserRouter>
  );
}

export default App;
