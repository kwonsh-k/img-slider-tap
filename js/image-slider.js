  const wrapper = document.getElementById("wrapper");
  const container = document.getElementById("container");
  const wrapperAlignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end"
  };

  wrapper.style.justifyContent = wrapperAlignMap[align] || "flex-start";
  container.style.width = imageWidth + "px";

  const wrapperDiv = document.getElementById("image-wrapper");
  imageUrls.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    if (index === 0) img.classList.add("active");
    wrapperDiv.appendChild(img);
  });

  const slider = document.getElementById("slider");
  slider.max = imageUrls.length - 1;
  slider.value = 0;
  slider.oninput = () => {
    const imgs = wrapperDiv.querySelectorAll("img");
    imgs.forEach(img => img.classList.remove("active"));
    imgs[slider.value].classList.add("active");
  };

  document.getElementById("slider-label").textContent = sliderLabelText;