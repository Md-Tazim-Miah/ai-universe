const loadAiTools = async (dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const response = await fetch(url);
        const data = await response.json();
        displayAiTools(data.data.tools, dataLimit);
    } catch (error) {
        console.error('Error fetching AI tools:', error);
    }
};

const displayAiTools = (tools, dataLimit) => {
    // Spinner start
    toggleSpinner(true);
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = "";
    // Display no tools if there is no tools to load
    const noToolDiv = document.getElementById('no-tool');
    if(tools === null || tools.length === 0){
        noToolDiv.classList.remove('hidden');
    } else {
        noToolDiv.classList.add('hidden');
    
    // Display 6 tool
    const showAllBtn = document.getElementById('show-all');
    if(dataLimit && tools.length > 6){
        tools = tools.slice(0, 6);
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }
    // loop through the api to get the single tool
    tools.forEach(tool => {
        // Create a new div to make card for each tool
        const toolDiv = document.createElement('div');
        toolDiv.classList.add("w-full", "rounded", "overflow-hidden", "shadow-lg", "mx-auto", "p-5");
        toolDiv.innerHTML = `
            <div class="w-full">
                <img class="w-full h-52 object-cover rounded-xl" src="${tool.image}" alt="Tool Image" onerror="this.onerror=null; this.src='images/fallback.jpg';">
            </div>
            <div class="w-full mt-4">
                <h2 class="font-bold text-2xl">Features</h2>
                <ul class="list-decimal p-4 text-gray-500 font-semibold">
                    <li>${tool.features[0] || 'N/A'}</li>
                    <li>${tool.features[1] || 'N/A'}</li>
                    <li>${tool.features[2] || 'N/A'}</li>
                </ul>
            </div>
            <hr class="mt-5 mb-3">
            <div class="flex justify-between items-center w-full">
                <div>
                    <div class="font-bold text-2xl mb-2">${tool.name}</div>
                    </p>
                    <span class="text-sm text-gray-600 font-semibold"><span class="pe-1"><i class="fa-regular fa-calendar"></i></span> ${tool.published_in || 'Release date not available'}</span>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <a onclick="openModal(); loadToolsDetails('${tool.id}')" href="#" class="text-yellow-600 font-semibold text-2xl bg-red-50 px-3 py-1.5 rounded-full"><i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });

    }
    // Spinner stop
    toggleSpinner(false);
};

// Show all button eventhandler
document.getElementById('btn-show-all').addEventListener("click", function(){
    loadAiTools();
});

// Toggle Spinner
const toggleSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById("spinner-container");
    if (isLoading) {
      spinnerContainer.classList.remove("hidden");
    } else {
      spinnerContainer.classList.add("hidden");
    }
  };

loadAiTools(6);

//Show the tool details
const loadToolsDetails = async id => {
    try{
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        displayToolDetails(data.data);
    } catch (error) {
        console.error('Error fetching AI tools Details:', error);
    }
};

const displayToolDetails = tool => {
    console.log(tool);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <div class="w-1/2 p-5 border border-red-500 rounded-xl bg-red-50">
            <h1 class="text-2xl font-bold mb-6">${tool.description}</h1>
            <div class="flex justify-around gap-2 mb-6">
                <button class="w-1/3 text-md text-green-500 font-medium px-2 py-1 bg-white rounded-xl">${tool.pricing[0].price} <br> ${tool.pricing[0].plan}</button>
                <button class="w-1/3 text-md text-orange-500 font-semibold px-2 py-1 bg-white rounded-xl">${tool.pricing[1].price}<br>${tool.pricing[1].plan}</button>
                <button class="w-1/3 text-md text-red-500 font-semibold px-2 py-1 bg-white rounded-xl">${tool.pricing[2].price}<br>${tool.pricing[0].plan}</button>
            </div>
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold mb-3">Features</h2>
                    <ul class="text-sm ms-7 list-disc text-gray-600">
                        <li>${tool.features[1].feature_name || 'N/A'}</li>
                        <li>${tool.features[2].feature_name || 'N/A'}</li>
                        <li>${tool.features[3].feature_name || 'N/A'}</li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-3">Integrations</h2>
                        <ul class="text-sm ms-7 list-disc text-gray-600">
                            <li>${tool.integrations[0] || 'N/A'}</li>
                            <li>${tool.integrations[1] || 'N/A'}</li>
                            <li>${tool.integrations[2] || 'N/A'}</li>
                        </ul>
                </div>
            </div>
        </div>
        <div class="relative w-1/2 p-6 rounded-xl text-center border">
            <img class="rounded-xl w-full h-64" src="${tool.logo
            }" alt="Tool Image" onerror="this.onerror=null; this.src='images/fallback.jpg';">
            <h2 class="text-2xl font-bold mt-3 px-2">Hi, how are you doing today?</h2>
            <p class="text-sm text-gray-600 mt-3 px-10">I'm doing well, thank you for asking. How can I assist you today?</p>
            <p class="absolute text-sm font-semibold text-white bg-red-500 px-4 py-1 top-3 right-4 rounded-md">${tool.accuracy.score * 100}% accuracy</p>
        </div>    
    `;
  };

  // Modal open function
function openModal() {
    document.getElementById('myModal').classList.remove('hidden');
}

// Modal close function
function closeModal() {
    document.getElementById('myModal').classList.add('hidden');
}

// Add an event listener to the "Sort By Date" button
document.querySelector('#btn-sort-by-date').addEventListener('click', function () {
    sortToolsByDate();
});

// Function to sort tools by date
const sortToolsByDate = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Sort the tools array by date in descending order (newest first)
        const sortedTools = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
        
        // Display the sorted tools
        displayAiTools(sortedTools);
    } catch (error) {
        console.error('Error fetching AI tools:', error);
    }
};
