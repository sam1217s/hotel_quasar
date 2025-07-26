import { useQuasar } from 'quasar'

/**
 * Composable para manejar notificaciones de manera consistente
 * @returns {Object} Métodos para mostrar diferentes tipos de notificaciones
 */
export function useNotifications() {
  const $q = useQuasar()

  /**
   * Configuración por defecto para las notificaciones
   */
  const defaultConfig = {
    position: 'top',
    timeout: 4000,
    actions: [
      {
        icon: 'close',
        color: 'white',
        round: true,
        handler: () => {}
      }
    ]
  }

  /**
   * Mostrar notificación de éxito
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifySuccess = (message, options = {}) => {
    $q.notify({
      message,
      color: 'positive',
      icon: 'check_circle',
      ...defaultConfig,
      ...options
    })
  }

  /**
   * Mostrar notificación de error
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifyError = (message, options = {}) => {
    $q.notify({
      message,
      color: 'negative',
      icon: 'error',
      timeout: 6000, // Errores duran más tiempo
      ...defaultConfig,
      ...options
    })
  }

  /**
   * Mostrar notificación de advertencia
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifyWarning = (message, options = {}) => {
    $q.notify({
      message,
      color: 'warning',
      icon: 'warning',
      textColor: 'dark',
      ...defaultConfig,
      ...options
    })
  }

  /**
   * Mostrar notificación informativa
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifyInfo = (message, options = {}) => {
    $q.notify({
      message,
      color: 'info',
      icon: 'info',
      ...defaultConfig,
      ...options
    })
  }

  /**
   * Mostrar notificación de carga/progreso
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifyLoading = (message, options = {}) => {
    return $q.notify({
      message,
      color: 'primary',
      icon: 'hourglass_empty',
      spinner: true,
      timeout: 0, // No se cierra automáticamente
      ...options
    })
  }

  /**
   * Mostrar notificación personalizada para el hotel
   * @param {string} type - Tipo de notificación del hotel
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   */
  const notifyHotel = (type, message, options = {}) => {
    const hotelConfig = {
      reservation: {
        color: 'brown-7',
        icon: 'hotel',
        textColor: 'white'
      },
      contact: {
        color: 'blue-6',
        icon: 'contact_mail',
        textColor: 'white'
      },
      restaurant: {
        color: 'amber-8',
        icon: 'restaurant',
        textColor: 'white'
      },
      spa: {
        color: 'teal-6',
        icon: 'spa',
        textColor: 'white'
      },
      sports: {
        color: 'deep-orange',
        icon: 'sports_handball',
        textColor: 'white'
      }
    }

    const config = hotelConfig[type] || hotelConfig.contact

    $q.notify({
      message,
      ...config,
      ...defaultConfig,
      ...options
    })
  }

  /**
   * Mostrar notificación de formulario enviado exitosamente
   * @param {string} formType - Tipo de formulario (reserva, contacto, etc.)
   * @param {Object} options - Opciones adicionales
   */
  const notifyFormSuccess = (formType = 'formulario', options = {}) => {
    const messages = {
      reserva: 'Solicitud de reserva enviada exitosamente. Nos contactaremos pronto.',
      contacto: 'Mensaje enviado exitosamente. Responderemos en las próximas 24 horas.',
      newsletter: 'Te has suscrito exitosamente a nuestro newsletter.',
      default: 'Formulario enviado exitosamente.'
    }

    const message = messages[formType] || messages.default

    notifySuccess(message, {
      timeout: 5000,
      ...options
    })
  }

  /**
   * Mostrar notificación de error de formulario
   * @param {string} formType - Tipo de formulario
   * @param {Object} options - Opciones adicionales
   */
  const notifyFormError = (formType = 'formulario', options = {}) => {
    const messages = {
      reserva: 'Error al enviar la solicitud de reserva. Inténtelo nuevamente.',
      contacto: 'Error al enviar el mensaje. Por favor, inténtelo nuevamente.',
      validation: 'Por favor, complete todos los campos obligatorios correctamente.',
      default: 'Error al enviar el formulario. Inténtelo nuevamente.'
    }

    const message = messages[formType] || messages.default

    notifyError(message, options)
  }

  /**
   * Mostrar notificación de acción no disponible
   * @param {string} feature - Característica no disponible
   * @param {Object} options - Opciones adicionales
   */
  const notifyUnavailable = (feature, options = {}) => {
    notifyWarning(`La función "${feature}" estará disponible próximamente.`, {
      timeout: 3000,
      ...options
    })
  }

  /**
   * Mostrar notificación de navegación
   * @param {string} section - Sección a la que se navega
   * @param {Object} options - Opciones adicionales
   */
  const notifyNavigation = (section, options = {}) => {
    notifyInfo(`Navegando a ${section}...`, {
      timeout: 2000,
      ...options
    })
  }

  /**
   * Mostrar notificación de confirmación de acción
   * @param {string} action - Acción realizada
   * @param {Object} options - Opciones adicionales
   */
  const notifyActionConfirm = (action, options = {}) => {
    notifySuccess(`${action} realizado exitosamente.`, {
      timeout: 3000,
      ...options
    })
  }

  /**
   * Mostrar notificación persistente que requiere acción del usuario
   * @param {string} message - Mensaje a mostrar
   * @param {Object} options - Opciones adicionales
   * @returns {Function} Función para cerrar la notificación
   */
  const notifyPersistent = (message, options = {}) => {
    const dismiss = $q.notify({
      message,
      color: 'primary',
      icon: 'notification_important',
      timeout: 0,
      actions: [
        {
          label: 'Entendido',
          color: 'white',
          handler: () => {}
        }
      ],
      ...options
    })

    return dismiss
  }

  /**
   * Mostrar notificación con progreso
   * @param {string} message - Mensaje inicial
   * @param {Promise} promise - Promise a seguir
   * @param {Object} options - Opciones adicionales
   */
  const notifyWithProgress = async (message, promise, options = {}) => {
    const loadingNotify = notifyLoading(message, options)

    try {
      const result = await promise
      loadingNotify()
      notifySuccess(options.successMessage || 'Operación completada exitosamente.')
      return result
    } catch (error) {
      loadingNotify()
      notifyError(options.errorMessage || 'Error en la operación.')
      throw error
    }
  }

  /**
   * Limpiar todas las notificaciones
   */
  const clearAll = () => {
    $q.notify.clearAll()
  }

  return {
    // Notificaciones básicas
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyLoading,

    // Notificaciones específicas del hotel
    notifyHotel,
    notifyFormSuccess,
    notifyFormError,
    notifyUnavailable,
    notifyNavigation,
    notifyActionConfirm,

    // Notificaciones avanzadas
    notifyPersistent,
    notifyWithProgress,

    // Utilidades
    clearAll
  }
}

