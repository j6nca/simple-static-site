import logo from './logo.svg';
import './App.css';
import './shell.css';
import Prompt from './components/Prompt';
import In from './components/In';
import {useState} from 'react'
import React, {Component} from 'react'

import help from './data/help.json'


import about from './data/about.json'
import contact from './data/contact.json'
import work from './data/work.json'
import projects from './data/projects.json'
import resume from './data/resume.json'


// process json data
const help_output = stringformatter("commands", 8) + "\t" + stringformatter("description", 23) + "\tusage" + help["commands"].map( (command) => {
return ("\n" + stringformatter(command.command, 8) + "\t" + stringformatter(command.description, 23) + "\t" + command.usage)
});
const ls_output = ["about", "work", "projects", "resume", "contact"].map( (page) => {
  return (page + "\t")
  });
const project_output = "projects" + projects["projects"].map( (project) => {
  return ("\n" + project.name + "\t(" + project.date + ")\n" + project.description)
  });
const work_output = "For more info try 'cat resume'" + "\nwork experience" + "\nfull-time" + 
  work["full-time"].map( (work) => {
    return ("\n" + stringformatter(work.title, 22) + "\t" + "@" + stringformatter(work.company,37) + "\t(" + work.start_date + " - " + work.end_date + ")")
  }) + "\n\ninternships" +
  work["internships"].map( (work) => {
    return ("\n" + stringformatter(work.title, 22) + "\t" + "@" + stringformatter(work.company, 37) + "\t(" + work.start_date + " - " + work.end_date + ")")
  });
const resume_output = "You can generate a resume here: " + resume.resume_url + "\nAlternatively, you can download the last generated resume from: " + resume.resume_url
// const pages = ["about", "work", "projects", "resume", "contact"]
const errorUnknownCommand = "Command not found, please enter 'help' for a list of commands"
function stringformatter (str, l){
  let x = l-str.length
  return str = str + new Array(x + 1).join(' ')
}

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
    this.setState({commands: [...this.state.commands, ["clear",""]],
      commandCounter: this.state.commandCounter + 1,
      commandCutOff: this.state.commandCounter + 1,
      commandIndex: this.state.commandCounter + 1,
    })
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
              this.updateState(e.target.value, ls_output)
              break;
            case "help":
              this.updateState(e.target.value, help_output)
              console.log(help_output)
              break;
            case e.target.value.match(/^cat/)?.input:
              const pagestoread = e.target.value.split(" ").slice(1);
              let outputs = []
              pagestoread.forEach(page => {
                console.log(page)
                switch(page){
                  case "about":
                    outputs.push(project_output);
                    break;
                  case "contact":
                    outputs.push(project_output);
                    break;
                  case "work":
                    outputs.push(work_output);
                    break;
                  case "projects":
                    outputs.push(project_output);
                    break;
                  case "resume":
                    outputs.push(resume_output);
                    break;
                  default:
                    outputs.push("page not found!");
                    console.log("unknown page:", page)
                }
              });
            
              this.updateState(e.target.value, outputs)
              break;
            case "resume":
              this.updateState(e.target.value, resume_output)
              console.log(help_output)
              break;
              
            default:
              this.updateState(e.target.value, errorUnknownCommand)
              console.log("Unknown Command:", e.target.value)
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
        else if (e.key==='ArrowDown' && this.state.commandIndex < this.state.commandCounter){
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
              <pre>{command[1]}</pre>
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
