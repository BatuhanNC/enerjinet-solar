const observerOptions = {
  threshold: 0.5, // Elemanın %50'si göründüğünde başlasın
};
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); // Görünür olduğunda 'show' sınıfını ekle
        revealObserver.unobserve(entry.target);
      } else {
        entry.target.classList.remove("show"); // Görünmez olduğunda 'show' sınıfını kaldır
      }
    });
  },
  { threshold: 0.5 },
); // Elemanın %50'si göründüğünde başlasın

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // Eğer eleman ekrana girdiyse (isIntersecting)
    if (entry.isIntersecting) {
      const counter = entry.target;
      startCounter(counter); // Animasyonu başlatan fonksiyonu çağır
      observer.unobserve(counter); // Bir kere çalışması yeterli, izlemeyi bırak
    }
  });
}, observerOptions);
function startCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  // Küçük sayılar (örn: 10) için daha yavaş, büyük sayılar (örn: 100) için daha hızlı tempo
  const duration = target < 20 ? 100 : 30;

  const updateCount = () => {
    // Eğer hedef küçükse her seferinde 1 artır, büyükse hedefe göre oranla
    const inc = target < 20 ? 1 : Math.ceil(target / 100);

    if (count < target) {
      count += inc;
      // Hedefi aşmamak için kontrol
      counter.innerText = count > target ? target : count;
      setTimeout(updateCount, duration);
    } else {
      counter.innerText = target.toLocaleString();
      // Animasyon sınıfını ekle
      counter.classList.add("punch-effect");

      // Animasyon bittikten sonra sınıfı temizle (Tekrar çalışabilmesi için)
      setTimeout(() => {
        counter.classList.remove("punch-effect");
      }, 500);
    }
  };

  updateCount();
}
document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});
document.querySelectorAll(".reveal-box").forEach((box) => {
  revealObserver.observe(box);
});
// Swipe Effect for About Section
function startStackSlider() {
  const container = document.querySelector(".img__container");

  setInterval(() => {
    const cards = container.querySelectorAll("img");
    const firstCard = cards[0];

    // Animasyonu tetiklemek için bir sınıf ekleyebilirsin veya
    // doğrudan CSS'te nth-child(1) üzerinden sürekli dönebilir.

    setTimeout(() => {
      // Resim tam "havadayken" (CSS'teki %50 noktası) başa alıyoruz
      container.appendChild(firstCard); // En öndekini en arkaya atar
    }, 100); // 3 saniyelik animasyonun tam ortası
  }, 5000); // Her 3 saniyede bir yeni döngü başlar
}

window.onload = startStackSlider;
//-------------------------------------------------------
//OPEN OR CLOSED MOBILE MENU
//-------------------------------------------------------
const mobileMenu = document.querySelector("nav");
const mobileMenuToggle = document.querySelectorAll(".toggle__menu");
mobileMenuToggle.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    if (mobileMenu.style.display === "flex") {
      mobileMenu.style.display = "none";
      document.body.style.overflow = "auto"; // Menü kapandığında kaydırmayı tekrar aç
    } else {
      mobileMenu.style.display = "flex";
      document.body.style.overflow = "hidden"; // Menü açıldığında kaydırmayı kapat
    }
  });
});
