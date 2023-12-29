const countriesEl = document.querySelector(".contriesContainer");
const countryDropdown = document.querySelector(".countryDropdown");
const drop = document.querySelector(".dropMenu");
const countryRegion = document.querySelectorAll(".countryRegion");
const searchInp = document.getElementById("searchInp");
const toggleBtn = document.querySelector(".toggleBtn");
const toggleMoon = document.querySelector(".moon");
const countryInfos = document.querySelector(".countryInfos");

// get country function

async function getCountry() {
  const url = await fetch(`https://restcountries.com/v3.1/all`);
  const res = await url.json();
  res.forEach((el) => {
    showCountrys(el);
  });
}

getCountry();

// show countrys function

function showCountrys(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
  <div class="countryBar">
            <div class="countryImg">
                <img src="${data.flags.svg}" alt="">
            </div>
            <div class="countryInfos">
                <h2 class="countryName">${data.name.common}</h2>
                <p><b id="b">Population: </b>${data.population}</p>
                <p class="regionName"><b id="b">Region: </b>${data.region}</p>
                <p><b id="b">Capital: </b>${data.capital}</p>
            </div>
        </div>
        `;
  countriesEl.appendChild(country);
  country.addEventListener("click", () => {
    showCountrysDetails(data);
  });
  console.log(data);
}

// searchBtn

countryDropdown.addEventListener("click", () => {
  drop.classList.toggle("showDropdown");
});

// countryRegion

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
countryRegion.forEach((region) => {
  region.addEventListener("click", () => {
    const selectedRegion = region.innerText;
    Array.from(regionName).forEach((name) => {
      const regionText = name.innerText;
      if (selectedRegion === "All" || regionText.includes(selectedRegion)) {
        name.parentElement.parentElement.style.display = "grid";
      } else {
        name.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

// search

searchInp.addEventListener("input", () => {
  Array.from(countryName).forEach((el) => {
    if (el.innerText.toLowerCase().includes(searchInp.value.toLowerCase())) {
      el.parentElement.parentElement.style.display = "grid";
    } else {
      el.parentElement.parentElement.style.display = "none";
    }
  });
});

// toggle Btn

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");
  toggleMoon.classList.toggle("fas");
});

// showCountrysDetails function

const openedCountry = document.querySelector(".openedCountry");

function showCountrysDetails(data) {
  openedCountry.classList.toggle("show");
  openedCountry.innerHTML = `
      <button class="backBtn">Back</button>
      <div class="blocks">
        <div class="leftBlock">
          <img src="${data.flags.svg}" alt="">
        </div>
        <div class="rightBlock">
          <h1>${data.name.common}</h1>
          <div class="blockInfo">
            <div class="innerBlockLeft innerBlocks">
            <p><b id="b">Native Name: </b>${data.name.common}</p>
              <p><b id="b">Population: </b>${data.population}</p>
              <p><b id="b">Region: </b>${data.region}</p>
              </div>
              <div class="innerBlockRight innerBlocks">
              <p><b id="b">Sub Region: </b>${data.subregion}</p>
              <p><b id="b">Capital: </b>${data.capital}</p>
                </div>
                </div>
                </div>
                </div>
                `;
  console.log(data.languages);
  // Back tugmasi
  const back = document.querySelector(".backBtn");
  back.addEventListener("click", () => {
    openedCountry.classList.toggle("show");
  });
}

searchInp.addEventListener("input", () => {
  const searchValue = searchInp.value.toLowerCase();
  const countryBlocks = document.querySelectorAll(".country");

  countryBlocks.forEach((block) => {
    const countryName = block
      .querySelector(".countryName")
      .innerText.toLowerCase();
    if (countryName.includes(searchValue)) {
      block.style.display = "grid";
    } else {
      block.style.display = "none";
    }
  });
});
