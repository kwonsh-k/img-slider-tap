(function renderSlider() {
  const loader = document.getElementById('loader');
  const slider = document.getElementById('my-slider');
  
  // 전역 변수에서 설정 가져오기
  const beforeUrl = window.imageUrls && window.imageUrls[0] ? window.imageUrls[0] : '';
  const afterUrl = window.imageUrls && window.imageUrls[1] ? window.imageUrls[1] : '';
  const widthVal = window.imageWidth ? window.imageWidth + 'px' : '800px';
  const alignVal = (window.align || 'center').toLowerCase();
  const hoverVal = window.hoverEnabled || false;

  loader.style.maxWidth = widthVal;

  if (hoverVal === true || hoverVal === 'true' || hoverVal === 'yes') {
    slider.setAttribute('hover', 'hover');
  }
  
  document.body.style.justifyContent = 
    alignVal === 'center' ? 'center' : (alignVal === 'right' ? 'flex-end' : 'flex-start');
  document.body.style.alignItems = 
    alignVal === 'center' ? 'center' : (alignVal === 'right' ? 'flex-end' : 'flex-start');

  slider.style.maxWidth = widthVal;

  slider.innerHTML = `
    <figure slot="first" class="image-wrapper">
      <img src="${beforeUrl}" />
      <span class="label label-before">Before</span>
    </figure>
    <figure slot="second" class="image-wrapper">
      <img src="${afterUrl}" />
      <span class="label label-after">After</span>
    </figure>
  `;

  const imageLoadPromise = new Promise((resolve) => {
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;
    let loadedCount = 0;

    if (totalImages === 0) resolve();

    const check = () => {
      loadedCount++;
      if (loadedCount >= totalImages) resolve();
    };

    images.forEach(img => {
      if (img.complete) {
        check();
      } else {
        img.onload = check;
        img.onerror = check;
      }
    });
  });

  const appLoadPromise = customElements.whenDefined('img-comparison-slider');

  Promise.all([imageLoadPromise, appLoadPromise]).then(() => {
    loader.style.display = 'none';
    slider.style.display = 'block';
  });
})();
