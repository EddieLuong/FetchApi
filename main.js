
let url = "http://localhost:3000/students";


function start(url){
    getStudents(url);
    handleCreate();
}
start(url);
// Functions

function getStudents(url){
    axios
    .get(url)
    .then(res=> res.data)
    .then(data=>{
        renderStudents(data);
    })
}
function renderStudents(data){
    let html='';
    data.forEach((student)=>{
        html += `
            <li>
                <h3>Sinh viên: ${student.name}</h3>
                <p>MSV: ${student.MSV}</p>
                <button onclick="handleDelete(${student.id})" id="${student.id}">Delete</button>
            </li>
        `;
    })
    let element = document.querySelector('#studentInfor');
    element.innerHTML = html;
}
function handleDelete(id){
    
    axios.delete(url+'/'+id)
    .then(()=>{
        getStudents(url);
    })
}
function handleCreate(){
    
    let createBtn = document.querySelector('#btn');
    createBtn.onclick = function(){
        let name = document.querySelector('input[name="name"]').value;
        let MSV = document.querySelector('input[name="MSV"]').value;
        let data = {
        name:name,
        MSV: MSV,
    }
        axios
        .post(url,data)
        .then(()=>{
            getStudents(url);
            
        })
        .catch(err=>{
            document.querySelector('#demo').innerHTML = err;
        });
    }
}
