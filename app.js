const loadAiTools = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayAiTools(data.data.tools);
};

const displayAiTools = (tools) => {
    console.log(tools);
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = "";
    // loop through the api to get the single tool
    tools.forEach(tool => {
        // Create a new div to make card for each tool
        const toolDiv = document.createElement('div');
        toolDiv.classList.add("w-full", "rounded", "overflow-hidden", "shadow-lg", "mx-auto", "p-5");
        toolDiv.innerHTML = `
            <div class="w-full">
                <img class="w-full h-52 object-cover rounded-xl" src="${tool.image || 'Image not found'}" alt="Tool Image" onerror="this.onerror=null; this.src='fallback.jpg';">
            </div>
            <div class="w-full">
                <div>
                    <div class="text-gray-600 font-bold text-3xl mb-2">${tool.name}</div>
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <a onclick="openModal(); loadMealsDetails(${tool.id})" href="#" class="text-yellow-600 font-semibold text-2xl"><i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
};

loadAiTools();