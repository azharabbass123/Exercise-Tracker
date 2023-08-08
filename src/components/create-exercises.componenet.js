import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescriprion = this.onChangeDescriprion.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state={
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    componentDidMount(){
       axios.get('http://localhost:5000/user/')
       .then(response =>{
        if(response.data.length > 0){
            this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
            })
        }
       })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescriprion(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercise/add', exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log("Error: " + err))

        // window.location = '/';
    }
    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key = {user}
                                    value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='from-group'>
                        <label>Description: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChangeDescriprion} />
                    </div>
                    <div className='from-group'>
                        <label>Duration (in minute): </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.duration}
                        onChange={this.onChangeDuration} />
                    </div>
                    <div className='from-group'>
                        <label>Date: </label>
                        <div>
                        <DatePicker
                        selected = {this.state.date}
                        onChange = {this.onChangeDate}
                        />
                        </div>
                    </div>
                    <div className='form-group mt-3'>
                        <input type='submit' value="Create Exercise Log" className='btn btn-primary' />
                        </div>
                </form>
            </div>
        )
    }
}