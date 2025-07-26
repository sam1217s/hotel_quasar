import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotifications } from './useNotifications'
import { useSmoothScroll } from './useScroll'
import { 
  HOTEL_INFO, 
  CONTACT_INFO, 
  SERVICES_CONFIG, 
  PRICING_CONFIG,
  MESSAGES 
} from '../config/hotelConfig'

/**
 * Composable principal para funcionalidades específicas del hotel
 * Centraliza lógica común usada en múltiples componentes
 * @returns {Object} Funcionalidades y datos del hotel
 */
export function useHotel() {
  const router = useRouter()
  const { notifyHotel, notifySuccess, notifyError } = useNotifications()
  const { scrollToElement } = useSmoothScroll()

  // Estado reactivo
  const isLoading = ref(false)
  const currentSection = ref('home')

  /**
   * Información básica del hotel (reactiva)
   */
  const hotelInfo = computed(() => HOTEL_INFO)
  const contactInfo = computed(() => CONTACT_INFO)
  const servicesConfig = computed(() => SERVICES_CONFIG)

  /**
   * Navegar a una sección específica
   * @param {string} section - Nombre de la sección
   * @param {Object} options - Opciones adicionales
   */
  const navigateToSection = (section, options = {}) => {
    const routes = {
      home: '/',
      rooms: '/Habitaciones',
      restaurants: '/Restaurantes',
      spa: '/Bienestar',
      sports: '/DeportesExtremos',
      contact: '/Contacto'
    }

    const route = routes[section] || section

    if (options.notify) {
      notifyHotel('contact', `Navegando a ${section}...`)
    }

    currentSection.value = section
    router.push(route)
  }

  /**
   * Realizar una reserva (redirige a contacto)
   * @param {Object} reservationData - Datos de la reserva
   */
  const makeReservation = (reservationData = {}) => {
    const { roomType, guests, dates } = reservationData

    let message = 'Iniciando proceso de reserva...'
    
    if (roomType) {
      message = `Reservando ${roomType}...`
    }

    notifyHotel('reservation', message)
    
    // Almacenar datos en sessionStorage para usar en el formulario
    if (Object.keys(reservationData).length > 0) {
      sessionStorage.setItem('reservationData', JSON.stringify(reservationData))
    }

    navigateToSection('contact')
  }

  /**
   * Contactar al hotel por diferentes medios
   * @param {string} method - Método de contacto (phone, email, whatsapp)
   * @param {Object} options - Opciones adicionales
   */
  const contactHotel = (method, options = {}) => {
    const { message = '', notify = true } = options

    switch (method) {
      case 'phone':
        if (notify) notifyHotel('contact', 'Abriendo aplicación de teléfono...')
        window.open(`tel:${CONTACT_INFO.phone.main}`, '_self')
        break

      case 'email':
        if (notify) notifyHotel('contact', 'Abriendo cliente de email...')
        const emailSubject = encodeURIComponent('Consulta desde sitio web')
        const emailBody = encodeURIComponent(message || 'Hola, me gustaría obtener más información...')
        window.open(`mailto:${CONTACT_INFO.email.reservations}?subject=${emailSubject}&body=${emailBody}`, '_blank')
        break

      case 'whatsapp':
        if (notify) notifyHotel('contact', 'Abriendo WhatsApp...')
        const whatsappMessage = encodeURIComponent(
          message || 'Hola, me gustaría información sobre disponibilidad y reservas en Sofitel Legend Santa Clara.'
        )
        window.open(`https://wa.me/${CONTACT_INFO.phone.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`, '_blank')
        break

      case 'location':
        if (notify) notifyHotel('contact', 'Abriendo ubicación en mapa...')
        window.open(CONTACT_INFO.maps.google, '_blank')
        break

      default:
        notifyError('Método de contacto no válido')
    }
  }

  /**
   * Obtener información de precio por tipo de habitación
   * @param {string} roomType - Tipo de habitación
   * @returns {Object} Información de precio
   */
  const getRoomPricing = (roomType) => {
    const typeKey = roomType.toLowerCase().replace(/\s+/g, '_')
    const pricing = PRICING_CONFIG.rooms[typeKey]

    if (!pricing) {
      return {
        min: 300,
        max: 500,
        currency: PRICING_CONFIG.currency,
        formatted: '$300 - $500'
      }
    }

    return {
      ...pricing,
      currency: PRICING_CONFIG.currency,
      formatted: `$${pricing.min} - $${pricing.max}`
    }
  }

  /**
   * Verificar disponibilidad (simulada)
   * @param {Object} searchData - Datos de búsqueda
   * @returns {Promise} Promise con resultados
   */
  const checkAvailability = async (searchData) => {
    isLoading.value = true
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const { checkIn, checkOut, guests, roomType } = searchData
      
      // Simular disponibilidad
      const isAvailable = Math.random() > 0.3 // 70% de probabilidad de disponibilidad
      
      if (isAvailable) {
        notifySuccess('¡Habitaciones disponibles! Proceda con la reserva.')
        return {
          available: true,
          rooms: [
            {
              type: roomType || 'Habitación Superior',
              price: getRoomPricing(roomType || 'superior'),
              available: true
            }
          ]
        }
      } else {
        notifyHotel('reservation', 'No hay disponibilidad para las fechas seleccionadas. Intente con otras fechas.')
        return {
          available: false,
          message: 'No hay disponibilidad para las fechas seleccionadas'
        }
      }
    } catch (error) {
      notifyError('Error al verificar disponibilidad')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Obtener horarios de servicio
   * @param {string} service - Nombre del servicio
   * @returns {string} Horario del servicio
   */
  const getServiceHours = (service) => {
    return SERVICES_CONFIG[service] || 'Consultar horarios'
  }

  /**
   * Scroll suave a una sección específica de la página actual
   * @param {string} sectionId - ID de la sección
   * @param {number} offset - Offset adicional
   */
  const scrollToSection = (sectionId, offset = 80) => {
    const element = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`)
    if (element) {
      scrollToElement(element, offset)
    }
  }

  /**
   * Formatear información para mostrar
   * @param {string} type - Tipo de información
   * @param {*} value - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatInfo = (type, value) => {
    switch (type) {
      case 'phone':
        return value.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
      
      case 'price':
        return `$${value} USD`
      
      case 'guests':
        return `${value} ${value === 1 ? 'huésped' : 'huéspedes'}`
      
      case 'area':
        return `${value} m²`
      
      default:
        return value
    }
  }

  /**
   * Obtener configuración de tema para una sección
   * @param {string} section - Sección de la aplicación
   * @returns {Object} Configuración de tema
   */
  const getSectionTheme = (section) => {
    const themes = {
      home: { primary: 'brown-7', secondary: 'orange-8' },
      rooms: { primary: 'brown-7', secondary: 'amber-8' },
      restaurants: { primary: 'amber-8', secondary: 'orange-6' },
      spa: { primary: 'teal-6', secondary: 'green-6' },
      sports: { primary: 'deep-orange', secondary: 'red-6' },
      contact: { primary: 'blue-6', secondary: 'teal-6' }
    }

    return themes[section] || themes.home
  }

  /**
   * Generar datos para hero section basado en la sección
   * @param {string} section - Sección actual
   * @returns {Object} Datos del hero
   */
  const getHeroData = (section) => {
    const heroData = {
      home: {
        title: HOTEL_INFO.name,
        subtitle: 'Convento del siglo XVII • Lujo Caribeño • Cartagena de Indias',
        badge: { icon: 'eco', color: 'positive', label: HOTEL_INFO.certification }
      },
      rooms: {
        title: 'Suites y Habitaciones',
        subtitle: 'Glamour Colonial • Comodidades Modernas • Experiencia Única',
        badge: { icon: 'bed', color: 'brown-7', label: 'Lujo Colonial Certificado' }
      },
      restaurants: {
        title: 'Restaurantes y Bares',
        subtitle: 'Fusión Caribeña • Técnicas Francesas • Experiencia Culinaria',
        badge: { icon: 'restaurant', color: 'amber-8', label: 'Cuisine Certificada' }
      },
      spa: {
        title: 'Spa y Bienestar',
        subtitle: 'Relajación Colonial • Terapias Ancestrales • Bienestar Integral',
        badge: { icon: 'spa', color: 'teal-6', label: 'Wellness Certificado' }
      },
      sports: {
        title: 'Deportes Extremos',
        subtitle: 'Adrenalina Pura • Aventuras Caribeñas • Experiencias Únicas',
        badge: { icon: 'sports_handball', color: 'deep-orange', label: 'Aventuras Certificadas' }
      },
      contact: {
        title: 'Contacto y Reservas',
        subtitle: 'Experiencia Única • Servicio Exclusivo • Reservas Inmediatas',
        badge: { icon: 'contact_mail', color: 'blue-6', label: 'Atención Personalizada 24/7' }
      }
    }

    return heroData[section] || heroData.home
  }

  /**
   * Validar datos de reserva
   * @param {Object} reservationData - Datos a validar
   * @returns {Object} Resultado de validación
   */
  const validateReservation = (reservationData) => {
    const errors = []
    const { name, email, checkIn, checkOut, guests } = reservationData

    if (!name || name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Nombre es requerido' })
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Email válido es requerido' })
    }

    if (!checkIn) {
      errors.push({ field: 'checkIn', message: 'Fecha de entrada es requerida' })
    }

    if (!checkOut) {
      errors.push({ field: 'checkOut', message: 'Fecha de salida es requerida' })
    }

    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      errors.push({ field: 'dates', message: 'La fecha de salida debe ser posterior a la entrada' })
    }

    if (!guests || guests < 1) {
      errors.push({ field: 'guests', message: 'Número de huéspedes es requerido' })
    }

    return {
      isValid: errors.length === 0,
      errors,
      hasErrors: errors.length > 0
    }
  }

  return {
    // Estado
    isLoading,
    currentSection,

    // Información del hotel
    hotelInfo,
    contactInfo,
    servicesConfig,

    // Métodos de navegación
    navigateToSection,
    scrollToSection,

    // Métodos de reserva y contacto
    makeReservation,
    contactHotel,
    checkAvailability,
    validateReservation,

    // Utilidades
    getRoomPricing,
    getServiceHours,
    formatInfo,
    getSectionTheme,
    getHeroData
  }
}

/**
 * Hook específico para manejo de reservas
 * @returns {Object} Funcionalidades específicas de reservas
 */
export function useReservations() {
  const { makeReservation, checkAvailability, validateReservation } = useHotel()
  const { notifyFormSuccess, notifyFormError } = useNotifications()

  /**
   * Procesar formulario de reserva completo
   * @param {Object} formData - Datos del formulario
   */
  const processReservation = async (formData) => {
    // Validar datos
    const validation = validateReservation(formData)
    
    if (!validation.isValid) {
      notifyFormError('validation', { 
        message: validation.errors[0].message 
      })
      return false
    }

    try {
      // Verificar disponibilidad
      const availability = await checkAvailability(formData)
      
      if (availability.available) {
        // Procesar reserva
        await makeReservation(formData)
        notifyFormSuccess('reserva')
        return true
      } else {
        notifyFormError('reserva', {
          message: 'No hay disponibilidad para las fechas seleccionadas'
        })
        return false
      }
    } catch (error) {
      notifyFormError('reserva')
      return false
    }
  }

  return {
    processReservation,
    checkAvailability,
    validateReservation
  }
}