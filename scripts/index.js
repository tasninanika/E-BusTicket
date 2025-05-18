const seats = document.querySelectorAll(".grid button");
const seatCount = document.querySelector("span.bg-[#1DD100]");
const seatContainer = document.querySelector(".bg-[#F7F8F8] .text-sm");
const totalPrice = document.querySelectorAll("span")[totalPriceIndex()];
const grandTotal = document.querySelectorAll("span")[grandTotalIndex()];
const applyBtn = document.querySelector("button.bg-[#1DD100]");
const couponInput = document.querySelector(
  'input[placeholder="Have any cuppon?"]'
);

let selectedSeats = [];
let seatPrice = 550;

seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    const seatNum = seat.textContent;

    if (selectedSeats.includes(seatNum)) return;

    selectedSeats.push(seatNum);
    seat.classList.remove("bg-gray-200");
    seat.classList.add("bg-[#1DD100]", "text-white");

    updateSummary();
  });
});

function updateSummary() {
  seatCount.textContent = selectedSeats.length;

  // Clear existing entries
  seatContainer.innerHTML = "";

  selectedSeats.forEach((seat) => {
    seatContainer.innerHTML += `
      <div class="flex justify-between text-sm mb-1">
        <span>${seat}</span>
        <span>Economy</span>
        <span>${seatPrice}</span>
      </div>`;
  });

  const total = selectedSeats.length * seatPrice;
  totalPrice.textContent = `BDT ${total}`;

  const coupon = couponInput.value.trim();
  const discount = getDiscount(coupon, total);

  grandTotal.textContent = `BDT ${total - discount}`;
}

applyBtn.addEventListener("click", () => {
  updateSummary();
});

function getDiscount(code, total) {
  if (code === "NEW15") {
    return total * 0.15;
  } else if (code === "EID20") {
    return total * 0.2;
  } else {
    return 0;
  }
}

function totalPriceIndex() {
  const spans = document.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].textContent.includes("Total Price")) {
      return i + 1;
    }
  }
  return -1;
}

function grandTotalIndex() {
  const spans = document.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].textContent.includes("Grand Total")) {
      return i + 1;
    }
  }
  return -1;
}
