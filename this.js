const data = await fetch("../data.json").then((res) => res.json());
const productList = document.getElementById("product-list");
const cartItem = document.getElementById("cart-item");
let cart = [];

// ✅ Create each product card
function cardListItem(category, name, price, image, index) {
  return `
    <div class="product-details relative mt-2"
         data-id="${index}" 
         data-category="${category}" 
         data-name="${name}" 
         data-price="${price}">
      
      <div>
        <img
          id="product-image"
          src="${image}"
          alt="${name}"
          class="w-65 h-60 rounded-lg object-cover"
        />
        <button data-id="${index}" 
          class="cart-btn w-40 absolute left-10 top-[220px] flex justify-center items-center gap-2 p-2 text-[#260f08] border-2 border-[#87635a] bg-white font-bold rounded-full hover:cursor-pointer">
          <img src="/assets/images/icon-add-to-cart.svg" alt="" /> Add to Cart
        </button>
      </div>

      <h2 class="mt-10 text-sm font-normal text-[#87635a]">${category}</h2>
      <h2 class="text-lg font-bold text-[#260f08]">${name}</h2>
      <p class="font-bold text-[#9b4f38]">$${price}</p>
    </div>
  `;
}

// ✅ Render all products
data.forEach((item, index) => {
  productList.innerHTML += cardListItem(
    item.category,
    item.name,
    item.price,
    item.image.desktop,
    index
  );
});

// ✅ Add to Cart function
function AddtoCart(id, category, name, price, quantity = 1) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cart.push({ id, category, name, price, quantity });
  }


}

// ✅ Update cart UI in sidebar
function updateCartUI() {
  cartItem.innerHTML = "welcome"; // Clear existing content

  if (cart.length === 0) {
    cartItem.innerHTML = `<p class="text-sm text-gray-500 mt-6">Your cart is empty</p>`;
    return;
  }

  cart.forEach(({ category, name, price, quantity, id }) => {
    cartItem.innerHTML += `
      <div class="mt-4 space-y-2">
        <h2 class="text-lg font-semibold text-[#260f08]">${name}</h2>
        <div class="flex justify-between items-center">
          <div class="flex gap-3">
            <h2 class="text-lg text-[#c03916] font-bold">${quantity}x</h2>
            <h2 class="text-[#87635a] text-sm">@ $${price}</h2>
            <h4 class="text-[#87635a] font-extrabold text-sm">$${(
              price * quantity
            ).toFixed(2)}</h4>
          </div>
          <button data-id="${id}"
            class="remove-btn w-7 h-7 rounded-full p-2 border-2 hover:border-black cursor-pointer border-[#87635a]">
            <img src="/assets/images/icon-remove-item.svg" alt="remove icon"/>
          </button>
        </div>
        <hr class="border border-red-50" />
      </div>
    `;
  });
}

// ✅ Toggle cart when clicking "Add to Cart"
function toggleCart(e) {
  const btn = e.currentTarget;
  const details = btn.closest(".product-details");
  const { id, category, name, price } = details.dataset;

  // Replace button with quantity controls
  btn.outerHTML = `
    <div class="cart-controls absolute left-10 top-[220px] w-36 flex justify-around gap-2 p-2 text-white bg-[#c83910] font-bold rounded-full">
      <button class="decrement-btn">
        <img src="/assets/images/icon-decrement-quantity.svg"
             alt="decrement quantity"
             class="w-5 h-5 border-white border-2 rounded-full p-[2px] cursor-pointer"/>
      </button>
      <p class="item-quantity">1</p>
      <button class="increment-btn">
        <img src="/assets/images/icon-increment-quantity.svg"
             alt="increment quantity"
             class="w-5 h-5 border-white border-2 rounded-full p-[2px] cursor-pointer"/>
      </button>
    </div>
  `;

  // ✅ Add first item with quantity 1
  AddtoCart(id, category, name, parseFloat(price), 1);
  cartItem.innerHTML = "hello";
}

// ✅ Attach click listener to all Add-to-Cart buttons
document.querySelectorAll(".cart-btn").forEach((btn) => {
  btn.addEventListener("click", toggleCart);
});

// ✅ Event delegation for increment/decrement & remove
document.addEventListener("click", (e) => {
  const incrementBtn = e.target.closest(".increment-btn");
  const decrementBtn = e.target.closest(".decrement-btn");
  const removeBtn = e.target.closest(".remove-btn");

  // Increment
  if (incrementBtn) {
    const controls = incrementBtn.closest(".cart-controls");
    const details = controls.closest(".product-details");
    const { id, category, name, price } = details.dataset;

    const itemQuantity = controls.querySelector(".item-quantity");
    let newQty = parseInt(itemQuantity.textContent) + 1;
    itemQuantity.textContent = newQty;

    AddtoCart(id, category, name, parseFloat(price), newQty);
  }

  // Decrement
  if (decrementBtn) {
    const controls = decrementBtn.closest(".cart-controls");
    const details = controls.closest(".product-details");
    const { id, category, name, price } = details.dataset;

    const itemQuantity = controls.querySelector(".item-quantity");
    let val = parseInt(itemQuantity.textContent);

    if (val > 1) {
      itemQuantity.textContent = val - 1;
      AddtoCart(id, category, name, parseFloat(price), val - 1);
    } else {
      alert("Quantity cannot be less than 1");
    }
  }

  // Remove from cart
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    cart = cart.filter((item) => item.id !== id);
    // updateCartUI();
  }
});
