import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable para manejar funcionalidades de scroll
 * @returns {Object} Objeto con métodos y estados de scroll
 */
export function useScroll() {
  const scrollY = ref(0)
  const isScrolling = ref(false)
  const scrollDirection = ref('down') // 'up' | 'down'
  const isAtTop = ref(true)
  const isAtBottom = ref(false)

  let lastScrollY = 0
  let scrollTimeout = null

  /**
   * Actualiza el estado del scroll
   */
  const updateScrollState = () => {
    const currentScrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    scrollY.value = currentScrollY
    isAtTop.value = currentScrollY <= 10
    isAtBottom.value = currentScrollY + windowHeight >= documentHeight - 10

    // Determinar dirección del scroll
    if (currentScrollY > lastScrollY) {
      scrollDirection.value = 'down'
    } else if (currentScrollY < lastScrollY) {
      scrollDirection.value = 'up'
    }

    lastScrollY = currentScrollY
    isScrolling.value = true

    // Reset scrolling state after scroll stops
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 150)
  }

  /**
   * Scroll suave hacia un elemento
   * @param {string|HTMLElement} target - Selector CSS o elemento DOM
   * @param {Object} options - Opciones de scroll
   */
  const scrollToElement = (target, options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      offset: 0,
      ...options
    }

    let element

    if (typeof target === 'string') {
      element = document.querySelector(target)
    } else if (target instanceof HTMLElement) {
      element = target
    }

    if (!element) {
      console.warn(`Element not found: ${target}`)
      return
    }

    const elementRect = element.getBoundingClientRect()
    const absoluteElementTop = elementRect.top + window.scrollY
    const targetPosition = absoluteElementTop - defaultOptions.offset

    window.scrollTo({
      top: targetPosition,
      behavior: defaultOptions.behavior
    })
  }

  /**
   * Scroll hacia arriba de la página
   * @param {Object} options - Opciones de scroll
   */
  const scrollToTop = (options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      ...options
    }

    window.scrollTo({
      top: 0,
      behavior: defaultOptions.behavior
    })
  }

  /**
   * Scroll hacia abajo de la página
   * @param {Object} options - Opciones de scroll
   */
  const scrollToBottom = (options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      ...options
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: defaultOptions.behavior
    })
  }

  /**
   * Scroll por una cantidad específica de pixels
   * @param {number} pixels - Cantidad de pixels a scrollear
   * @param {Object} options - Opciones de scroll
   */
  const scrollBy = (pixels, options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      ...options
    }

    window.scrollBy({
      top: pixels,
      behavior: defaultOptions.behavior
    })
  }

  /**
   * Scroll hacia una sección por su ID
   * @param {string} sectionId - ID de la sección
   * @param {Object} options - Opciones de scroll
   */
  const scrollToSection = (sectionId, options = {}) => {
    const section = document.getElementById(sectionId)
    if (section) {
      scrollToElement(section, options)
    }
  }

  /**
   * Obtener la posición de scroll actual en porcentaje
   * @returns {number} Porcentaje de scroll (0-100)
   */
  const getScrollPercentage = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    if (documentHeight <= windowHeight) return 100

    return Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
  }

  /**
   * Verificar si un elemento está visible en el viewport
   * @param {string|HTMLElement} target - Selector CSS o elemento DOM
   * @param {Object} options - Opciones de intersección
   * @returns {boolean} True si el elemento está visible
   */
  const isElementInViewport = (target, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    }

    let element

    if (typeof target === 'string') {
      element = document.querySelector(target)
    } else if (target instanceof HTMLElement) {
      element = target
    }

    if (!element) return false

    const rect = element.getBoundingClientRect()
    const elementHeight = rect.height
    const elementTop = rect.top
    const elementBottom = rect.bottom

    const viewportHeight = window.innerHeight
    const threshold = elementHeight * defaultOptions.threshold

    return elementTop <= viewportHeight - threshold && elementBottom >= threshold
  }

  /**
   * Deshabilitar el scroll de la página
   */
  const disableScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  /**
   * Habilitar el scroll de la página
   */
  const enableScroll = () => {
    document.body.style.overflow = ''
  }

  /**
   * Crear un observer para detectar cuando elementos entran al viewport
   * @param {Function} callback - Función a ejecutar cuando el elemento es visible
   * @param {Object} options - Opciones del IntersectionObserver
   * @returns {IntersectionObserver} Observer instance
   */
  const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    }

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry)
        }
      })
    }, defaultOptions)
  }

  /**
   * Scroll suave hacia el siguiente elemento hermano
   * @param {HTMLElement} currentElement - Elemento actual
   * @param {Object} options - Opciones de scroll
   */
  const scrollToNextSibling = (currentElement, options = {}) => {
    const nextSibling = currentElement.nextElementSibling
    if (nextSibling) {
      scrollToElement(nextSibling, options)
    }
  }

  /**
   * Scroll suave hacia el elemento hermano anterior
   * @param {HTMLElement} currentElement - Elemento actual
   * @param {Object} options - Opciones de scroll
   */
  const scrollToPreviousSibling = (currentElement, options = {}) => {
    const previousSibling = currentElement.previousElementSibling
    if (previousSibling) {
      scrollToElement(previousSibling, options)
    }
  }

  // Event listeners
  onMounted(() => {
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState() // Initialize state
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollState)
    clearTimeout(scrollTimeout)
  })

  return {
    // Estado reactivo
    scrollY,
    isScrolling,
    scrollDirection,
    isAtTop,
    isAtBottom,

    // Métodos de scroll
    scrollToElement,
    scrollToTop,
    scrollToBottom,
    scrollBy,
    scrollToSection,
    scrollToNextSibling,
    scrollToPreviousSibling,

    // Utilidades
    getScrollPercentage,
    isElementInViewport,
    disableScroll,
    enableScroll,
    createIntersectionObserver
  }
}

/**
 * Versión simplificada del composable solo para scroll suave
 * @returns {Object} Métodos básicos de scroll
 */
export function useSmoothScroll() {
  const scrollToElement = (target, offset = 0) => {
    let element

    if (typeof target === 'string') {
      element = document.querySelector(target)
    } else if (target instanceof HTMLElement) {
      element = target
    }

    if (!element) return

    const elementRect = element.getBoundingClientRect()
    const absoluteElementTop = elementRect.top + window.scrollY
    const targetPosition = absoluteElementTop - offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToSection = (sectionId, offset = 0) => {
    const section = document.getElementById(sectionId)
    if (section) {
      scrollToElement(section, offset)
    }
  }

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection
  }
}