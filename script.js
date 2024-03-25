let slideIndex = 0;
showSlide(slideIndex);

function nextSlide() {
    showSlide(slideIndex += 1);
}

function prevSlide() {
    showSlide(slideIndex -= 1);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
}

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return URL.createObjectURL(result);
}

function generate() {
    var text = document.getElementById("input").value;

    query({ "inputs": text }).then((response) => {
        var imageField = document.getElementById("imageField");
        imageField.innerHTML = "<img src='" + response + "' alt='Oluşturulan Resim'>";
    });
}
