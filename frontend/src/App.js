import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import './App.css';

class App extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      input: ""
    }
  }

  render() {
    if(this.state.tasks.length === 0)
      return (
        <div className="App">
            <div className='tasks-head'>
              <Badge color="secondary" badgeContent={this.state.tasks.length}>
                <h1>To-DO List</h1>
              </Badge>
            </div>
            <div className="input">
              <TextField size={'medium'} onKeyPress={this.addTask} onChange={this.updateInput} value={this.state.input} id="standard-basic" label="Add a task" />
              <Tooltip title='New task'>
                <Fab size={"medium"} onClick={this.addButton} color="primary" aria-label="add">
                  <AddIcon  />
                </Fab>
              </Tooltip>
            </div>
            <List>
                {this.state.tasks.map((task, i) => (
                    <ListItem data-index={i} onClick={this.deleteTask} key={i} button>
                      <ListItemText className='list-item' primary={task}></ListItemText>
                    </ListItem>
                  )
                )}
            </List>
        </div>
      )
    else
      return (
        <div className="App">
            <div className='tasks-head'>
              <Badge color="secondary" badgeContent={this.state.tasks.length}>
                <h1>To-DO List</h1>
              </Badge>
            </div>
            <div className="input">
              <TextField onKeyPress={this.addTask} onChange={this.updateInput} value={this.state.input} id="standard-basic" label="Add a task" />
              <Tooltip title='New task'>
                <Fab size={"medium"} onClick={this.addButton} color="primary" aria-label="add">
                  <AddIcon  />
                </Fab>
              </Tooltip>
              <Tooltip title='Delete all tasks'>
                <Fab style={{marginLeft: '5px'}} size={"medium"} onClick={this.deleteTasks} color="secondary" aria-label="delete">
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </div>
            <List>
                {this.state.tasks.map((task, i) => (
                    <Tooltip title='Click to remove'>
                      <ListItem data-index={i} onClick={this.deleteTask} key={i} button>
                        <ListItemText data-index={i} className='list-item' primary={task}></ListItemText>
                      </ListItem>
                    </Tooltip>
                  )
                )}
            </List>
        </div>
      )      
  }

  componentDidMount() {
    const oldTasks = localStorage.getItem('tasks')
    if(oldTasks !== null)
    {
      this.setState({
        tasks: JSON.parse(oldTasks)
      })
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    })
  }

  updateInput = event => {
    this.setState({
      input: event.target.value
    })
  }

  addTaskData() {
    this.setState(state => {
      if(state.input === '')
        return
      const tasks = [...state.tasks, state.input]
      return {
        tasks,
        input: ''
      }
    })
  }

  addTask = event => {
    if(event.key === 'Enter')
      this.addTaskData()
  }

  addButton = () => {
    this.addTaskData()
  }

  deleteTask = event => {
    const tasks = [...this.state.tasks]
    const component = event.target
    if(component.nodeName === 'SPAN')
      tasks.splice(component.parentElement.dataset.index, 1)
    else
      tasks.splice(event.target.dataset.index, 1)
    this.setState({
      tasks
    })
  }

  deleteTasks = () => {
    const tasks = []
    this.setState({
        tasks
      })
  }
}

export default App;
