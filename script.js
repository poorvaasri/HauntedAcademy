// function showdetails(eve) {
//     if (eve) eve.preventDefault();

//     var firstname = document.getElementById('firstname').value;
//     var lastname = document.getElementById('lastname').value;
//     var age = document.getElementById('age').value;
//     var gender = document.getElementById('gender').value;
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phone').value;

//     var details =
//         "NAME: " + firstname + " " + lastname + "<br>" +
//         "AGE: " + age + "<br>" +
//         "GENDER: " + gender + "<br>" +
//         "EMAIL: " + email + "<br>" +
//         "PHONE NUMBER: " + phone;

//     document.getElementById("details").innerHTML = details;
// }

//innertext or innerHTML = transfer the data from backend to HTML
// creating an empty array to store the contact data
var contactData = []; // Store all entries

function submitForm(event) {
  event.preventDefault();

  // Get values
  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const age = document.getElementById('age').value.trim();
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message')?.value.trim() || "";

  // Validation
  if (!firstname || !age || !genderInput || !email || !phone) {
    alert("👻 Please fill all required fields: First Name, Age, Gender, Email, and Phone!");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("☠️ Enter a valid 10-digit phone number!");
    return;
  }

  // Save data
  contactData.push({
    firstname,
    lastname,
    age,
    gender: genderInput.value,
    email,
    phone,
    message
  });

  // Reset form
  document.querySelector("form").reset();

  // Show success feedback
  const success = document.getElementById("success-message");
  success.style.display = "block";
  success.innerHTML = "🎃 Boo! Your spooky data is saved...";

  setTimeout(() => {
    success.style.display = "none";
  }, 3000);

  // Show output after delay
  setTimeout(display, 500);
}

function display() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  contactData.forEach((user, index) => {
    const entry = document.createElement("div");
    entry.classList.add("customer-card");

    entry.innerHTML = `
      <h4>👤 Victim ${index + 1}</h4>
      <p><strong>Name:</strong> ${user.firstname} ${user.lastname}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      ${user.message ? `<p><strong>Message:</strong> ${user.message}</p>` : ""}
    `;
    output.appendChild(entry);
  });
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}
