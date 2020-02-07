function main(){
  const users = getUsers();
  const reservations = getReservations();
  const reservationsForEmail = sumReservationsForEmail(reservations);
  const usersWithReservations = users.map(userRow => [ ...userRow,reservationsForEmail[userRow[1]] ]);
  pushData(usersWithReservations);
}

// ========================================================================================================
function getUsers(){
  const fetchReq = UrlFetchApp.fetch('http://api.nibol.co/admin/users/listInfo');
  return Utilities.parseCsv(fetchReq); 
}

function pushData(users) {
  SpreadsheetApp
    .getActiveSheet()
    .getRange(2, 1, users.length, users[0].length)
    .setValues(users)
}

function getReservations(){
  const fetchReq = UrlFetchApp.fetch('http://api.nibol.co/admin/reservations/all');
  return Utilities.parseCsv(fetchReq)
}

function sumReservationsForEmail(reservations){
  let resForUser = {}
  reservations.forEach((reservationRow) => {
    if (!resForUser.hasOwnProperty(reservationRow[4])) {
      resForUser[reservationRow[4]] = 1
    };
    resForUser[reservationRow[4]]++;
  });
  return resForUser
}
