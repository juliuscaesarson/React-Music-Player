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
      file: file[0]
    })
  }

  upload() {
    const file = this.state.file
    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Uploaded file");
    })
    
  }


  render() {
    return (
        <div>
            <h1>Home</h1>
            <input type="file" onChange={(e) => {this.onChangeFile(e.target.files)}} />
            <button onClick={this.upload}>Upload</button>
            <button onClick={this.logout} className="btn btn-success">Logout</button>
            {this.state.email}
        </div>
    );
  }
}


export default Home;
