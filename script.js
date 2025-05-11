document.addEventListener('DOMContentLoaded', () => {
    // Load data dari data.json
    fetch('data.json')
      .then(response => response.json())
      .then(ebooks => {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const filterCategory = document.getElementById('filterCategory');
        const filterYear = document.getElementById('filterYear');
        const ebookList = document.getElementById('ebookList');
        const noResults = document.getElementById('noResults');
  
        // Fungsi tampilkan ebook
        // function displayEbooks(ebooksToDisplay) {
        //   if (ebooksToDisplay.length === 0) {
        //     noResults.classList.remove('hidden');
        //     ebookList.innerHTML = '';
        //   } else {
        //     noResults.classList.add('hidden');
        //     ebookList.innerHTML = ebooksToDisplay.map(ebook => `
        //       <div class="ebook-card ${ebook.color} p-5 rounded-xl shadow-md border-2 border-white">
        //         <div class="flex justify-between items-start mb-3">
        //           <span class="px-3 py-1 rounded-full text-sm ${ebook.category === 'Cerita' ? 'bg-purple-200' : 'bg-blue-200'}">
        //             ${ebook.category}
        //           </span>
        //           <span class="text-gray-500">${ebook.year}</span>
        //         </div>
        //         <h3 class="text-xl font-bold mb-2 text-gray-800">${ebook.title}</h3>
        //         <p class="text-gray-600 mb-4">${ebook.description}</p>
        //         <a 
        //           href="${ebook.drive_link}" 
        //           class="inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
        //           download
        //         >
        //           <i class="fas fa-download mr-2"></i>Download
        //         </a>
        //       </div>
        //     `).join('');
        //   }
        // }
function displayEbooks(ebooksToDisplay) {
  if (ebooksToDisplay.length === 0) {
    noResults.classList.remove('hidden');
    ebookList.innerHTML = '';
  } else {
    noResults.classList.add('hidden');
    ebookList.innerHTML = ebooksToDisplay.map(ebook => `
      <div class="ebook-card ${ebook.color} p-5 rounded-xl shadow-md border-2 border-white">
        <div class="flex justify-between items-start mb-3">
          <span class="px-3 py-1 rounded-full text-sm ${ebook.category === 'Cerita' ? 'bg-purple-200' : 'bg-blue-200'}">
            ${ebook.category}
          </span>
          <span class="text-gray-500">${ebook.year}</span>
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-800">${ebook.title}</h3>
        <p class="text-gray-600 mb-4">${ebook.description}</p>
        <div class="flex gap-2">
          <a 
            href="https://drive.google.com/file/d/${ebook.drive_link.split('id=')[1]}/preview" 
            target="_blank"
            class="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            <i class="fas fa-book-reader mr-2"></i>Lihat Buku
          </a>
          <a 
            href="${ebook.drive_link}" 
            class="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            download
          >
            <i class="fas fa-download mr-2"></i>Download
          </a>
        </div>
      </div>
    `).join('');
  }
}
  
        // Fungsi filter ebook
        function filterEbooks() {
          const searchTerm = searchInput.value.toLowerCase();
          const selectedCategory = filterCategory.value;
          const selectedYear = filterYear.value;
  
          const filteredEbooks = ebooks.filter(ebook => {
            const matchesSearch = ebook.title.toLowerCase().includes(searchTerm) || 
                                ebook.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory ? ebook.category === selectedCategory : true;
            const matchesYear = selectedYear ? ebook.year === selectedYear : true;
            
            return matchesSearch && matchesCategory && matchesYear;
          });
  
          displayEbooks(filteredEbooks);
        }
  
        // Event Listeners
        searchInput.addEventListener('input', filterEbooks);
        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') filterEbooks();
        });
        searchButton.addEventListener('click', filterEbooks);
        filterCategory.addEventListener('change', filterEbooks);
        filterYear.addEventListener('change', filterEbooks);
  
        // Tampilkan semua ebook awal
        displayEbooks(ebooks);
      });
  });
