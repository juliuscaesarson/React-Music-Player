import React, { Component } from 'react';
import fire from './config/fire';

class audio extends Component {
  constructor() {
    super();

    
  }

  getAudio() {
    const storageRef = fire.storage().ref();
    // Lists all folders for each user
    storageRef.listAll().then(function(res) {
    res.prefixes.forEach(function(folderRef) {
        console.log(folderRef);
        // Gets each file from each users' folder
        storageRef.child(folderRef.location.path).listAll().then(function(files) {
        // Gets each file's url
        for (var i=0; i<files.items.length; i++) {
            files.items[i].getDownloadURL().then(url => {
            if (fire.auth().currentUser.uid == folderRef.location.path) {
                <audio src={url} />
            }
            else {
                console.log(url);
            }
            
            });
        }
        })
    })
    })
  }
  render() {
    return (
      <div className="App">
        {/* <audio ref={} /> */}
      </div>
      
    );
  }
}


export default audio;
