const categories = [
    { id: 1, name: "Мод", icon: "🌲" },
    { id: 2, name: "Цэцэг", icon: "🌷" },
    { id: 3, name: "Бут сөөг", icon: "🌿" },
    { id: 4, name: "Бордоо", icon: "🪴" }
];

const products = [
    {
        categoryId: 1,
        name: "Гацуур",
        description: "1.5 метр өндөртэй, хашаа болон зуслангийн тохижилтод тохиромжтой.",
        price: 55000,
        stock: 20,
        icon: "🌲"
    },
    {
        categoryId: 1,
        name: "Шинэс",
        description: "Монгол орны уур амьсгалд сайн зохицдог, гоёлын болон ойжуулалтын зориулалттай.",
        price: 38000,
        stock: 15,
        icon: "🌲"
    },
    {
        categoryId: 1,
        name: "Монос",
        description: "Хавар цагаан цэцэглэдэг, гоёлын болон сүүдрэвчний зориулалттай мод.",
        price: 25000,
        stock: 30,
        icon: "🌳"
    },
    {
        categoryId: 1,
        name: "Нарс",
        description: "Хашаа, зуслангийн тохижилтод тохиромжтой мөнх ногоон мод.",
        price: 42000,
        stock: 18,
        icon: "🌲"
    },
    {
        categoryId: 1,
        name: "Улиас",
        description: "Хурдан ургадаг, салхи хаах болон ногоон байгууламжид тохиромжтой мод.",
        price: 30000,
        stock: 25,
        icon: "🌳"
    },
    {
        categoryId: 1,
        name: "Хайлаас",
        description: "Хотын нөхцөлд сайн ургадаг, сүүдэр үүсгэхэд тохиромжтой мод.",
        price: 28000,
        stock: 22,
        icon: "🌳"
    },
    {
        categoryId: 1,
        name: "Чацаргана",
        description: "Жимстэй, хүйтэнд тэсвэртэй, хашаанд тарихад тохиромжтой модлог ургамал.",
        price: 35000,
        stock: 16,
        icon: "🍊"
    },
    {
        categoryId: 2,
        name: "Сарнай",
        description: "Гоёлын цэцэрлэгт тарихад тохиромжтой олон наст цэцэг.",
        price: 18000,
        stock: 40,
        icon: "🌹"
    },
    {
        categoryId: 2,
        name: "Алтанзул",
        description: "Өнгөлөг цэцэгтэй, гоёлын цэцэрлэгт тохиромжтой олон наст цэцэг.",
        price: 15000,
        stock: 35,
        icon: "🌷"
    },
    {
        categoryId: 2,
        name: "Лаванда",
        description: "Сайхан үнэртэй, гоёлын болон тайвшруулах орчны тохижилтод тохиромжтой.",
        price: 18000,
        stock: 28,
        icon: "💜"
    },
    {
        categoryId: 2,
        name: "Петуния",
        description: "Урт хугацаанд цэцэглэдэг, сав болон мандалд тарихад тохиромжтой.",
        price: 12000,
        stock: 45,
        icon: "🌸"
    },
    {
        categoryId: 3,
        name: "Голт бор",
        description: "Анхилуун үнэртэй цэцэглэдэг, хашаа болон зусланд тохиромжтой бут сөөг.",
        price: 22000,
        stock: 25,
        icon: "🌿"
    },
    {
        categoryId: 3,
        name: "Спирея",
        description: "Цагаан жижиг цэцэгтэй, хашаа болон ногоон зурваст тохиромжтой бут сөөг.",
        price: 24000,
        stock: 20,
        icon: "🌿"
    },
    {
        categoryId: 3,
        name: "Барбарис",
        description: "Навчны өнгө гоёмсог, хашааны гоёлын бутанд тохиромжтой.",
        price: 26000,
        stock: 18,
        icon: "🍃"
    },
    {
        categoryId: 4,
        name: "Шимт хөрс",
        description: "Мод, цэцэг тарихад зориулсан шим тэжээлтэй хөрс.",
        price: 10000,
        stock: 60,
        icon: "🪴"
    },
    {
        categoryId: 4,
        name: "Органик бордоо",
        description: "Ургамлын үндэсжилт, ургалтыг дэмжих зориулалттай бордоо.",
        price: 12000,
        stock: 50,
        icon: "🪴"
    }
];

const categoryGrid = document.getElementById("categoryGrid");
const productGrid = document.getElementById("productGrid");
const categoryPage = document.getElementById("categoryPage");
const productPage = document.getElementById("productPage");
const categoryTitle = document.getElementById("categoryTitle");
const searchInput = document.getElementById("searchInput");

function formatPrice(price) {
    return price.toLocaleString("en-US") + "₮";
}

function loadCategories() {
    categoryGrid.innerHTML = "";

    categories.forEach(category => {
        const count = products.filter(product => product.categoryId === category.id).length;

        const card = document.createElement("button");
        card.className = "category-card";
        card.onclick = () => showProducts(category.id);

        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${count} бүтээгдэхүүн</p>
        `;

        categoryGrid.appendChild(card);
    });
}

function showProducts(categoryId) {
    const category = categories.find(item => item.id === categoryId);
    const filteredProducts = products.filter(product => product.categoryId === categoryId);

    categoryTitle.textContent = category.name;
    categoryPage.classList.add("hidden");
    productPage.classList.remove("hidden");

    renderProducts(filteredProducts);

    searchInput.value = "";
    searchInput.oninput = () => {
        const keyword = searchInput.value.toLowerCase();
        const searchedProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword)
        );

        renderProducts(searchedProducts);
    };
}

function renderProducts(list) {
    productGrid.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="image-box">${product.icon}</div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="bottom-row">
                    <strong>${formatPrice(product.price)}</strong>
                    <span>Үлдэгдэл: ${product.stock}</span>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function showCategories() {
    productPage.classList.add("hidden");
    categoryPage.classList.remove("hidden");
}

loadCategories();