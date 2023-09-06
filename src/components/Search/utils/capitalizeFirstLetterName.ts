function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function capitalizeName(name: string) {
  const nameArray = name.split(' ');
  const capitalizedArray = nameArray.map(word => capitalizeFirstLetter(word));
  return capitalizedArray.join(' ');
}
