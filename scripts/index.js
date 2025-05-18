const seats = document.querySelectorAll(".grid button");
const seatCount = document.querySelector("#selected-seat-count");
const seatContainer = document.querySelector("#selected-seat-list-");
const totalPrice = document.querySelector("#total-price");
const grandTotal = document.querySelector("#grand-total");
const applyBtn = document.querySelector("#apply-coupon");
const couponInput = document.querySelector("#coupon-code");

let selectedSeats = [];
let seatPrice = 550;

seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    const seatNum = seat.textContent;

    if (selectedSeats.includes(seatNum)) {
      // Deselect seat
      selectedSeats = selectedSeats.filter((s) => s !== seatNum);

      seat.classList.remove("bg-[#1DD100]", "text-white");
      seat.classList.add("bg-gray-200", "text-gray-500");
    } else {
      // Select seat
      selectedSeats.push(seatNum);

      seat.classList.remove("bg-gray-200", "text-gray-500");
      seat.classList.add("bg-[#1DD100]", "text-white");
    }

    updateSummary();
  });
});

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

applyBtn.addEventListener("click", () => {
  updateSummary();
});
