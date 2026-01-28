// const accessKey = "LOSgYgue6_9pp5EfnO8XseQNj-O0sSaQCpaqzQ9uXNY"; // 👈 Use real Unsplash key

// const searchForm = document.querySelector("form");
// const imagesContainer = document.querySelector(".images-container");
// const searchInput = document.querySelector(".search-input");
// const loadMoreBut = document.querySelector(".loadMoreBut");

// let page = 1;
// let currentQuery = "";

// const fetchImages = async (query, pageNo) => {
//   const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (pageNo === 1) {
//       imagesContainer.innerHTML = ""; // Clear only on first page
//     }

//     if (data.results.length === 0) {
//       imagesContainer.innerHTML = `<h2>No images found for "${query}"</h2>`;
//       loadMoreBut.style.display = "none";
//       return;
//     }

//     data.results.forEach((photo) => {
//       const imageDiv = document.createElement("div");
//       imageDiv.classList.add("imageDiv");
//       imageDiv.innerHTML = `<img src="${photo.urls.regular}" alt="${
//         photo.alt_description || "Image"
//       }" />`;

//       const overlayDiv = document.createElement("div");
//       overlayDiv.classList.add("overlay");

//       const overlayText = document.createElement("h3");
//       overlayText.innerText = photo.alt_description || "Image Description";

//       overlayDiv.appendChild(overlayText);
//       imageDiv.appendChild(overlayDiv);
//       imagesContainer.appendChild(imageDiv);
//     });

//     if(data.total_pages===pageNo){
//         loadMoreBut.style.display="none";
//     }
//     else{
//         loadMoreBut.style.display="block";

//     }

//     loadMoreBut.style.display = "block";


//   } catch (error) {
//     console.error("Error fetching images:", error);
//     imagesContainer.innerHTML = `<h2>Error loading images.</h2>`;
//   }
// };

// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const inputText = searchInput.value.trim();
//   if (inputText !== "") {
//     page = 1;
//     currentQuery = inputText;
//     fetchImages(currentQuery, page);
//   } else {
//     imagesContainer.innerHTML = "<h2>Please enter a search query.</h2>";
//   }
// });


// loadMoreBut.addEventListener("click", () => {
//   page++;
//   fetchImages(currentQuery, page);
// });



//------------------------------------------------------

const accessKey = "LOSgYgue6_9pp5EfnO8XseQNj-O0sSaQCpaqzQ9uXNY";

const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBut = document.querySelector(".loadMoreBut");

let page = 1;
let currentQuery = "";

// 🔄 Loader element
const loader = document.createElement("div");
loader.innerText = "Loading...";
loader.style.fontSize = "22px";
loader.style.color = "gray";
loader.style.marginTop = "20px";

// 📸 Fetch images function
const fetchImages = async (query, pageNo) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

  try {
    imagesContainer.appendChild(loader); // Show loader

    const response = await fetch(url);
    const data = await response.json();
    loader.remove(); // Hide loader

    if (pageNo === 1) {
      imagesContainer.innerHTML = ""; // Reset on new search
    }

    if (data.results.length === 0) {
      imagesContainer.innerHTML = `<h2>No images found for "${query}" 😢</h2>`;
      loadMoreBut.style.display = "none";
      return;
    }

    data.results.forEach((photo) => {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("imageDiv");

      imageDiv.innerHTML = `
        <img src="${photo.urls.regular}" alt="${photo.alt_description || "Image"}" />
      `;

      const overlayDiv = document.createElement("div");
      overlayDiv.classList.add("overlay");

      const overlayText = document.createElement("h3");
      overlayText.innerText = photo.alt_description || "No description";

      overlayDiv.appendChild(overlayText);
      imageDiv.appendChild(overlayDiv);
      imagesContainer.appendChild(imageDiv);
    });

    // 🔽 Hide "Load More" if no more pages
    if (data.total_pages === pageNo) {
      loadMoreBut.style.display = "none";
      const endMsg = document.createElement("h3");
      endMsg.innerText = "🎉 You've reached the end of results.";
      endMsg.style.color = "green";
      endMsg.style.marginTop = "20px";
      imagesContainer.appendChild(endMsg);
    } else {
      loadMoreBut.style.display = "block";
    }

  } catch (error) {
    loader.remove();
    console.error("Error fetching images:", error);
    imagesContainer.innerHTML = `<h2>⚠️ Network Error! Please try again.</h2>`;
    loadMoreBut.style.display = "none";
  }
};

// 🔍 Search handler
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    currentQuery = inputText;
    fetchImages(currentQuery, page);
  } else {
    imagesContainer.innerHTML = "<h2>Please enter a search query.</h2>";
    loadMoreBut.style.display = "none";
  }
});

// ➕ Load More button handler
loadMoreBut.addEventListener("click", () => {
  page++;
  fetchImages(currentQuery, page);
});












