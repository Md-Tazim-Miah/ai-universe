const loadAiTools = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayAiTools(data.data.tools, dataLimit);
};

const displayAiTools = (tools, dataLimit) => {
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
                    <a onclick="openModal(); loadMealsDetails(${tool.id})" href="#" class="text-yellow-600 font-semibold text-2xl bg-red-50 px-3 py-1.5 rounded-full"><i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
    }
    
};

// Show all button eventhandler
document.getElementById('btn-show-all').addEventListener("click", function(){
    loadAiTools();
});

loadAiTools(6);