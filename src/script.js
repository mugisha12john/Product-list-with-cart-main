const data = await fetch("../data.json").then((res) => res.json());

const productList = document.getElementById("product-list");
function toggleCart(e) {
  const btn = e.currentTarget;

  btn.outerHTML = `
    <div class="w-36 absolute left-10 top-[220px] flex justify-around gap-2 p-2 text-white bg-[#c83910] font-bold rounded-full">
      <button id="decrement-btn">
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt="decrement quantity"
          class="w-5 h-5 border-white border-2 rounded-full p-[2px] cursor-pointer"
        />
      </button>
      <p id="item-quantity">1</p>
      <button id="increment-btn">
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt="increment quantity"
          class="w-5 h-5 border-white border-2 rounded-full p-[2px] cursor-pointer"
        />
      </button>
    </div>
  `;
  btn.removeEventListener("click", toggleCart);
  // increment and decrement item quantity
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");
  const itemQuantity = document.getElementById("item-quantity");
  let quantity = 1;
  incrementBtn?.addEventListener("click", () => {
    quantity += 1;
    itemQuantity.textContent = quantity;
  });
  console.log(decrementBtn);
  decrementBtn?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      itemQuantity.textContent = quantity;
    } else {
      alert("Quantity cannot be less than 1");
    }
  });
}

function cardListItem(category, name, price, image, index) {
  return `<div " class="relative mt-2" >
             <div>
              <img
                src="${image}"
                alt="${name}"
                class="w-65 h-60 rounded-lg"
              />

              <button data-id="${index}" 
                class="cart-btn w-40 absolute left-10 top-[220px] flex justify-center items-center gap-2 p-2 text-[#260f08] border-2 border-[#87635a] bg-white font-bold rounded-full hover:cursor-pointer"
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
array.forEach((item, index) => {
  productList.innerHTML += cardListItem(
    item.category,
    item.name,
    item.price,
    item.image.desktop,
    index
  );
});
document.querySelectorAll(".cart-btn").forEach((btn) => {
  btn.addEventListener("click", toggleCart);
});
