let userActivity = [
  { user: "Alic A", activeCount: 45 },
  { user: "Alic B", activeCount: 55 },
  { user: "Alic C", activeCount: 97 },
];

let mostActioveUser = userActivity.reduce((maxUser, curr) =>
  curr.activeCount > maxUser.activeCount ? curr : maxUser
);
console.log(mostActioveUser);