/**
 * Hook para notificaciones específicas de formularios
 * @returns {Object} Métodos específicos para formularios
 */
export function useFormNotifications() {
  const { notifyFormSuccess, notifyFormError, notifyLoading, notifyWarning } = useNotifications()

  /**
   * Manejar el ciclo completo de envío de formulario
   * @param {Function} submitFunction - Función que envía el formulario
   * @param {Object} options - Opciones de configuración
   */
  const handleFormSubmit = async (submitFunction, options = {}) => {
    const {
      loadingMessage = 'Enviando formulario...',
      successMessage = 'Formulario enviado exitosamente',
      errorMessage = 'Error al enviar el formulario',
      formType = 'default'
    } = options

    const loadingNotify = notifyLoading(loadingMessage)

    try {
      const result = await submitFunction()
      loadingNotify()
      notifyFormSuccess(formType, { message: successMessage })
      return result
    } catch (error) {
      loadingNotify()
      notifyFormError(formType, { message: errorMessage })
      throw error
    }
  }

  /**
   * Validar formulario y mostrar errores
   * @param {Object} validationResult - Resultado de la validación
   */
  const handleValidationErrors = (validationResult) => {
    if (validationResult.hasErrors) {
      const firstError = validationResult.errors[0]
      notifyWarning(firstError.message || 'Por favor, corrija los errores en el formulario.')
    }
  }

  return {
    handleFormSubmit,
    handleValidationErrors,
    notifyFormSuccess,
    notifyFormError
  }
}