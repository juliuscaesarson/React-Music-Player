(this.webpackJsonpsoundcloud=this.webpackJsonpsoundcloud||[]).push([[0],{15:function(e,t,a){},23:function(e,t,a){e.exports=a(42)},28:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),i=a(18),s=a.n(i),r=(a(28),a(6)),c=a(7),o=a(3),m=a(9),u=a(8),d=(a(15),a(19)),h=(a(38),d.initializeApp({apiKey:"AIzaSyBqjlUw4mmHCifP3BbleVp5sLAUWTYpR74",authDomain:"soundcloud-c3feb.firebaseapp.com",databaseURL:"https://soundcloud-c3feb.firebaseio.com",projectId:"soundcloud-c3feb",storageBucket:"soundcloud-c3feb.appspot.com",messagingSenderId:"1010127862680",appId:"1:1010127862680:web:23e8dd47c88df362d309ed",measurementId:"G-RJF1VBYCE6"})),p=a(20),f=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).login=n.login.bind(Object(o.a)(n)),n.handleChange=n.handleChange.bind(Object(o.a)(n)),n.signup=n.signup.bind(Object(o.a)(n)),n.state={email:"",password:""},n}return Object(c.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(p.a)({},e.target.name,e.target.value))}},{key:"login",value:function(e){e.preventDefault(),h.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((function(e){})).catch((function(e){console.log(e),alert("Email or Password is incorrect")}))}},{key:"signup",value:function(e){e.preventDefault(),""===this.state.email||""===this.state.password?alert("Please enter email and password to sign up"):h.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((function(e){})).then((function(e){console.log(e)})).catch((function(e){alert(e.message)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"col-md-10"},l.a.createElement("form",null,l.a.createElement("div",{className:"form"},l.a.createElement("label",{htmlFor:"emailInput"},"Email Address "),l.a.createElement("input",{value:this.state.email,onChange:this.handleChange,type:"email",name:"email",id:"emailInput"})),l.a.createElement("div",{className:"form"},l.a.createElement("label",{htmlFor:"passInput"},"Password "),l.a.createElement("input",{value:this.state.password,onChange:this.handleChange,type:"password",name:"password",id:"passInput"})),l.a.createElement("button",{type:"submit",onClick:this.login,className:"btn btn-primary"},"Login"),l.a.createElement("button",{onClick:this.signup,className:"btn btn-success"},"Register")))}}]),a}(n.Component),g=a(21),E=a.n(g),b=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"player"},l.a.createElement(E.a,{controls:!0,className:"audio-element",src:this.props.src,title:this.props.title}))}}]),a}(n.Component),k=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"trash"},l.a.createElement("i",{className:"fa fa-trash fa-2x",title:this.props.title,onClick:this.props.onClick}))}}]),a}(n.Component),v=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"like"},l.a.createElement("span",{className:"numLikes"},this.props.numLikes),l.a.createElement("i",{className:"fa fa-thumbs-o-up fa-2x",title:this.props.title,onClick:this.props.onClick}))}}]),a}(n.Component),y=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"like"},l.a.createElement("span",{className:"numLikes"},this.props.numLikes),l.a.createElement("i",{className:"fa fa-thumbs-up fa-2x",title:this.props.title,onClick:this.props.onClick}))}}]),a}(n.Component),N=a(22),C=a.n(N),L=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={file:null,audio:[],isLoading:!1,isUploading:!1,likes:[],filtered:[]},n.logout=n.logout.bind(Object(o.a)(n)),n.upload=n.upload.bind(Object(o.a)(n)),n.onChangeFile=n.onChangeFile.bind(Object(o.a)(n)),n.getAudio=n.getAudio.bind(Object(o.a)(n)),n.delete=n.delete.bind(Object(o.a)(n)),n.edit=n.edit.bind(Object(o.a)(n)),n.handleEdit=n.handleEdit.bind(Object(o.a)(n)),n.like=n.like.bind(Object(o.a)(n)),n.handleSearch=n.handleSearch.bind(Object(o.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.setState({isLoading:!0}),this.getAudio()}},{key:"logout",value:function(){h.auth().signOut()}},{key:"onChangeFile",value:function(e){this.setState({file:e})}},{key:"upload",value:function(){if(null!=this.state.file){this.setState({isUploading:!0});var e=this,t=this.state.file[0],a=h.storage().ref(h.auth().currentUser.uid),n=h.database().ref("users/"+h.auth().currentUser.uid);a.child(t.name).getDownloadURL().then((function(t){alert("Filename already exists"),e.setState({isUploading:!1})}),(function(l){a.child(t.name).put(t).then((function(){console.log("Uploaded file: "+t.name),a.child(t.name).getDownloadURL().then((function(a){var l=n.push().key;n.child(l).set({name:t.name.substring(0,t.name.lastIndexOf(".")),url:a,key:l,parent:h.auth().currentUser.uid,user:h.auth().currentUser.email,original:t.name}),e.setState({isUploading:!1})}))}))})),document.getElementById("fileUpload").value=""}else alert("Please select a file to upload")}},{key:"handleEdit",value:function(e){e.target.classList.add("hidden"),e.target.nextElementSibling.classList.remove("hidden"),e.target.nextElementSibling.nextElementSibling.classList.remove("hidden"),e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("hidden")}},{key:"edit",value:function(e){if(e.target.classList.contains("fa-edit")){var t=e.target.parentElement.parentElement.id,a=e.target.previousElementSibling.value;h.database().ref("users/"+h.auth().currentUser.uid+"/"+t).child("name").set(a).then((function(){console.log("File renamed")})).catch((function(e){console.log("Edit failed: "+e.message)})),e.target.nextElementSibling.classList.add("hidden"),e.target.classList.add("hidden"),e.target.previousElementSibling.classList.add("hidden"),e.target.previousElementSibling.previousElementSibling.classList.remove("hidden")}else e.target.classList.add("hidden"),e.target.previousElementSibling.classList.add("hidden"),e.target.previousElementSibling.previousElementSibling.classList.add("hidden"),e.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove("hidden")}},{key:"delete",value:function(e){var t=e.target.title,a=e.target.parentElement.parentElement.id,n=h.storage().ref(h.auth().currentUser.uid+"/"+t);h.database().ref("users/"+h.auth().currentUser.uid+"/"+a).remove().then((function(){n.delete().then((function(){console.log("File Deleted!")})).catch((function(e){console.log("Remove file failed: "+e.message)}))})).catch((function(e){console.log("Remove db failed: "+e.message)})),h.database().ref("likes/"+a).remove().then((function(){console.log("Likes removed")})).catch((function(e){console.log("Remove likes failed: "+e.message)}))}},{key:"like",value:function(e){var t=e.target.parentElement.parentElement.id,a=e.target.parentElement.parentElement.getAttribute("name"),n=h.database().ref("likes/"+t);e.target.classList.contains("fa-thumbs-o-up")?(e.target.classList.remove("fa-thumbs-o-up"),e.target.classList.add("fa-thumbs-up"),n.child(h.auth().currentUser.uid).set(a).then((function(){console.log("Liked")})).catch((function(e){console.log("Cannot like: "+e.message)}))):(e.target.classList.remove("fa-thumbs-up"),e.target.classList.add("fa-thumbs-o-up"),n.child(h.auth().currentUser.uid).remove().then((function(){console.log("Unliked")})).catch((function(e){console.log("Cannot unlike: "+e.message)})))}},{key:"handleSearch",value:function(e){var t=C()("#search").val();this.setState({filtered:this.state.audio.filter((function(e){if(e.name.toLowerCase().includes(t))return e}))})}},{key:"render",value:function(){var e=this;return this.state.isLoading?l.a.createElement("h2",null,"Loading..."):this.state.isUploading?l.a.createElement("h2",null,"Uploading..."):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"page-header"},l.a.createElement("h1",null,"React Player"),l.a.createElement("button",{onClick:this.logout,id:"logout",className:"btn btn-success"},"Logout")),l.a.createElement("div",{className:"row"},l.a.createElement("input",{type:"text",id:"search",defaultValue:"",onChange:this.handleSearch,placeholder:"    Search"}),l.a.createElement("input",{type:"file",id:"fileUpload",onChange:function(t){e.onChangeFile(t.target.files)}}),l.a.createElement("button",{onClick:this.upload,className:"btn btn-primary"},"Upload")),l.a.createElement("div",{className:"row"},l.a.createElement("ul",null,this.state.filtered.map((function(t,a){return t.parent===h.auth().currentUser.uid?void 0===e.state.likes[t.key]?l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(v,{title:t.name,onClick:e.like,numLikes:0}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name",onClick:e.handleEdit},t.name),l.a.createElement("input",{className:"editName hidden",type:"text",defaultValue:t.name}),l.a.createElement("i",{className:"fa fa-edit hidden",onClick:e.edit,title:t.name}),l.a.createElement("i",{className:"fa fa-times hidden",onClick:e.edit}),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement(k,{onClick:e.delete,title:t.original}))):e.state.likes[t.key].includes(h.auth().currentUser.uid)?l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(y,{title:t.name,onClick:e.like,numLikes:e.state.likes[t.key].length}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name",onClick:e.handleEdit},t.name),l.a.createElement("input",{className:"editName hidden",type:"text",defaultValue:t.name}),l.a.createElement("i",{className:"fa fa-edit hidden",onClick:e.edit,title:t.name}),l.a.createElement("i",{className:"fa fa-times hidden",onClick:e.edit}),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement(k,{onClick:e.delete,title:t.original}))):l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(v,{title:t.name,onClick:e.like,numLikes:e.state.likes[t.key].length}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name",onClick:e.handleEdit},t.name),l.a.createElement("input",{className:"editName hidden",type:"text",defaultValue:t.name}),l.a.createElement("i",{className:"fa fa-edit hidden",onClick:e.edit,title:t.name}),l.a.createElement("i",{className:"fa fa-times hidden",onClick:e.edit}),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement(k,{onClick:e.delete,title:t.original}))):void 0===e.state.likes[t.key]?l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(v,{title:t.name,onClick:e.like,numLikes:0}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name"},t.name),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement("div",{className:"empty"}))):e.state.likes[t.key].includes(h.auth().currentUser.uid)?l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(y,{title:t.name,onClick:e.like,numLikes:e.state.likes[t.key].length}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name"},t.name),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement("div",{className:"empty"}))):l.a.createElement(l.a.Fragment,{key:a},l.a.createElement("li",{className:"audioFile",id:t.key,name:t.name},l.a.createElement(v,{title:t.name,onClick:e.like,numLikes:e.state.likes[t.key].length}),l.a.createElement("div",{className:"songName"},l.a.createElement("span",{className:"name"},t.name),l.a.createElement("br",null),l.a.createElement("span",{className:"uploadedBy"},"Uploaded by: ",t.user)),l.a.createElement(b,{title:t.name,src:t.url,user:t.parent}),l.a.createElement("div",{className:"empty"})))})))))}},{key:"getAudio",value:function(){var e=this;h.database().ref("users").on("value",(function(t){var a=[];t.forEach((function(t){t.forEach((function(t){a.push({name:t.val().name,url:t.val().url,key:t.val().key,parent:t.val().parent,user:t.val().user,original:t.val().original}),e.setState({audio:a}),e.setState({filtered:a})}))})),h.database().ref("likes").on("value",(function(t){var a={};t.forEach((function(e){a[e.key]=Object.keys(e.val())})),e.setState({likes:a})})),e.setState({isLoading:!1})}))}}]),a}(n.Component),j=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).state={user:null},e.authListener=e.authListener.bind(Object(o.a)(e)),e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.authListener()}},{key:"authListener",value:function(){var e=this;h.auth().onAuthStateChanged((function(t){t?e.setState({user:t}):e.setState({user:null})}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"App"},this.state.user?l.a.createElement(L,null):l.a.createElement(f,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.bf46a18c.chunk.js.map