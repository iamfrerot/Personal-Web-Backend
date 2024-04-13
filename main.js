
const form = document.querySelector("#imageForm");
const image1 = document.querySelector('.imageFile1');
const image2 = document.querySelector('.imageFile1');

form.addEventListener("submit", function (e) {
 e.preventDefault();

 image1.addEventListener("change", function (e) {

 });
 const formData = new FormData(form);
 console.log(formData);
 fetch("http://localhost:2000/admin/blog/new", {
  method: "post", headers: {
   "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhYjIxYTZlZDFmNGY5NzUyZmM4NDYiLCJpYXQiOjE3MTMwMjg3NzYsImV4cCI6MTcxMzExNTE3Nn0.dkSIHaEIGZS8gbPvWTCwDHsYigQf6N5gTPuhHFUPiyg"
  },
  body: formData,
 }).then(respons => {
  console.log(respons);
 });
});

