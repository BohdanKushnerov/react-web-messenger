const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeName = (name: string) => {
  const nameArray = name.split(' ');
  const capitalizedArray = nameArray.map(word => capitalizeFirstLetter(word));
  return capitalizedArray.join(' ');
};

export default capitalizeName;
