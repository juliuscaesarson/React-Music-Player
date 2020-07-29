import React, { Component } from 'react';
import fire from './config/fire';
import './App.css';
import Audio from './audio';
import Delete from './delete';
import Like from './like';
import Liked from './liked';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);
    // Set state
    this.state = {
      file: null,
      audio: [],
      isLoading: false,
      isUploading: false,
      likes:[],
      filtered: [],
    }
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    // Bind all functions to this
    this.logout = this.logout.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.getAudio = this.getAudio.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.like = this.like.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // Stops page from rerendering until all music files have been loaded by this.getAudio()
    this.setState({isLoading: true});
    // Gets all music files to display on page
    this.getAudio();

  }

  logout() {
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    fire.auth().signOut();
  }

  onChangeFile(file) {
    // Sets state when user chooses a file to upload
    this.setState({
      file
    })
  }

  upload() {
    // Makes sure that a file is selected before uploading file
    if (this.state.file != null) {
      // Stops page from rerendering until file has been successfully uploaded
      this.setState({isUploading:true});
      const current = this;
      const file = this.state.file[0]
      // Set storage and database references using currently logged in user's uid
      // Creates a user's folder within the database if current user's own folder doesn't exist, but if it already exists, it will put the uploaded file into the user specific directory
      const storageRef = fire.storage().ref(fire.auth().currentUser.uid);
      const db = fire.database().ref("users/" + fire.auth().currentUser.uid);
      // Checks to see if file name already exists in user's folder
      // Because Firebase API can only request a file that exists, checking for a non-existent file is handled as an error
      // This is why a Promise error is needed as a condition for inserting music files
      storageRef.child(file.name).getDownloadURL().then(onResolve, onReject);
      // If promise function resolves, that means file exists
      function onResolve(foundURL) {
        alert("Filename already exists");
        current.setState({isUploading: false});
      }
      // If promise function doesn't resolve, then file doesn't exist and we can upload our new file
      function onReject(error) {
        // Set file reference for storage
        const fileRef = storageRef.child(file.name);
        // Puts file into storage
        fileRef.put(file).then(() => {
          console.log("Uploaded file: " + file.name);
          // Gets download url of the newly uploaded file to add to the database
          storageRef.child(file.name).getDownloadURL().then(url => {
            // Generates a new key for the doc that is about to be uploaded from Firebase documentation
            let newPostKey = db.push().key;
            // Set database doc with name, url, key, parent, user, and original
            db.child(newPostKey).set({
                name : file.name.substring(0,file.name.lastIndexOf('.')),
                url : url,
                key : newPostKey,
                parent : fire.auth().currentUser.uid,
                user : fire.auth().currentUser.email,
                original : file.name
            });
            // console.log(current.state.audio);
            current.setState({isUploading:false});
          })
        })
      }
      // Clears the file upload button of the previous file
      document.getElementById("fileUpload").value = "";
    }
    else {
      // Notifies user to select a file
      alert("Please select a file to upload");
    }
    
  } 

  handleEdit(e) {
    // Hides the span element that contains the song name
    e.target.classList.add("hidden");
    // Reveals a text input form  
    e.target.nextElementSibling.classList.remove("hidden");
    // Reveals an edit button to submit new name for song
    e.target.nextElementSibling.nextElementSibling.classList.remove("hidden");
    // Reveals a cancel button to cancel editing
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("hidden");

  }

  edit(e) {
    // Checks to see if user clicked on the edit button or the cancel button
    if (e.target.classList.contains("fa-edit")) {
      // Gets the song's unique key that was generated when uploaded to Firebase database
      let key = e.target.parentElement.parentElement.id;
      // Gets the new name for the song from the input element
      let fileName = e.target.previousElementSibling.value;
      // Set database reference to user specific folder and song that wants to be edited
      let db = fire.database().ref("users/" + fire.auth().currentUser.uid + "/" + key);
      // Sets the key "name" with the new song name 
      db.child("name").set(fileName).then(function() {
        console.log("File renamed");
      }).catch(function(error) {
        console.log("Edit failed: " + error.message);
      });
      // Hides the cancel button
      e.target.nextElementSibling.classList.add("hidden");
      // Hides itself
      e.target.classList.add("hidden");
      // Hides the input form
      e.target.previousElementSibling.classList.add("hidden");
      // Reveals the span containing the new name of the song
      e.target.previousElementSibling.previousElementSibling.classList.remove("hidden");
    }
    else {
      // Hides the cancel button
      e.target.classList.add("hidden");
      // Hides the edit button
      e.target.previousElementSibling.classList.add("hidden");
      // Hides the input form
      e.target.previousElementSibling.previousElementSibling.classList.add("hidden");
      // Reveals the span containing the original name of the song
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove("hidden");
    }


  }

  delete(e) {
    // Gets the song name that needs to be deleted
    let fileName = e.target.title;
    // Gets the unique key for the song from the <li> element
    let key = e.target.parentElement.parentElement.id;
    // Sets database and storage reference
    const fileRef = fire.storage().ref(fire.auth().currentUser.uid + "/" + fileName);
    const db = fire.database().ref("users/" + fire.auth().currentUser.uid + "/" + key);
    // Removes the reference in the database and then removes the file from the storage
    db.remove().then(function() {
      fileRef.delete().then(function() {
        console.log("File Deleted!");
      }).catch(function(error) {
        console.log("Remove file failed: " + error.message)
      })
    }).catch(function(error) {
      console.log("Remove db failed: " + error.message);
    });
    fire.database().ref("likes/" + key).remove().then(function() {
      console.log("Likes removed");
    }).catch(function(error) {
      console.log("Remove likes failed: " + error.message);
    })
    
  }

  like(e) {
    let key = e.target.parentElement.parentElement.id;
    let songName = e.target.parentElement.parentElement.getAttribute("name");
    const db = fire.database().ref("likes/" + key);
    // Check if it hasnt been liked yet, then like it
    if (e.target.classList.contains("fa-thumbs-o-up")) {
      e.target.classList.remove("fa-thumbs-o-up");
      e.target.classList.add("fa-thumbs-up");
      db.child(fire.auth().currentUser.uid).set(songName).then(function() {
        console.log("Liked");
      }).catch(function(error) {
        console.log("Cannot like: " + error.message);
      });

    }
    // If it has already been liked by user, unlike
    else {
      e.target.classList.remove("fa-thumbs-up");
      e.target.classList.add("fa-thumbs-o-up");
      db.child(fire.auth().currentUser.uid).remove().then(function() {
        console.log("Unliked");
      }).catch(function(error) {
        console.log("Cannot unlike: " + error.message);
      })
    }
  }

  handleSearch(e) {
    // Gets the input value in the search bar dynamically
    let search = $("#search").val();
    // Sets state of filtered from this.state.audio with song names that only match the search query
    // Code from https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
    this.setState({
      filtered: this.state.audio.filter(function(song) { 
        if (song.name.toLowerCase().includes(search)) {
          return song
        }

    })});
  }

  render() {
    // Code to display loading while data is being fetched from https://stackoverflow.com/questions/55359176/handling-undefined-null-properties-in-components-during-first-render
    if (this.state.isLoading) {
      return <h2>Loading...</h2>
    }
    // Code to display uploading while file is being uploaded to storage
    if (this.state.isUploading) {
      return <h2>Uploading...</h2>
    }

    // console.log(this.state.audio);
    // console.log(this.state.filtered);
    return (
      <div className="container">
        {/* Main title and logout button */}
        <div className="page-header">
          <h1>React Player</h1>
          <button onClick={this.logout} id="logout" className="btn btn-success">Logout</button>
        </div >
        {/* Upload file elements */}
        <div className="row">
          <input type="text" id="search" defaultValue="" onChange={this.handleSearch} placeholder="Search" />
          <input type="file" id="fileUpload" onChange={(e) => {this.onChangeFile(e.target.files)}} />
          <button onClick={this.upload} className="btn btn-primary">Upload</button>
        </div>
  
        <div className="row">
          <ul>
            {/* List of music files that will be displayed with titles, user who uploaded it, a music player with mutliple functions, and an edit or delete function for user's own music files */}
              {this.state.filtered.map((song, index) => {
                // Code for conditional rendering from https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
                // Checks if logged in user owns these files
                  if (song.parent === fire.auth().currentUser.uid) {
                    // Check if anyone liked this song
                    if (this.state.likes[song.key] === undefined) {
                      return <React.Fragment key={index}>
                      <li className="audioFile" id={song.key} name={song.name}>
                        <Like title={song.name} onClick={this.like} numLikes={0} />
                        <div className="songName">
                          <span className="name" onClick={this.handleEdit}>{song.name}</span>
                          <input className="editName hidden" type="text" defaultValue={song.name}/>
                          <i className="fa fa-edit hidden" onClick={this.edit} title={song.name}/>
                          <i className="fa fa-times hidden" onClick={this.edit} />
                          <br/>
                          <span className="uploadedBy">Uploaded by: {song.user}</span>
                        </div>
                        {/* Audio player component */}
                        <Audio title={song.name} src={song.url} user={song.parent} />
                        {/* Delete button component */}
                        <Delete onClick={this.delete} title={song.original} />
                      </li>
                      </React.Fragment>
                    }
                    else {
                      // Check if currently logged in user liked this song so it can render with the like button already clicked
                      if (this.state.likes[song.key].includes(fire.auth().currentUser.uid)) {
                        return <React.Fragment key={index}>
                        <li className="audioFile" id={song.key} name={song.name}>
                          <Liked title={song.name} onClick={this.like} numLikes={this.state.likes[song.key].length} />
                          <div className="songName">
                            <span className="name" onClick={this.handleEdit}>{song.name}</span>
                            <input className="editName hidden" type="text" defaultValue={song.name}/>
                            <i className="fa fa-edit hidden" onClick={this.edit} title={song.name}/>
                            <i className="fa fa-times hidden" onClick={this.edit} />
                            <br/>
                            <span className="uploadedBy">Uploaded by: {song.user}</span>
                          </div>
                          {/* Audio player component */}
                          <Audio title={song.name} src={song.url} user={song.parent} />
                          {/* Delete button component */}
                          <Delete onClick={this.delete} title={song.original} />
                        </li>
                        </React.Fragment>
                      }
                      // Renders without like button being clicked
                      else {
                        return <React.Fragment key={index}>
                        <li className="audioFile" id={song.key} name={song.name}>
                          <Like title={song.name} onClick={this.like} numLikes={this.state.likes[song.key].length} />
                          <div className="songName">
                            <span className="name" onClick={this.handleEdit}>{song.name}</span>
                            <input className="editName hidden" type="text" defaultValue={song.name}/>
                            <i className="fa fa-edit hidden" onClick={this.edit} title={song.name}/>
                            <i className="fa fa-times hidden" onClick={this.edit} />
                            <br/>
                            <span className="uploadedBy">Uploaded by: {song.user}</span>
                          </div>
                          {/* Audio player component */}
                          <Audio title={song.name} src={song.url} user={song.parent} />
                          {/* Delete button component */}
                          <Delete onClick={this.delete} title={song.original} />
                        </li>
                        </React.Fragment>
                      }
                        
                      
                    }
                  }
                  // Renders music without option to edit or delete
                  else {
                    // Check if anyone has already liked this song
                    if (this.state.likes[song.key] === undefined) {
                      // Returns the music file without edit or delete function because user does not own these files 
                      return <React.Fragment key={index}>
                      <li className="audioFile" id={song.key} name={song.name}>
                        <Like title={song.name} onClick={this.like} numLikes={0} />
                        <div className="songName"><span className="name">{song.name}</span><br/><span className="uploadedBy">Uploaded by: {song.user}</span></div>
                        <Audio title={song.name} src={song.url} user={song.parent} />
                        <div className="empty" />
                      </li>
                      </React.Fragment>
                    }  
                    else {
                      // Check if currently logged in user has liked this song before so it can render like button already clicked
                      if (this.state.likes[song.key].includes(fire.auth().currentUser.uid)) {
                        // Returns the music file without edit or delete function because user does not own these files 
                        return <React.Fragment key={index}>
                        <li className="audioFile" id={song.key} name={song.name}>
                          <Liked title={song.name} onClick={this.like} numLikes={this.state.likes[song.key].length}/>
                          <div className="songName"><span className="name">{song.name}</span><br/><span className="uploadedBy">Uploaded by: {song.user}</span></div>
                          <Audio title={song.name} src={song.url} user={song.parent} />
                          <div className="empty" />
                        </li>
                        </React.Fragment>
                      }
                      else {
                        // Returns the music file without edit or delete function because user does not own these files 
                        return <React.Fragment key={index}>
                        <li className="audioFile" id={song.key} name={song.name}>
                          <Like title={song.name} onClick={this.like} numLikes={this.state.likes[song.key].length}/>
                          <div className="songName"><span className="name">{song.name}</span><br/><span className="uploadedBy">Uploaded by: {song.user}</span></div>
                          <Audio title={song.name} src={song.url} user={song.parent} />
                          <div className="empty" />
                        </li>
                        </React.Fragment>
                      }
                        
                      
                    }
                    
                  }
                    
                })
              }
              
          </ul>
          
        </div>
        </div>
    );
  }

  // Lists all music files and likes regardless of current user
  getAudio() {
    let current = this;
    // Iterates through each user's database and gets information about every music file
    fire.database().ref("users").on("value", function(snapshot) {
      let audio = [];
      snapshot.forEach(function(users) {
        users.forEach(function(file) {
          // Pushes each music file's info into array audio
          audio.push({name: file.val().name, url: file.val().url, key: file.val().key, parent: file.val().parent, user: file.val().user, original: file.val().original});
          // Sets state with new info
          current.setState({audio: audio});
          current.setState({filtered: audio});
        })

      })
      // This function gets an array of who liked which music
      fire.database().ref("likes").on("value", function(snapshot) {
        let likes = {};
        snapshot.forEach(function(file) {
          // Sets music key as dictionary key with array of users as values
          likes[file.key] = Object.keys(file.val())});
          // console.log(likes);
          // Set state
          current.setState({likes: likes});
        })
        // console.log(current.state.likes);
        // console.log(current.state.audio);
        current.setState({isLoading: false});
      });
    };
}

export default Home;
