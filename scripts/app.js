const cardsContainer = document.getElementById("cards-container");
const showAllBtn = document.getElementById("show-all-btn");
const sortBtn = document.getElementById("sort-btn");
const loader = document.getElementById("loader");
const handleModalBtn = document.getElementById("show-modal-btn");

const loadData = async (isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  const res = await fetch(url);
  const data = await res.json();
  let items = data.data.tools;

  // initially display 6 AI cards
  if (!isShowAll) {
    items = items.slice(0, 6);
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  //clear the previous loaded data
  cardsContainer.innerHTML = "";

  items.forEach((item) => {
    displayData(item);
  });
};

//function to sort item by published_in(date)
const sortByDate = (items) => {
  items.sort((a, b) => {
    return new Date(a.published_in) - new Date(b.published_in)
});
  items.forEach((item) => {
    displayData(item);
  });
};

const displayData = (item) => {
  // console.log(item);
  const cardDiv = document.createElement("div");
  cardDiv.classList = "card bg-base-100 shadow-xl border border-2";

  cardDiv.innerHTML = `
    <figure class="px-6 pt-5">
    <img src="${item.image}" alt="${item.name}" class="rounded-xl" />
  </figure>
  <div class="card-body text-left px-2 py-1">
    <h3 class="text-xl font-bold mx-6">Features</h3>
    <div class="mx-6 pb-6 border-b-2">
      ${item.features
        .map(
          (feature, idx) => `
        <p class="text-sm text-gray-500 font-normal"> ${
          idx + 1
        }. ${feature} </p>
        `
        )
        .join("")}
    </div>
 </div>
 <div class="mx-7 py-3 flex justify-between items-center">
    <div class="" >
      <h2 class="text-xl font-bold mb-3">${item.name}</h2>
      <input type="date"  id="date-${item.id}" value="${convertDateFormat(
    item.published_in
  )}">
    </div>
    <div >
    <span id="show-modal-btn" 
     onclick="handleShowModal('${item.id}')" 
     class="bg-rose-500 text-white px-2 py-1 rounded-full text-2xl text-center cursor-pointer hover:bg-rose-700">
     &rarr;
    </span>
    </div>
 </div>
    `;

  cardsContainer.appendChild(cardDiv);
};

// convert date string to required date format
function convertDateFormat(inputDate) {
  const parts = inputDate.split("/");
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return inputDate; // Return as is if not in the expected format
}

// initially display the fetched data
loadData();

//handle ShowAll button
showAllBtn.addEventListener("click", () => {
  loadData(true);
});

const sortedLoadedData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  const res = await fetch(url);
  const data = await res.json();
  let items = data.data.tools;

  cardsContainer.innerHTML = "";
  sortByDate(items);
};

//handle sort button
sortBtn.addEventListener("click", sortedLoadedData);
const url = `https://openapi.programming-hero.com/api/ai/tools`;


const displayModalData = (data) => {
  const modalBoxContainer = document.getElementById("modal-box");

  const {description, pricing, features, integrations } = data;

  const featuresArr = Object.values(features);
  console.log(featuresArr);
 
  modalBoxContainer.innerHTML = `
    <div class=" mx-3 border border-red-500 p-6 rounded bg-rose-100">
      <h2 class="text-xl mb-4 font-bold">${description}</h2>
      <div class="flex items-center justify-center gap-2">
        ${
          pricing.map((val) => `<div class="p-3 my-3 cursor-pointer text-center text-sm font-bold text-green-700 bg-slate-100 rounded-lg">
           <p>${val.price}</p>
           <p>${val.plan}</P>
          </div>`).join("")
        }
      </div>
      <div class="flex justify-between">
        <div class="my-5">
          <h2 class="text-xl font-bold my-4">Features</h2>
          <ul class="list-disc text-base text-gray-600 pl-5"> 
            ${
              featuresArr.map(val => `<li>${val.feature_name}</li>`).join("")
            }
          </ul> 
        </div>
        <div class="my-5">
          <h2 class="text-xl font-bold my-4">Integrations</h2>
          <ul class="list-disc text-base text-gray-600 pl-5"> 
            ${
              integrations.map(val => `<li>
              ${val}
              </li>`).join("")
            }
          </ul> 
        </div>
      </div> 
    </div>
  `
}

const handleShowModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  let itemData = data.data;
  console.log(itemData);

  displayModalData(itemData);
  
  // call to open up modal
  AI_Tool_Modal.showModal();
}


