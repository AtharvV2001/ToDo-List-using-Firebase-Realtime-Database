// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase,
    ref, 
    get, 
    remove, 
    onValue, 
    update, 
    push, 
    child } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut,
    updateProfile } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjT20uemg2o3-vO-G3226x1POI0SsGJgU",
    authDomain: "sample-project-ae235.firebaseapp.com",
    databaseURL: "https://sample-project-ae235-default-rtdb.firebaseio.com",
    projectId: "sample-project-ae235",
    storageBucket: "sample-project-ae235.appspot.com",
    messagingSenderId: "553746740022",
    appId: "1:553746740022:web:add969c9303dc070267997",
    measurementId: "G-TV840FF717"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let logUserID;


// Toggel between Login and Signup
document.getElementById('regiYes').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('log').style.display = "none";
    document.getElementById('regi').style.display = "block";
})
document.getElementById('logYes').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('log').style.display = "block";
    document.getElementById('regi').style.display = "none";
})

// Check Auth status of user
onAuthStateChanged(auth, user => {
    if (user) {
        console.log('user logged in: ', user);
        document.getElementById('log').style.display = "none";
        document.getElementById('regi').style.display = "none";
        document.getElementById('todos').style.display = "block";
        document.getElementById('input-name').innerText = user.displayName;
        logUserID = user.uid;
        console.log(logUserID);
    } else {
        console.log('user logged out');

    }
})


// Function to Log User in
document.getElementById('logUser').addEventListener('click', (e) => {
    e.preventDefault();
    let ipwd = document.getElementById('pwdl').value;
    let iemail = document.getElementById('emaill').value;
    let ncn = 0, ecn = 0, pcn = 0, cpcn = 0, mcn = 0;

    // Check for email field
    let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (iemail == "") {
        document.getElementById('error-emaill').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        ecn = 1;
    }
    if (!regexForEmail.test(iemail) && ecn != 1) {
        document.getElementById('error-emaill').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Enter vaild Email ID</div>';
    }
    if (regexForEmail.test(iemail) && ecn != 1) {
        document.getElementById('error-emaill').innerHTML = "";
        mcn++;
    }

    if (ipwd == "") {
        document.getElementById('error-pwdl').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        pcn = 1;
    }
    if (pcn != 1) {
        document.getElementById('error-pwdl').innerHTML = "";
        mcn++;
    }

    if (mcn != 2) return 0;


    signInWithEmailAndPassword(auth, iemail, ipwd)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            document.getElementById('log').style.display = "none";
            document.getElementById('todos').style.display = "block";
            console.log(`Signed Up !!!!\n\n${user}\n\n\n${userCredential}`)
            logUserID = user.uid;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ERROR~~~~~~~~~\n\n${errorCode} and ${errorMessage}`);
            if (errorCode != 'auth/wrong-password') {
                document.getElementById('error-pwdl').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Worng Password</div>';
            }
        });

})


// Function for Check Validation in Registration Form
document.getElementById('registerUser').addEventListener('click', (e) => {
    e.preventDefault();
    // Access the Inputed Value
    let iemail = document.getElementById('email').value;
    let ipwd = document.getElementById('pwd').value;
    let iconpwd = document.getElementById('conpwd').value;
    let iname = document.getElementById('name').value;
    //let iuid = document.getElementById('uid').value;

    let ename = "", eemail = "", epwd = "", ecompwd = "";
    let ncn = 0, ecn = 0, pcn = 0, cpcn = 0, mcn = 0;

    // Check Validation for blank Field
    if (iname == "" && iemail == "" && ipwd == "" && iconpwd == "") {
        document.getElementById('error-name').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        document.getElementById('error-email').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        document.getElementById('error-pwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        document.getElementById('error-conpwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        return 0;
    }

    if (iname == "") {
        document.getElementById('error-name').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
    }
    if (iname != "") {
        document.getElementById('error-name').innerHTML = "";
        mcn++;
    }

    // Check for email field
    let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (iemail == "") {
        document.getElementById('error-email').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        ecn = 1;
    }
    if (regexForEmail.test(iemail) != true && ecn != 1) {
        document.getElementById('error-email').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Enter vaild Email ID</div>';
    }
    if (regexForEmail.test(iemail) && ecn != 1) {
        document.getElementById('error-email').innerHTML = "";
        mcn++;
    }

    // Validtion for Password
    let regexForCaps = /[A-Z]/g;
    let regexForNumber = /[0-9]/g;
    let regexForSpeChar = /\W/g;

    if (ipwd == "") {
        document.getElementById('error-pwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        pcn = 1;
    }

    if (ipwd.length < 8 && pcn != 1) {
        epwd += "Password must have 8 Char.<br>";
        pcn = 2;
    }
    if (regexForCaps.test(ipwd) != true && pcn != 1) {
        epwd += "Password must have 1 Capital Letter.<br>";
        pcn = 2;
    }
    if (regexForNumber.test(ipwd) != true && pcn != 1) {
        epwd += "password must have 1 Number.<br>";
        pcn = 2;
    }
    if (regexForSpeChar.test(ipwd) != true && pcn != 1) {
        epwd += "Password must have 1 Special Char.<br>";
        pcn = 2;
    }
    if (pcn == 2) {
        document.getElementById('error-pwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">' + epwd + '</div>';
    }

    if (pcn != 1 && pcn != 2) {
        document.getElementById('error-pwd').innerHTML = "";
        mcn++;
    }

    // Validation for Confirm Password
    if (iconpwd == "") {
        document.getElementById('error-conpwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Please fill this field</div>';
        cpcn = 1;
    }
    if (iconpwd != ipwd && cpcn != 1) {
        document.getElementById('error-conpwd').innerHTML = '<div class="alert alert-danger errorshow" role="alert">Confirm Password must match with Password</div>';
    }
    if (iconpwd == ipwd && cpcn != 1) {
        document.getElementById('error-conpwd').innerHTML = "";
        mcn++;
    }
    if (mcn != 4) return 0;

    // If All Validation Checked
    createUserWithEmailAndPassword(auth, iemail, ipwd)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            document.getElementById('input-name').innerText = iname;
            document.getElementById('regi').style.display = "none";
            document.getElementById('todos').style.display = "block";
            updateProfile(auth.currentUser,{ displayName: iname }).then((e)=>{
                console.log(e);
            }).catch(
                (err) => console.log(err)
              );
            console.log(`Signed Up !!!!\n\n${JSON.stringify(user)}\n\n\n${userCredential}`);
            logUserID = user.uid;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ERROR~~~~~~~~~\n\n${errorCode} and ${errorMessage}`);
        });
});
console.log(logUserID);

