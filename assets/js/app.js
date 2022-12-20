const desc = document.querySelector('.all_inputs textarea');
const select = document.querySelector('.all_inputs select');
const names = document.querySelector('.all_inputs input');
const form = document.querySelector('#form');
const list = document.querySelector('.item_append');

let issues = JSON.parse(localStorage.getItem("issue-array"))


function saveIssue() {
  let issueDesc = desc.value.trim();
  let issueLevel = select.value;
  let issueName = names.value.trim();
  let issueStatus = 'open'
  let issueid = chance.guid();

  let issue = {
    id : issueid,
    description : issueDesc,
    level: issueLevel,
    name : issueName,
    status : issueStatus
  }

  if (issueDesc !='' && issueName != '') {
    if (localStorage.getItem("issue-array") == null) {
      issues = [];
      issues.push(issue)
      localStorage.setItem('issue-array', JSON.stringify(issues))
      showIssue();

    }
    else {
      issues.push(issue)
      localStorage.setItem('issue-array', JSON.stringify(issues))
      showIssue();

    }

  }
  form.reset();
}
function showIssue() {
  let box ='';
  if(issues){
    issues.forEach((issues, id) => {
      box +=`
      <div id="box">
        <small>Issue ID : ${issues.id}</small>
        <span class='status'>${issues.status}</span>
        <h1>${issues.description}</h1>
        <ul>
          <li><img src="assets/img/time.svg" alt="">${issues.level}</li>
          <li><img src="assets/img/user.svg" alt="">${issues.name}</li>
        </ul>
        <div class="btns">
          <button onClick="updateStatus(this)" type="button" name="button" id='${id}'>Close</button>
          <button onClick="deleteTask(${id})" type="button" name="button" style="background: #ff0000">Delete</button>
        </div>
      </div>
      `
    });

  }
  list.innerHTML = box;
}
showIssue();

form.addEventListener('submit', e => {
  e.preventDefault();
  saveIssue();


})

function updateStatus(selectedItem){
  issues[selectedItem.id].status = "close";
  localStorage.setItem('issue-array', JSON.stringify(issues))
  showIssue();
}

function deleteTask(deleteId) {
  issues.splice(deleteId,1);
  localStorage.setItem("issue-array", JSON.stringify(issues));
  showIssue();

}




















//
