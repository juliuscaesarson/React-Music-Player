import React, { Component} from 'react';
import fire from './config/fire';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    }
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.logout = this.logout.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
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
      const file = this.state.file[0]
      const storageRef = fire.storage().ref();
      // Checks to see if file name already exists in user's folder
      // Because Firebase API can only request a file that exists, checking for a non-existent file is handled as an error
      // This is why I needed to use the Promise error as a condition for inserting music files
      storageRef.child(fire.auth().currentUser.uid).child(file.name).getDownloadURL().then(onResolve, onReject);
      function onResolve(foundURL) {
        console.log("Filename already exists");
      }
      function onReject(error) {
        // Creates a folder within the database if current user's own folder doesn't exist, but if it already exists, it will put the uploaded file into user specific directory
        const fileRef = storageRef.child(fire.auth().currentUser.uid).child(file.name);
        fileRef.put(file).then(() => {
          console.log("Uploaded file: " + file.name);
      })
    }
    }
    else {
      alert("Please select a file to upload");
    }
    
  }
  

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>React Player</h1>
        </div>
          <input type="file" onChange={(e) => {this.onChangeFile(e.target.files)}} />
          <button onClick={this.upload} className="btn btn-primary">Upload</button>
          <button onClick={this.logout} className="btn btn-success">Logout</button>
          
      </div>
    );
  }
}


export default Home;
