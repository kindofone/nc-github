import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const OWNER = 'kindofone';

function Repo() {
  const [files, setFiles] = useState([]);
  const {repo} = useParams();

  useEffect(async () => {
    const commitsResponse = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/commits`);
    const commits = await commitsResponse.json();
    const filesResponse = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/commits/${commits[0].sha}`);
    const data = await filesResponse.json();
    setFiles(data.files);
  }, []);

  return (
    <>
      <div>{repo}</div>
      <div>
        {files.map(file => (
          <>
            <a href={file.raw_url}>{file.filename}</a><br />
          </>
        ))}
      </div>
    </>
  )
}

export default Repo