import React, { Component } from 'react';
import fire from './config/fire';
import './App.css';
import Audio from './audio';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      audio: [],
      isLoading: false
    }
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.logout = this.logout.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.getAudio = this.getAudio.bind(this);
    // this.handleAudio = this.handleAudio.bind(this);

  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.setState({audio:[]});
    this.getAudio();
  }

  logout() {
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    fire.auth().signOut();
  }

  onChangeFile(file) {
    this.setState({
      file
    })
    console.log(file[0].name);
  }

  upload() {
    if (this.state.file != null) {
      this.setState({audio:[]});
      const file = this.state.file[0]
      const storageRef = fire.storage().ref(fire.auth().currentUser.uid);
      const db = fire.database().ref(fire.auth().currentUser.uid);
      // Checks to see if file name already exists in user's folder
      // Because Firebase API can only request a file that exists, checking for a non-existent file is handled as an error
      // This is why I needed to use the Promise error as a condition for inserting music files
      storageRef.child(file.name).getDownloadURL().then(onResolve, onReject);
      function onResolve(foundURL) {
        alert("Filename already exists");
      }
      function onReject(error) {
        // Creates a folder within the database if current user's own folder doesn't exist, but if it already exists, it will put the uploaded file into user specific directory
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
          console.log("Uploaded file: " + file.name);
          storageRef.child(file.name).getDownloadURL().then(url => {
            let newPostKey = db.push().key;
            db.child(newPostKey).set({
                name : file.name,
                url : url
            });
          })
        })
      }
      document.getElementById("fileUpload").value = "";
    }
    else {
      alert("Please select a file to upload");
    }
    
  } 

  // handleAudio(e) {
  //   let songName = e.target.getAttribute("name");
  //   let buttons = $("button").has("[name='"+songName+"']");
  //   // console.log(buttons);
  //   if (e.target.classList.contains("play") || e.target.classList.contains("fa-play")) {
  //     const audio = $("[title='"+songName+"']")[0];
  //     audio.play();
  //     buttons[0].classList.add("hidden");
  //     buttons[1].classList.remove("hidden");
      

  //   }
  //   if (e.target.classList.contains("pause") || e.target.classList.contains("fa-pause")) {
  //     const audio = $("[title='"+songName+"']")[0];
  //     audio.pause();
  //     buttons[1].classList.add("hidden");
  //     buttons[0].classList.remove("hidden");
  //   }
    

  //   // const audio = document.getElementsByClassName("audio-elements")[0];
  //   // audio.pause();
  // }

  render() {
    // Code to display loading while data is being fetched from https://stackoverflow.com/questions/55359176/handling-undefined-null-properties-in-components-during-first-render
    if (this.state.isLoading) {
      return <h2>Loading...</h2>
    }

    console.log(this.state.audio)
    return (
      <div className="container">
        <div className="page-header">
          <h1>React Player</h1>
          <button onClick={this.logout} id="logout" className="btn btn-success">Logout</button>
        </div >

        <div className="row">
          <input type="file" id="fileUpload" onChange={(e) => {this.onChangeFile(e.target.files)}} />
          <button onClick={this.upload} className="btn btn-primary">Upload</button>
        </div>
  
        <div className="row">
          <ul>
              {this.state.audio.map((song, index) =>
                <Audio key={index} name={song.name} src={song.url} onClick={this.handleAudio} />
              )}
          </ul>
          
        </div>
        </div>
    );
  }

  // Lists all music files regardless of user
  getAudio() {
    let audio = [];
    let current = this;
    fire.database().ref().on("value", function(snapshot) {
      snapshot.forEach(function(child) {
        child.forEach(function(file) {
          // console.log(file.val());
          audio.push({name: file.val().name, url: file.val().url})
          current.setState({audio: audio});
          // console.log(audio);
          current.setState({isLoading: false});
        })

      })
    });

  }
}

export default Home;
