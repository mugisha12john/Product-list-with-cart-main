const data = await fetch("../data.json").then((res) => res.json());

const productList = document.getElementById("product-list");
console.log(productList);
function cardListItem(category, name, price, image) {
  return `<div " class="relative mt-2">
             <div>
              <img
                src="${image}"
                alt="${name}"
                class="w-65 h-65 rounded-lg"
              />

              <button
                class="w-40 absolute left-10 top-[240px] flex justify-center items-center gap-2 p-2 text-[#260f08] border-2 border-[#87635a] bg-white font-bold rounded-full hover:cursor-pointer"
              >
                <img src="/assets/images/icon-add-to-cart.svg" alt="" /> Add to
                Cart
              </button>
            </div>
            <h2 class="mt-10 text-sm font-normal text-[#87635a]">${category}</h2>
            <h2 class="text-lg font-bold text-[#260f08]">
              ${name}
            </h2>
            <p class="font-bold text-[#9b4f38]">$${price}</p>
          </div>
          </div>`;
}
// productList.innerHTML = cardListItem();
const array = JSON.parse(JSON.stringify(data));
array.forEach((item) => {
  productList.innerHTML += cardListItem(
    item.category,
    item.name,
    item.price,
    item.image.desktop
  );
});
