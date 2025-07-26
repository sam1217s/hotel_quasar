/**
 * Configuración global de El Refugio Real del Caribe
 * Centraliza toda la información, constantes y configuraciones del proyecto
 */

// Información básica del hotel
export const HOTEL_INFO = {
  name: 'El Refugio Real del Caribe',
  shortName: 'Refugio Real',
  tagline: 'Lujo colonial frente al mar Caribe',
  location: {
    city: 'Cartagena',
    country: 'Colombia',
    region: 'Centro Histórico',
    fullAddress: 'Calle del Sol #42-17, Centro Histórico, Cartagena, Colombia'
  },
  establishment: 'Siglo XVIII',
  category: '5 Estrellas',
  certification: 'Luxury Eco Certified'
}

// Información de contacto
export const CONTACT_INFO = {
  phone: {
    main: '+57 605 123 4567',
    whatsapp: '+57 312 345 6789',
    international: '+57 605 123 4567'
  },
  email: {
    reservations: 'reservas@refugioreal.com',
    info: 'info@refugioreal.com',
    events: 'eventos@refugioreal.com'
  },
  social: {
    facebook: 'https://facebook.com/refugioreal',
    instagram: 'https://instagram.com/refugioreal',
    twitter: 'https://twitter.com/refugioreal'
  },
  maps: {
    google: 'https://maps.google.com/?q=El+Refugio+Real+del+Caribe+Cartagena',
    coordinates: {
      lat: 10.4237,
      lng: -75.5519
    }
  }
}

// Configuraciones de tema y colores
export const THEME_CONFIG = {
  primary: {
    brown: '#8D4513',
    lightBrown: '#A0522D',
    orange: '#FF6B35',
    amber: '#FFC107'
  },
  secondary: {
    teal: '#26A69A',
    blue: '#1976D2',
    green: '#4CAF50',
    purple: '#9C27B0'
  },
  neutral: {
    black: '#000000',
    darkGray: '#424242',
    gray: '#757575',
    lightGray: '#E0E0E0',
    white: '#FFFFFF'
  },
  gradients: {
    brown: 'linear-gradient(135deg, #8D4513, #A0522D)',
    blue: 'linear-gradient(135deg, #1976d2, #0d47a1)',
    teal: 'linear-gradient(135deg, #26a69a, #004d40)',
    amber: 'linear-gradient(135deg, #ffc107, #ffb300)',
    orange: 'linear-gradient(135deg, #ff5722, #f4511e)'
  }
}

// Configuración de navegación
export const NAVIGATION = {
  main: [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/Habitaciones', label: 'Habitaciones', icon: 'bed' },
    { path: '/Restaurantes', label: 'Restaurantes', icon: 'restaurant' },
    { path: '/Bienestar', label: 'Bienestar', icon: 'spa' },
    { path: '/DeportesExtremos', label: 'Deportes Extremos', icon: 'sports_handball' },
    { path: '/Contacto', label: 'Contacto', icon: 'contact_mail' }
  ],
  footer: [
    { path: '/privacidad', label: 'Privacidad' },
    { path: '/terminos', label: 'Términos' },
    { path: '/cookies', label: 'Cookies' }
  ]
}

// Estadísticas del hotel
export const HOTEL_STATS = {
  rooms: {
    total: 122,
    suites: 12,
    types: 6
  },
  facilities: {
    restaurants: 5,
    bars: 3,
    spa: 1,
    pools: 2,
    gyms: 1
  },
  staff: {
    chefs: 4,
    concierge: 6,
    total: 150
  },
  certifications: [
    'Green Key',
    'Leading Hotels of the World',
    '5 Estrellas'
  ]
}

// Configuración de servicios
export const SERVICES_CONFIG = {
  roomService: '24/7',
  concierge: '24/7',
  spa: {
    open: '8:00 AM',
    close: '9:00 PM'
  },
  gym: '24/7',
  restaurants: {
    breakfast: '6:30 AM - 10:30 AM',
    lunch: '12:30 PM - 3:00 PM',
    dinner: '7:00 PM - 11:00 PM'
  },
  pool: '6:00 AM - 10:00 PM'
}

// Configuración de precios (rangos)
export const PRICING_CONFIG = {
  rooms: {
    superior: { min: 360, max: 480 },
    deluxe: { min: 420, max: 580 },
    junior_suite: { min: 650, max: 850 },
    suite: { min: 700, max: 1200 },
    presidential: { min: 950, max: 1500 }
  },
  currency: 'USD',
  includes: ['Desayuno', 'WiFi', 'Gimnasio', 'Piscina']
}

