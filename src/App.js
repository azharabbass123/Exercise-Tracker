import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from './components/Posts';
import ExerciseList from './components/exercises-list.component';
import EditExerciseList from './components/edit-exercises.componenet';
import CreateExercise from './components/create-exercises.componenet';
import CreateUser from './components/create-user.component'
import Navbar from './components/Navbar.component';

function App() {
  return (
    <Router>
      <div className='container'>
      <Navbar />
      <br />
      <Routes>
      <Route path="/" exact Component={ExerciseList} />
      <Route path="/edit/:id"  Component={EditExerciseList} />
      <Route path="/create"  Component={CreateExercise} />
      <Route path="/user"  Component={CreateUser} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
