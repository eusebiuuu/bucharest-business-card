fetch("scripts/park.json")
  .then(response => response.json())
  .then(parks => {
    const parksList = document.querySelector('.parks-list');

    function setParkContent(name) {
      const currPark = parks.find(elem => elem.name == name);
      const imageContainer = document.querySelector('.park-image');
      const title = document.querySelector('.park-title');
      const parkDescription = document.querySelector('.park-description');
      imageContainer.setAttribute('src', currPark.image);
      parkDescription.innerHTML = currPark.description;
      title.innerHTML = currPark.name;
    }

    setParkContent("Cismigiu Garden");

    parks.forEach(elem => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        setParkContent(elem.name);
      })
      button.textContent = elem.name;
      listItem.appendChild(button);
      parksList.appendChild(listItem);
    });
  })
  .catch(err => console.log(err))

