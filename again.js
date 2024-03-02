
const newsNavigator =async() => {
      const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
      const jsonFormat = await response.json();
      const data = jsonFormat.data.news_category
      displayAllCategoryBtn(data)
};

const displayAllCategoryBtn =(news) => {
    const displayAllBtnContainer = document.getElementById('navbar-btn-container');
    news.forEach(singleBtn => {
        const div = document.createElement('div')
    div.innerHTML = `
    <button onclick="displayAllNews('${singleBtn.category_id}')" class="btn border-t-neutral-50">${singleBtn.category_name} </button>
    `
displayAllBtnContainer.appendChild(div)
    });
}

const displayAllNews = async(id) => {
    document.getElementById('loader').classList.remove('hidden')
    const displayAllNewsContainer =document.getElementById("show-all-news");
displayAllNewsContainer.textContent ='';
const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id} `);
const jsonFormat = await response.json();
const data = jsonFormat.data

data.forEach((singleNews) => {
    document.getElementById('loader').classList.add('hidden')
const div =document.createElement('div');
div.innerHTML = `
<div class="card lg:card-side bg-base-100 shadow-xl">
  <figure width="300" height="200"><img  src="${singleNews.
    image_url}" alt="Album"/></figure>
  <div class="card-body">
    <h2 class="card-title">${singleNews.title} </h2>
    <p>${singleNews.details.slice(0,100)
    } </p>
    <section class="flex justify-between items-center">
    <div class="flex gap-3">
    <div><img width="50" border-radius="100%" height="50" src="${singleNews.thumbnail_url} "></div>
     <div>
     <h2>${singleNews.author.name} </h2>
     <h2>${singleNews.author.published_date
     } </h2>
    </div>
    </div>

    <div class="font-bold text-xl flex gap-1">
<img width="30" height="30" src="./eye.png"> <span>${singleNews.total_view
} </span>
    </div>
    <div class="card-actions justify-end">
      <button onclick="showModal('${singleNews._id}')" class="btn btn-primary">
      Details</button>
    </div>
    </section>
  </div>
</div>
`

displayAllNewsContainer.appendChild(div)
// console.log(singleNews)
})
}
// show modal
const showModal =async(id) => {
    // console.log(id)
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${id} `);
const jsonFormat = await response.json();
const data = jsonFormat.data;

data.forEach(item => {
    const modalContainer = document.getElementById('my_modal_4');
    modalContainer.innerHTML =`
    <div class="modal-box w-11/12 max-w-5xl">
    <h2 class="font-bold text-4xl">${item.title} </h2>
    <h3 class="font-bold text-lg">  Published: ${item.details}</h3>
    <p class="py-4">${item.author.
        published_date
        }</p>
    <div class="modal-action">
      <form method="dialog" class="text-center">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
    
    `;
    console.log(item)
    my_modal_4.showModal()
})
}

// handle search bar
const searchBtn = () => {
    const inputValue = document.getElementById('input-text').value ;
    const inputText = document.getElementById('input-text')
    inputText.value = '';
    if(inputValue == '01' ||inputValue == '02' ||inputValue == '03' ||inputValue == '04' ||inputValue == '05' ||inputValue == '06' ){
        displayAllNews(inputValue)
    }
    else{
        alert('u can use 01 to 06 in search bar')
    }
    
}

const shortByBtn = () => {
    
}

displayAllNews('01')
newsNavigator()