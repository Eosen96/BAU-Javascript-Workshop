function Library() {
  const address = 'Beşiktaş, İstanbul';
  const operatingHours = '08:00 - 24:00';

  return (
    <div>
      <h2>Library Details</h2>
      <div>Address: {address}</div>
      <div>Opearting Hours: {operatingHours}</div>
    </div>
  );
}

export default Library;
