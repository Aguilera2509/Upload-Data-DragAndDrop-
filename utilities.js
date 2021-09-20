var firebaseConfig = {
  apiKey: "AIzaSyDfB64PIRLxxj7MvaymAu8dS7jVkaj20GY",
  authDomain: "uploader-bf01d.firebaseapp.com",
  projectId: "uploader-bf01d",
  storageBucket: "gs://uploader-bf01d.appspot.com",
  messagingSenderId: "983223449902",
  appId: "1:983223449902:web:53a8e7f4f97a54567362bf",
  measurementId: "G-R7EXZ9Z0DY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const d = document,
  $fileZone = d.querySelector('#fileDropBox'),
  $wrapper = d.querySelector('#wrapper');

const up = (file) =>{
  var storageRef = firebase.storage().ref('data/' + file.name);
  var task = storageRef.put(file);

  const $progress = document.createElement('progress'),
    $span = document.createElement('span');

  $progress.max = 100;
  $progress.value = 0;

  $wrapper.insertAdjacentElement("beforeend",$progress);
  $wrapper.insertAdjacentElement("beforeend",$span);

  task.on('state_changed',

    function prog(ev){
      let prog = Math.round((ev.bytesTransferred / ev.totalBytes) * 100);
      $progress.value = prog;
      $span.innerHTML = `<b>${file.name} ----- ${prog}%<b>`;
    },

    function error(err){
      let message = "Ocurrio un Error (NO) Identificable" || err;
      alert(message);
    },

    function complete(){
      alert("Dato Enviado Con Exito");
      setTimeout(()=>{
        $wrapper.removeChild($progress);
        $wrapper.removeChild($span);
      },3000);
    }
  );
};


d.addEventListener("DOMContentLoaded",(e)=>{
  
  $fileZone.addEventListener("dragover",(e)=>{
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.add("data-zone");
  })
  
  $fileZone.addEventListener("dragleave",(e)=>{
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove("data-zone");
  })
  
  $fileZone.addEventListener("drop", (e)=>{
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files[0];

    up(files);

    e.target.classList.remove("data-zone");
  })

})
