<template>
  <div class="contacto-minimal">
    <!-- Header de contacto -->
    <section class="contact-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">Contacto y Reservas</h1>
          <p class="page-subtitle">
            Reserve su experiencia única en el convento del siglo XVII más exclusivo de Cartagena
          </p>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <section class="contact-content">
      <div class="container">
        <div class="content-grid">
          <!-- Información de contacto -->
          <div class="contact-info">
            <div class="info-section">
              <h2 class="section-title">Información</h2>
              
              <div class="contact-items">
                <div class="contact-item">
                  <div class="item-icon">
                    <q-icon name="place" size="sm" />
                  </div>
                  <div class="item-content">
                    <div class="item-label">Ubicación</div>
                    <div class="item-value">Centro Histórico<br>Cartagena de Indias, Colombia</div>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="item-icon">
                    <q-icon name="phone" size="sm" />
                  </div>
                  <div class="item-content">
                    <div class="item-label">Teléfono</div>
                    <div class="item-value">+57 605 650 4700</div>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="item-icon">
                    <q-icon name="email" size="sm" />
                  </div>
                  <div class="item-content">
                    <div class="item-label">Email</div>
                    <div class="item-value">reservas@sofitel-cartagena.com</div>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="item-icon">
                    <q-icon name="schedule" size="sm" />
                  </div>
                  <div class="item-content">
                    <div class="item-label">Atención</div>
                    <div class="item-value">24 horas, 7 días de la semana</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Certificaciones -->
            <div class="certifications-section">
              <h3 class="cert-title">Certificaciones</h3>
              <div class="certifications">
                <div class="cert-item">
                  <q-icon name="eco" size="lg" color="positive" />
                  <div class="cert-text">
                    <div class="cert-name">Green Key Certified</div>
                    <div class="cert-desc">Sostenibilidad ambiental</div>
                  </div>
                </div>
                <div class="cert-item">
                  <q-icon name="star" size="lg" color="amber" />
                  <div class="cert-text">
                    <div class="cert-name">5 Estrellas</div>
                    <div class="cert-desc">Lujo internacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario de reserva -->
          <div class="reservation-form">
            <div class="form-container">
              <h2 class="form-title">Reservar Estadía</h2>
              <p class="form-subtitle">Complete el formulario y nos contactaremos con usted</p>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Nombre completo</label>
                    <q-input 
                      v-model="form.name"
                      outlined
                      class="form-input"
                      :rules="[val => !!val || 'Nombre es requerido']"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Email</label>
                    <q-input 
                      v-model="form.email"
                      type="email"
                      outlined
                      class="form-input"
                      :rules="[val => !!val || 'Email es requerido']"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Teléfono</label>
                    <q-input 
                      v-model="form.phone"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="form-row-double">
                  <div class="form-group">
                    <label class="form-label">Check-in</label>
                    <q-input 
                      v-model="form.checkIn"
                      type="date"
                      outlined
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Check-out</label>
                    <q-input 
                      v-model="form.checkOut"
                      type="date"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="form-row-double">
                  <div class="form-group">
                    <label class="form-label">Huéspedes</label>
                    <q-select 
                      v-model="form.guests"
                      :options="guestOptions"
                      outlined
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tipo de habitación</label>
                    <q-select 
                      v-model="form.roomType"
                      :options="roomOptions"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Solicitudes especiales</label>
                    <q-input 
                      v-model="form.requests"
                      type="textarea"
                      outlined
                      rows="4"
                      class="form-input"
                      placeholder="Ocasión especial, preferencias de habitación, etc."
                    />
                  </div>
                </div>

                <div class="form-actions">
                  <q-btn 
                    type="submit"
                    unelevated
                    rounded
                    size="lg"
                    color="primary"
                    label="Enviar Solicitud"
                    class="submit-btn"
                    no-caps
                    :loading="isSubmitting"
                  />
                  <p class="form-note">
                    Nos contactaremos con usted en las próximas 24 horas
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Acciones rápidas -->
    <section class="quick-actions">
      <div class="container">
        <div class="actions-grid">
          <div class="action-card" @click="callHotel">
            <q-icon name="phone" size="2rem" class="action-icon" />
            <div class="action-content">
              <div class="action-title">Llamar Directo</div>
              <div class="action-subtitle">+57 605 650 4700</div>
            </div>
          </div>

          <div class="action-card" @click="openWhatsapp">
            <q-icon name="chat" size="2rem" class="action-icon" />
            <div class="action-content">
              <div class="action-title">WhatsApp</div>
              <div class="action-subtitle">Respuesta inmediata</div>
            </div>
          </div>

          <div class="action-card" @click="openLocation">
            <q-icon name="place" size="2rem" class="action-icon" />
            <div class="action-content">
              <div class="action-title">Ubicación</div>
              <div class="action-subtitle">Ver en mapas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado del formulario
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  roomType: 'Habitación Superior',
  requests: ''
})

