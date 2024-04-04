const galleryItems = document.querySelector(".gallery-items").children
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const page = document.querySelector(".page-num")
const filters = document.querySelector(".filterContent")
const filteredImages = Array.from(document.querySelectorAll(".item"))
const maxItem = 6
let index = 1

/**  Pagination with maximum of 6 images per page */
const pagination = Math.ceil(galleryItems.length / maxItem)

function prevImage() {
  const currentImageIndex = Array.from(galleryItems).findIndex((item) => item.querySelector("img").src === document.getElementById("fullImage").src)
  const prevImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryItems.length - 1
  document.getElementById("fullImage").src = galleryItems[prevImageIndex].querySelector("img").src
}

function nextImage() {
  const currentImageIndex = Array.from(galleryItems).findIndex((item) => item.querySelector("img").src === document.getElementById("fullImage").src)
  const nextImageIndex = currentImageIndex < galleryItems.length - 1 ? currentImageIndex + 1 : 0
  document.getElementById("fullImage").src = galleryItems[nextImageIndex].querySelector("img").src
}

/**  Navigation while full image view */
prev.addEventListener("click", function () {
  index--
  check()

  showItems()
})
next.addEventListener("click", function () {
  index++
  check()
  showItems()
})

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    prev.click()
  } else if (event.key === "ArrowRight") {
    next.click()
  }
})

function check() {
  if (index == pagination) {
    next.classList.add("disabled")
  } else {
    next.classList.remove("disabled")
  }

  if (index == 1) {
    prev.classList.add("disabled")
  } else {
    prev.classList.remove("disabled")
  }
}

function FullView(ImgLink) {
  document.getElementById("fullImage").src = ImgLink
  document.getElementById("fullImageView").style.display = "block"
}

function CloseFullView() {
  document.getElementById("fullImageView").style.display = "none"
}

function refresh() {
  document.getElementById("fullImageView").style.display = "none"
}

/**  Filter functionality */
function showItems() {
  const filterValue = document.querySelector(".common1.active").getAttribute("data-filter")
  const filteredItems = Array.from(galleryItems).filter((item) => filterValue === "all" || item.classList.contains(filterValue))

  const startIndex = (index - 1) * maxItem
  const endIndex = startIndex + maxItem

  for (let i = 0; i < galleryItems.length; i++) {
    if (i >= startIndex && i < endIndex && filteredItems.includes(galleryItems[i])) {
      galleryItems[i].classList.remove("hide")
      galleryItems[i].classList.add("show")
    } else {
      galleryItems[i].classList.remove("show")
      galleryItems[i].classList.add("hide")
    }
  }

  page.innerHTML = index
}

filters.addEventListener("click", (event) => {
  const target = event.target.closest(".common1")
  if (target) {
    const activeButton = filters.querySelector(".common1.active")
    activeButton.classList.remove("active")
    target.classList.add("active")

    const filterValue = target.getAttribute("data-filter")
    filteredImages.forEach((item) => {
      if (filterValue === "all") {
        item.classList.remove("hide")
        item.classList.add("show")
        location.reload()
      } else if (item.classList.contains(filterValue)) {
        item.classList.remove("hide")
        item.classList.add("show")
      } else {
        item.classList.remove("show")
        item.classList.add("hide")
      }
    })

    // Show/hide pagination based on filterValue
    const pagination = document.querySelector(".pagination")
    if (filterValue === "all") {
      pagination.style.display = "block"
    } else {
      pagination.style.display = "none"
    }
  }
})

window.onload = function () {
  showItems()
  check()
  refresh()
}
