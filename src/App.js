import React, {useState,useEffect} from "react";
import api from './services/api.js'
import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
      "title": `Desafio 03 Go Stack Done !!! ${Date.now()}`,
      "url" : "https://github.com/Rocketseat/umbriel",
      "techs" : "NodeJS, ReactJS, React Native"
      
    });
    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
     api.delete(`/repositories/${id}`);
     setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repository => <li key={repository.id}> {repository.title} 
      <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover        
        </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