// Opciones para selects
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8]
const roomOptions = [
  'Habitación Superior',
  'Habitación Deluxe', 
  'Junior Suite',
  'Suite Colonial Premium',
  'Suite Familiar',
  'Suite Presidencial'
]

// Métodos
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    $q.notify({
      message: 'Solicitud enviada exitosamente. Nos contactaremos pronto.',
      color: 'positive',
      icon: 'check_circle',
      position: 'top',
      timeout: 5000
    })
    
    // Limpiar formulario
    form.value = {
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      roomType: 'Habitación Superior',
      requests: ''
    }
  } catch (error) {
    $q.notify({
      message: 'Error al enviar la solicitud. Inténtelo nuevamente.',
      color: 'negative',
      icon: 'error',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}

const callHotel = () => {
  window.open('tel:+57605650470', '_self')
}

const openWhatsapp = () => {
  const message = encodeURIComponent('Hola, me gustaría información sobre disponibilidad y reservas en Sofitel Legend Santa Clara.')
  window.open(`https://wa.me/57605650470?text=${message}`, '_blank')
}

const openLocation = () => {
  window.open('https://maps.google.com/?q=Sofitel+Legend+Santa+Clara+Cartagena', '_blank')
}
</script>

<style scoped>
.contacto-minimal {
  --minimal-primary: #2c2c2c;
  --minimal-secondary: #f8f8f8;
  --minimal-accent: #d4af37;
  --minimal-text: #333333;
  --minimal-text-light: #666666;
  --minimal-border: #e8e8e8;
  --minimal-white: #ffffff;
  --minimal-spacing: 2rem;
  --minimal-radius: 12px;
}

/* Header */
.contact-header {
  padding: 4rem var(--minimal-spacing) 3rem;
  background: var(--minimal-white);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-content {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  font-weight: 300;
  color: var(--minimal-text);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--minimal-text-light);
}

/* Contenido principal */
.contact-content {
  padding: 4rem var(--minimal-spacing);
  background: var(--minimal-secondary);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

/* Información de contacto */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--minimal-text);
  margin-bottom: 2rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--minimal-accent);
}

.item-content {
  flex: 1;
}

.item-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--minimal-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.item-value {
  font-size: 1rem;
  color: var(--minimal-text-light);
  line-height: 1.5;
}

/* Certificaciones */
.certifications-section {
  background: var(--minimal-white);
  padding: 2rem;
  border-radius: var(--minimal-radius);
  border: 1px solid var(--minimal-border);
}

.cert-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--minimal-text);
  margin-bottom: 1.5rem;
}

.certifications {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cert-text {
  flex: 1;
}

.cert-name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--minimal-text);
}

.cert-desc {
  font-size: 0.85rem;
  color: var(--minimal-text-light);
}

/* Formulario */
.form-container {
  background: var(--minimal-white);
  padding: 3rem;
  border-radius: var(--minimal-radius);
  border: 1px solid var(--minimal-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--minimal-text);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 1rem;
  color: var(--minimal-text-light);
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row,
.form-row-double {
  display: flex;
  gap: 1rem;
}

.form-row {
  flex-direction: column;
}

.form-row-double {
  flex-direction: row;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--minimal-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  background: var(--minimal-white);
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

.submit-btn {
  background: var(--minimal-primary);
  color: white;
  font-weight: 600;
  padding: 12px 48px;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.submit-btn:hover {
  background: var(--minimal-text);
  transform: translateY(-2px);
}

.form-note {
  font-size: 0.85rem;
  color: var(--minimal-text-light);
  margin-top: 1rem;
  margin-bottom: 0;
}

/* Acciones rápidas */
.quick-actions {
  padding: 3rem var(--minimal-spacing);
  background: var(--minimal-white);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: var(--minimal-secondary);
  border: 1px solid var(--minimal-border);
  border-radius: var(--minimal-radius);
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: var(--minimal-white);
  border-color: var(--minimal-accent);
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
}

.action-icon {
  color: var(--minimal-accent);
  flex-shrink: 0;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--minimal-text);
  margin-bottom: 0.25rem;
}

.action-subtitle {
  font-size: 0.9rem;
  color: var(--minimal-text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .form-container {
    padding: 2rem;
  }
  
  .form-row-double {
    flex-direction: column;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-content {
    padding: 2rem 1rem;
  }
  
  .form-container {
    padding: 1.5rem;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .action-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>