// Configuración de formularios
export const FORM_CONFIG = {
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    required: (val) => !!val || 'Este campo es requerido',
    email_rule: (val) => FORM_CONFIG.validation.email.test(val) || 'Email debe ser válido',
    phone_rule: (val) => !val || FORM_CONFIG.validation.phone.test(val) || 'Teléfono debe ser válido'
  },
  guestOptions: [1, 2, 3, 4, 5, 6, 7, 8],
  roomTypes: [
    'Habitación Superior',
    'Habitación Deluxe',
    'Junior Suite',
    'Suite Colonial Premium',
    'Suite Familiar',
    'Suite Presidencial'
  ]
}

// Configuración de carruseles y animaciones
export const ANIMATION_CONFIG = {
  carousel2d: {
    autoplayDelay: 4000,
    height: '500px',
    transitionDuration: 300
  },
  carousel3d: {
    rotationSpeed: 0.1,
    autoRotate: true,
    radius: 450
  },
  scroll: {
    behavior: 'smooth',
    offset: 80
  },
  transitions: {
    fast: 200,
    normal: 300,
    slow: 500
  }
}

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  position: 'top',
  timeout: {
    success: 4000,
    error: 6000,
    warning: 5000,
    info: 3000
  },
  colors: {
    success: 'positive',
    error: 'negative',
    warning: 'warning',
    info: 'info',
    hotel: 'brown-7'
  }
}

// URLs de imágenes por defecto
export const DEFAULT_IMAGES = {
  hero: {
    home: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
    rooms: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
    restaurants: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
    spa: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    sports: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=600&fit=crop',
    contact: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop'
  },
  placeholder: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
  logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=64&h=64&fit=crop'
}

// Configuración de SEO
export const SEO_CONFIG = {
  title: {
    base: 'Sofitel Legend Santa Clara',
    separator: ' | ',
    templates: {
      home: 'Hotel de Lujo en Cartagena - Convento del Siglo XVII',
      rooms: 'Habitaciones y Suites de Lujo',
      restaurants: 'Restaurantes y Gastronomía',
      spa: 'Spa y Bienestar',
      sports: 'Deportes Extremos y Aventuras',
      contact: 'Contacto y Reservas'
    }
  },
  description: {
    base: 'Hotel de lujo en el Centro Histórico de Cartagena. Convento del siglo XVII convertido en experiencia única de hospitalidad francesa con certificación Green Key.',
    short: 'Hotel de lujo en Cartagena - Convento del siglo XVII'
  },
  keywords: [
    'hotel lujo cartagena',
    'sofitel santa clara',
    'hotel centro historico cartagena',
    'convento siglo xvii',
    'hotel green key',
    'spa cartagena',
    'restaurantes cartagena'
  ]
}

// Configuración de breakpoints responsivos
export const BREAKPOINTS = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440
}

// Mensajes y textos predefinidos
export const MESSAGES = {
  loading: {
    default: 'Cargando...',
    form: 'Enviando formulario...',
    reservation: 'Procesando reserva...',
    search: 'Buscando disponibilidad...'
  },
  success: {
    reservation: 'Solicitud de reserva enviada exitosamente. Nos contactaremos pronto.',
    contact: 'Mensaje enviado exitosamente. Responderemos en las próximas 24 horas.',
    newsletter: 'Suscripción exitosa a nuestro newsletter.',
    form: 'Formulario enviado exitosamente.'
  },
  errors: {
    generic: 'Ha ocurrido un error. Por favor, inténtelo nuevamente.',
    network: 'Error de conexión. Verifique su internet.',
    validation: 'Por favor, complete todos los campos obligatorios.',
    reservation: 'Error al procesar la reserva. Contacte directamente al hotel.',
    form: 'Error al enviar el formulario. Inténtelo nuevamente.'
  },
  confirmation: {
    reservation: '¿Está seguro de que desea enviar esta solicitud de reserva?',
    navigation: '¿Desea salir de esta página? Los cambios no guardados se perderán.',
    delete: '¿Está seguro de que desea eliminar este elemento?'
  }
}

// Configuración de utilidades
export const UTILITIES = {
  formatters: {
    currency: (amount, currency = 'USD') => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency
      }).format(amount)
    },
    date: (date, format = 'es-CO') => {
      return new Intl.DateTimeFormat(format).format(new Date(date))
    },
    phone: (phone) => {
      return phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
    }
  },
  validators: {
    isValidEmail: (email) => FORM_CONFIG.validation.email.test(email),
    isValidPhone: (phone) => FORM_CONFIG.validation.phone.test(phone),
    isRequired: (value) => !!value && value.toString().trim().length > 0
  }
}

// Export por defecto con toda la configuración
export default {
  HOTEL_INFO,
  CONTACT_INFO,
  THEME_CONFIG,
  NAVIGATION,
  HOTEL_STATS,
  SERVICES_CONFIG,
  PRICING_CONFIG,
  FORM_CONFIG,
  ANIMATION_CONFIG,
  NOTIFICATION_CONFIG,
  DEFAULT_IMAGES,
  SEO_CONFIG,
  BREAKPOINTS,
  MESSAGES,
  UTILITIES
}