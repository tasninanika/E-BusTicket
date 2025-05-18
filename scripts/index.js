const seats = document.querySelectorAll(".grid button");
const seatCount = document.querySelector("#selected-seat-count");
const seatContainer = document.querySelector("#selected-seat-list-");
const totalPrice = document.querySelector("#total-price");
const grandTotal = document.querySelector("#grand-total");
const applyBtn = document.querySelector("#apply-coupon");
const couponInput = document.querySelector("#coupon-code");

const nameInput = document.querySelector("#user-name");
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");
const nextBtn = document.querySelector("#next-button");
const modal = document.querySelector("#success-modal");

let selectedSeats = [];
let seatPrice = 550;

// ✅ Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000); // hide after 3 seconds
}

// Seat select/deselect
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    const seatNum = seat.textContent;

    if (selectedSeats.includes(seatNum)) {
      selectedSeats = selectedSeats.filter((s) => s !== seatNum);
      seat.classList.remove("bg-[#1DD100]", "text-white");
      seat.classList.add("bg-gray-200", "text-gray-500");
    } else {
      selectedSeats.push(seatNum);
      seat.classList.remove("bg-gray-200", "text-gray-500");
      seat.classList.add("bg-[#1DD100]", "text-white");
    }

    updateSummary();
  });
});

// Update Summary
function updateSummary() {
  seatCount.textContent = selectedSeats.length;
  seatContainer.innerHTML = "";

  selectedSeats.forEach((seatNum) => {
    seatContainer.innerHTML += `
      <div class="flex justify-between mb-1 w-full">
        <span>${seatNum}</span>
        <span>Economy</span>
        <span>${seatPrice}</span>
      </div>
    `;
  });

  const total = selectedSeats.length * seatPrice;
  totalPrice.textContent = total;

  const coupon = couponInput.value.trim();
  const discount = getDiscount(coupon, total);

  grandTotal.textContent = (total - discount).toFixed(2);
}

// Coupon Discount
function getDiscount(code, total) {
  const c = code.replace(/\s+/g, "").toLowerCase();
  if (c === "new15") {
    return total * 0.15;
  } else if (c === "couple20") {
    return total * 0.2;
  } else {
    return 0;
  }
}

// Apply Coupon
applyBtn.addEventListener("click", () => {
  updateSummary();
});

// NEXT button check and show modal
nextBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  if (!name || !email || !phone) {
    alert("Please fill out name, email and phone number.");
    return;
  }

  modal.classList.remove("hidden");
});

// Continue button to close modal and clear everything
document.querySelector("#close-modal").addEventListener("click", () => {
  modal.classList.add("hidden");

  // Clear input fields
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  // Reset seat
  selectedSeats.forEach((seatNum) => {
    const seat = Array.from(seats).find((s) => s.textContent === seatNum);
    if (seat) {
      seat.classList.remove("bg-[#1DD100]", "text-white");
      seat.classList.add("bg-gray-200", "text-gray-500");
    }
  });
  selectedSeats = [];

  // Reset summary
  seatCount.textContent = "0";
  seatContainer.innerHTML = "";
  totalPrice.textContent = "0";
  grandTotal.textContent = "0";

  couponInput.value = "";
});
