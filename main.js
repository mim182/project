
let cart = [];

function toggleCart() {
  document.getElementById("side-cart").classList.toggle("open");
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

function changeQty(name, amount) {
  const item = cart.find(i => i.name === name);
  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  updateCart();
}

function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          $${item.price} x ${item.qty}
        </div>

        <div class="qty">
          <button onclick="changeQty('${item.name}', -1)">-</button>
          <button onclick="changeQty('${item.name}', 1)">+</button>
          <button onclick="removeItem('${item.name}')">❌</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("cart-count").innerText = count;
}


function openModalFn(){
  modal.style.display="flex";
  document.body.style.overflow="hidden"
}
function closeModalFn() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const switchForm = document.getElementById("switchForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const forgotBox = document.getElementById("forgotBox");
const successMsg = document.getElementById("successMsg");

let isLogin = true;

// Simulated database
const accounts = {
  "test@example.com": "123456"
};

openModal.onclick = () => {
  modal.style.display = "flex";
};

closeModal.onclick = () => {
  modal.style.display = "none";
};

// Switch login/signup
switchForm.onclick = () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login" : "Sign Up";
  submitBtn.innerText = isLogin ? "Login" : "Create Account";
  switchForm.innerText = isLogin ? "Sign up" : "Login";

  confirmPassword.style.display = isLogin ? "none" : "block";
  forgotBox.style.display = isLogin ? "block" : "none";

  // Clear inputs & success
  successMsg.style.display = "none";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPassword.value = "";
};

// Submit button logic
submitBtn.onclick = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmPassword.value.trim();

  // Fixed syntax
  if (!email  || !password || (!isLogin && !confirm)) {
    alert("Please fill all fields!");
    return;
  }

  if (isLogin) {
    if (accounts[email]) {
      alert("Account exists! Logging a...");
      successMsg.innerText = "Login Successful ✅";
      successMsg.style.display = "block";
      setTimeout(() => {
        closeModalFn();
        successMsg.style.display = "none";
        emailInput.value = "";
        passwordInput.value = "";
      }, 1500);
    } else {
      alert("Account not found! Please sign up.");
    }
  } else {
    if (accounts[email]) {
      alert("Account already exists!");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    // Save new account
    accounts[email] = password;

    successMsg.innerText = "Sign Up Successful ✅";
    successMsg.style.display = "block";

    setTimeout(() => {
      closeModalFn();
      successMsg.style.display = "none";
      emailInput.value = "";
      passwordInput.value = "";
      confirmPassword.value = "";
    }, 1500);
  }
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
openModal.onclick = () => {
  openModalFn();
};

closeModal.onclick = () => {
  closeModalFn();
};

window.onclick = (e) => {
  if (e.target === modal) closeModalFn();
};
document.getElementById("year").textContent = new Date().getFullYear();