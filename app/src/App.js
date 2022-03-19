import logo from './logo.svg';
import './App.css';
import './shell.css';
import Prompt from './components/Prompt';
import In from './components/In';
import {useState} from 'react'
import React, {Component} from 'react'
// function App() {
//   const [state,setState]=useState([
//     commands=[],
//     outputs=[]
//   ])
//   function handleKeyDown(e){
//     if (e.key=== 'Enter'){
//       setState(e.target.value)
//       commands.push(e.target.value)
//       console.log(commands)
//       console.log("Command Entered", e.target.value)
//     }
//   }
//   var commands = [1, 2, 3, 4, 5];
//   const listCommands = commands.map((commands) => 
//     <li><Prompt/>{commands}</li>
//     );
//   return (
//     <div className="Shell">
//       <h1>{state}</h1>
//       <ul>{listCommands}</ul>
//       <Prompt/><In handleKeyDown={handleKeyDown.bind(this)}/>
//     </div>
//   );
// }
const pages = ["about", "projects", "resume", "contact"]
const help = ["cat", "clear", "help", "ls"]
const errorUnknownCommand = "Command not found, please enter 'help' for a list of commands"
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: [],
      commandCounter: 0,
      commandCutOff: 0,
      commandIndex: 0,
    };
  }
  
  updateState(c,o){
    this.setState({
      commands: [...this.state.commands, [c,o]],
      commandCounter: this.state.commandCounter + 1,
      commandCutOff: this.state.commandCutOff,
      commandIndex: this.state.commandCounter + 1,
    })
  }
  clearState(){
    this.setState({commands: this.state.commands,
      commandCounter: this.state.commandCounter + 1,
      commandCutOff: this.state.commandCounter,
    })
  }
  checkPage(page){
    if(pages.includes(page)){
      return("page!")
    }else{
      return("page not found!")
    }
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
   handleKeyDown(e){
        if (e.key=== 'Enter'){
          console.log("Command Entered", e.target.value)
          switch(e.target.value) {
            case "clear":
              this.clearState()
              break;
            case "ls":
              this.updateState(e.target.value, pages)
              break;
            case "help":
              this.updateState(e.target.value, help)
              break;
            case e.target.value.match(/^cat/)?.input:
              const pagestoread = e.target.value.split(" ").slice(1);
              let outputs = []
              pagestoread.forEach(page => {
                console.log(page)
                if(pages.includes(page)){
                  outputs.push("page found!")
                }else{
                  outputs.push("page not found!")
                }
              });
            
              this.updateState(e.target.value, outputs)
              break;
            default:
              this.updateState(e.target.value, errorUnknownCommand)
              console.error("Unknown Command")
          }
          console.log("Commands", this.state.commands)
          console.log(this.state)
          document.getElementById('textin').value = "";
          // if (e.target.value == "clear"){
          //   this.setState({ commands: [], outputs: []});
          // }else{
          //   this.setState({commands: [...this.state.commands, e.target.value], outputs: [...this.state.outputs, e.target.value]})
          // // commands.push(e.target.value)
          // // console.log(commands)
          // console.log("Command Entered", e.target.value)
          // }
          
          
        }else if (e.key==='ArrowUp' && this.state.commandIndex != 0){
          document.getElementById('textin').value = this.state.commands[this.state.commandIndex-1][0];
        }
        else if (e.key==='ArrowDown' && this.state.commandIndex != this.state.commandCounter){
          document.getElementById('textin').value = this.state.commands[this.state.commandIndex+1][0];
        }
      }
      render() {
        return (
        <div className="Shell">
          {/* <h1>{this.state.commands}</h1> */}
          <div>
          {this.state.commands.slice(this.state.commandCutOff).map(command => (
            <div><Prompt/>
            <div className="userin">
              {command[0]}<br/>
            </div>
            <div className="output">
              {command[1]}<br/>
            </div>
            </div>
            ))}
          </div>
          <Prompt/><In handleKeyDown={this.handleKeyDown.bind(this)}/>
          <div ref={el => { this.el = el; }} />
        </div>);
};
      }
export default App;
