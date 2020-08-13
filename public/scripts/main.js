window.addEventListener("load", () => {
    let form = document.querySelector("form");
    let errorSec = document.querySelector("#errors");
    const inputs = document.querySelectorAll(".form-control");

    form.addEventListener("submit", (e) => {
        let errors = [];
        let password = document.querySelector("#password");
        let rePassword = document.querySelector("#rePassword");
        let phone = document.querySelector("#phone");

        for (let index = 0; index < inputs.length; index++) {
            const input = form.querySelector("#" + inputs[index].id);

            if (input.value.trim() == "") {
                input.classList.add("is-invalid");
                errors.push(`El ${input.name} es obligatorio`);
            }

            const minL = input.getAttribute("minlength");
            //Como todo GENIO, me olvide comparar con (input.value.length) (facepalm)  -_-
            if (minL && input.value.length < Number(minL)) {
                input.classList.add("is-invalid");
                errors.push(
                    `El ${input.name} debe tener una longitud minima de ${minL}`
                );
            }
            //Listo la forma generica para los tipos numericos XD
            if (input.type == "number" && isNaN(input.value)) {
                input.classList.add("is-invalid");
                errors.push(`El ${input.name} debe ser un numero`);
            }
        }

        if (password.value.trim() != rePassword.value.trim()) {
            password.classList.add("is-invalid");
            errors.push("Las contrase­ñas deben ser iguales");
        }

        if (errors.length != 0) {
            e.preventDefault();

            errors.forEach((error) => {
                errorSec.innerHTML += "<li>" + error + "</li>";
            });
        }
    });
});