document.getElementById('logout').addEventListener('click', e => {
    e.preventDefault();
    signOut(auth).then(() => {
        document.getElementById('log').style.display = "block";
        document.getElementById('todos').style.display = "none";
        logUserID = "";
    }).catch((error) => {
        console.log(`ERROR ~~~~~~~~~~~~~~~~~~~~${error}`);
    });
})

let keyArr = [];
let maxNo = 0;


// For reload the list if changed
const dbrefrt = ref(database, 'task');
onValue(dbrefrt, (snapshot) => {
    keyArr = [];
    maxNo = 0;
    console.log(snapshot.child('task/').key);
    document.getElementById('todo-list').innerHTML = "";
    snapshot.forEach(childss => {
        display_list(childss.val().id, childss.val().title, childss.val().task);
        keyArr.push(childss.key);
        //console.log(keyArr);
        if (maxNo < childss.val().id) {
            maxNo = childss.val().id;
        }
    });
    //console.log(`maxNo ${maxNo}`);
    if (maxNo === 0) {
        document.getElementById('empty-list').style.display = "block";
    }
});

// Adding new item in list and displaying
document.getElementById('addUserTask').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('tno').value = maxNo + 1;
    const num = maxNo + 1;
    console.log(maxNo);
    const titles = document.getElementById('titlea').value;
    const dec = document.getElementById('desca').value;
    if (num != "" && titles != "" && dec != "") {
        push(ref(database, 'task/'), {
            id: num,
            title: titles,
            task: dec
        }).then((res) => {
            document.getElementById('titlea').value = "";
            document.getElementById('desca').value = "";
            console.log("Task Added!!!" + res.key);
            if (maxNo === 1) {
                document.getElementById('empty-list').style.display = "none";
            }
        }).catch((error) => {
            console.log(error);
        });
    } else {
        return 0;
    }
});


// Display Item in List
function display_list(a, b, c) {
    let ele = document.getElementById('todo-list');
    const tempele = document.createElement('li');

    ele.appendChild(tempele);

    let lc = ele.lastChild;
    lc.id = "item" + a;
    let cl = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'list-item']
    lc.classList.add(...cl);
    lc.innerHTML = '<div class="ms-2 me-auto" style="max-width: 550px;"><span id="tid" style="display: none">' + a + '</span><div class="fw-bold fs-5" id="title' + a + '">' + b + '</div><span id="desc' + a + '">' + c + '</span></div><div class="badge rounded-pill fs-5 list-btn hov" data-bs-toggle="modal" data-bs-target="#edit-item" onclick="display_edit(' + a + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div><div class="badge rounded-pill fs-5 ms-3 list-btn hov" data-bs-toggle="modal" data-bs-target="#delete-item" onclick="display_delete(' + a + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></div>';
}

// Editing exsiting Item in list and displaying

window.display_edit = function (a) {
    document.getElementById('tnoe').value = a;
    document.getElementById('titlee').value = document.getElementById('title' + a).innerText;
    document.getElementById('desce').value = document.getElementById('desc' + a).innerText;
};


document.getElementById('updateUserTask').addEventListener('click', (e) => {
    e.preventDefault();
    const titles = document.getElementById('titlee').value;
    const dec = document.getElementById('desce').value;
    const id = document.getElementById('tnoe').value;
    if (id != "" && titles != "" && dec != "") {
        const dbref = ref(database);
        get(child(dbref, 'task')).then((snapshot) => {
            snapshot.forEach(childss => {
                if (childss.val().id == id) {
                    update(ref(database, 'task/' + childss.key), {
                        id: id,
                        title: titles,
                        task: dec
                    }).then(() => {
                        console.log("Task Updated!!!");
                        document.getElementById('titlee').value = "";
                        document.getElementById('desce').value = "";
                        document.getElementById('tnoe').value = "";
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            })
        });
    } else {
        return 0;
    }

});

// Deleting exsiting Item from list and removing from display

window.display_delete = function (a) {
    document.getElementById('tnod').value = a;
}

document.getElementById('deleteUserTask').addEventListener('click', (e) => {
    const id = document.getElementById('tnod').value;

    if (id != "") {
        const dbref = ref(database);
        get(child(dbref, 'task')).then((snapshot) => {
            snapshot.forEach(childss => {
                if (childss.val().id == id) {
                    remove(ref(database, "task/" + childss.key))
                        .then(() => {
                            console.log("Task Deleted!!!!!");
                            document.getElementById('tnod').value = "";
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        });

    }
    else {
        return 0;
    }
});

