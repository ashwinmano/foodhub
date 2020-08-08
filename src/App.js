import React ,{useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Recipe from './components/Recipe';
import './App.css';
import Alert from './components/Alert';

function App() {
  const[query,setquery]=useState("");
  const[recipes,setRecipes]=useState([]);
  const[alert,setAlert]=useState("");
  const APP_ID="caaf70cd";
  const APP_KEY="3a4a00a75a9891e37feed9a10daaf8fd	";
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  const getData =async() =>{
    if (query!== ""){
      const result=await Axios.get(url);
      if (!result.data.more){
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits)
      console.log(result)
      setAlert("");
      setquery("");
    }
    else{
      setAlert("Please enter the food");
    }
    
  }

  const onChange =e =>{
    setquery(e.target.value);
  }

  const onSubmit =(e) =>{
    e.preventDefault();
    getData();
  }

  
  return (
    <div className="App">
      <h1 >Food search App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !=="" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search Your Food " 
        autoComplete="off" onChange={onChange} value={query} />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !==[] && 
        recipes.map(recipe =><Recipe key={uuidv4} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
