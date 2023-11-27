export function initData(name, id, location) {
  const initData = {
    name: name,
    id: id,
    lvl: 1,
    money: 100000,
    xp: 5,
    planes: [
      {
        name: 'Embraer 190',
        id: 'ERJ190',
        amount: 1,
        price: 100000,
        speed: 0,
        range: 15200,
        capacity: 182,
        fuel: 0,
        maintenance: 1,
        location: location,
        nextFlightTime: null,
        nextFlightDestination: null
      }
    ],
    unlockedLocation: [location]
  };
  return initData;
}
