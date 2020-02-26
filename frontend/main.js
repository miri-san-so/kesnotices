url = "http://localhost:5000/api/notices";

didWe = [];
removedCards = [];

atktArr = [];
attendanceArr = [];
defaulterArr = [];
examsArr = [];
seatingArr = [];
resultArr = [];
otherArr = [];

let specific = document.querySelector(".specific");
function getATKT() {
  specific.innerText = "Total ATkT Notices are : " + atktArr.length;
  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(atktArr);
}
function getAttendance() {
  specific.innerText = "Total Attendance Notices are : " + attendanceArr.length;

  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(attendanceArr);
}
function getDefaulter() {
  specific.innerText = "Total Defaulter Notices are : " + defaulterArr.length;

  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(defaulterArr);
}
function getExam() {
  specific.innerText = "Total Exam Notices are : " + examsArr.length;

  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(examsArr);
}
function getSeating() {
  specific.innerText =
    "Total Seating Arrangement Notices are : " + seatingArr.length;
  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(seatingArr);
}
function getResult() {
  specific.innerText = "Total Result Notices are : " + resultArr.length;
  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(resultArr);
}

function getOther() {
  specific.innerText = "Remaining Other Notices are : " + otherArr.length;
  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(otherArr);
}

function getAll() {
  specific.innerText = "";
  allNoticesLinks = document.querySelectorAll(".linksToNotice");
  allNoticesLinks.forEach(elem => elem.remove());
  createCards(didWe[0]);
}

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    appendData(data);
  })
  .catch(function(err) {
    console.log("Fetch err : \n\n", err);
  });

function appendData(data) {
  didWe.push(data);

  // Creating Cards Initially
  let noticeContainer = document.querySelector(".noticeContainer");

  // Change the limit i < data.length during deployment
  for (var i = 0; i < data.length; i++) {
    var link = document.createElement("a");
    link.className = "linksToNotice";
    var div = document.createElement("div");
    div.className = "noticeCard";

    filterExam = data[i].filters[0].exam;
    filterDefaulter = data[i].filters[0].defaulter;
    filterATKT = data[i].filters[0].atkt;
    filterSeatingArrangement = data[i].filters[0].seating_arrangement;
    filterAttendance = data[i].filters[0].attendance;
    filterResult = data[i].filters[0].result;
    div.setAttribute("exam", filterExam);
    div.setAttribute("defaulter", filterDefaulter);
    div.setAttribute("atkt", filterATKT);
    div.setAttribute("seating_arrangement", filterSeatingArrangement);
    div.setAttribute("attendance", filterAttendance);
    div.setAttribute("result", filterResult);

    if (filterExam == true) {
      examsArr.push(data[i]);
    } else if (filterDefaulter == true) {
      defaulterArr.push(data[i]);
    } else if (filterATKT == true) {
      atktArr.push(data[i]);
    } else if (filterSeatingArrangement == true) {
      seatingArr.push(data[i]);
    } else if (filterAttendance == true) {
      attendanceArr.push(data[i]);
    } else if (filterResult == true) {
      resultArr.push(data[i]);
    } else {
      otherArr.push(data[i]);
    }

    let NoticeTitleH1 = document.createElement("H1");
    let NoticeDescriptionH3 = document.createElement("H3");
    let NoticeIndexH5 = document.createElement("H5");
    div.appendChild(NoticeIndexH5);
    div.appendChild(NoticeTitleH1);
    div.appendChild(NoticeDescriptionH3);

    NoticeIndexH5.innerText = "Notice Index : " + data[i].noticeIndex;
    NoticeTitleH1.innerText = data[i].noticeTitle;
    s = data[i].noticeDescription;
    NoticeDescriptionH3.innerText = data[i].noticeDescription;

    link.setAttribute("href", data[i].noticeLink);

    link.appendChild(div);
    noticeContainer.appendChild(link);

    let non = document.querySelector(".numberOfNotices");
    non.innerText = data.length;
  }
}

function createCards(noticesArr) {
  let noticeContainer = document.querySelector(".noticeContainer");
  for (var i = 0; i < noticesArr.length; i++) {
    var link = document.createElement("a");
    link.className = "linksToNotice";
    var div = document.createElement("div");
    div.className = "noticeCard";

    filterExam = noticesArr[i].filters[0].exam;
    filterDefaulter = noticesArr[i].filters[0].defaulter;
    filterATKT = noticesArr[i].filters[0].atkt;
    filterSeatingArrangement = noticesArr[i].filters[0].seating_arrangement;
    filterAttendance = noticesArr[i].filters[0].attendance;
    filterResult = noticesArr[i].filters[0].result;
    div.setAttribute("exam", filterExam);
    div.setAttribute("defaulter", filterDefaulter);
    div.setAttribute("atkt", filterATKT);
    div.setAttribute("seating_arrangement", filterSeatingArrangement);
    div.setAttribute("attendance", filterAttendance);
    div.setAttribute("result", filterResult);

    let NoticeTitleH1 = document.createElement("H1");
    let NoticeDescriptionH3 = document.createElement("H3");
    let NoticeIndexH5 = document.createElement("H5");
    div.appendChild(NoticeIndexH5);
    div.appendChild(NoticeTitleH1);
    div.appendChild(NoticeDescriptionH3);

    NoticeIndexH5.innerText = "Notice Index : " + noticesArr[i].noticeIndex;
    NoticeTitleH1.innerText = noticesArr[i].noticeTitle;
    NoticeDescriptionH3.innerText = noticesArr[i].noticeDescription;

    link.setAttribute("href", noticesArr[i].noticeLink);

    link.appendChild(div);
    noticeContainer.appendChild(link);
  }
}
