<template>
  <section class="form-section q-pa-xl" :class="sectionClass" :style="sectionStyle">
    <!-- Título opcional -->
    <div v-if="title || subtitle" class="text-center q-mb-xl">
      <h2 v-if="title" class="text-h4" :class="titleClass">{{ title }}</h2>
      <p v-if="subtitle" class="text-h6" :class="subtitleClass">{{ subtitle }}</p>
    </div>
    
    <div class="row justify-center">
      <div :class="formContainerClass">
        <q-card class="form-card" :flat="flat" :bordered="bordered">
          <q-card-section :class="['q-pa-xl', cardSectionClass]">
            <!-- Encabezado del formulario -->
            <div v-if="formTitle || formSubtitle" class="form-header q-mb-lg text-center">
              <h3 v-if="formTitle" class="text-h5 text-grey-8 q-mb-sm">{{ formTitle }}</h3>
              <p v-if="formSubtitle" class="text-body1 text-grey-6">{{ formSubtitle }}</p>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="handleSubmit" class="form-content">
              <!-- Contenido del formulario via slots -->
              <div v-if="$slots.default" class="form-fields">
                <slot />
              </div>

              <!-- Campos generados automáticamente -->
              <div v-else-if="fields && fields.length" class="form-fields">
                <div 
                  v-for="(field, index) in fields" 
                  :key="field.name || index"
                  :class="getFieldContainerClass(field)"
                >
                  <!-- Input de texto -->
                  <q-input
                    v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                    v-model="formData[field.name]"
                    :type="field.type"
                    :label="field.label"
                    :placeholder="field.placeholder"
                    :rules="field.rules"
                    :outlined="outlined"
                    :filled="filled"
                    :dense="dense"
                    :readonly="field.readonly"
                    :disable="field.disable"
                    :class="['form-input', field.class]"
                  />

                  <!-- Textarea -->
                  <q-input
                    v-else-if="field.type === 'textarea'"
                    v-model="formData[field.name]"
                    type="textarea"
                    :label="field.label"
                    :placeholder="field.placeholder"
                    :rules="field.rules"
                    :rows="field.rows || 4"
                    :outlined="outlined"
                    :filled="filled"
                    :dense="dense"
                    :readonly="field.readonly"
                    :disable="field.disable"
                    :class="['form-input', field.class]"
                  />

                  <!-- Select -->
                  <q-select
                    v-else-if="field.type === 'select'"
                    v-model="formData[field.name]"
                    :options="field.options"
                    :label="field.label"
                    :rules="field.rules"
                    :outlined="outlined"
                    :filled="filled"
                    :dense="dense"
                    :readonly="field.readonly"
                    :disable="field.disable"
                    :class="['form-input', field.class]"
                  />

                  <!-- Date -->
                  <q-input
                    v-else-if="field.type === 'date'"
                    v-model="formData[field.name]"
                    type="date"
                    :label="field.label"
                    :rules="field.rules"
                    :outlined="outlined"
                    :filled="filled"
                    :dense="dense"
                    :readonly="field.readonly"
                    :disable="field.disable"
                    :class="['form-input', field.class]"
                  />

                  <!-- Number -->
                  <q-input
                    v-else-if="field.type === 'number'"
                    v-model.number="formData[field.name]"
                    type="number"
                    :label="field.label"
                    :min="field.min"
                    :max="field.max"
                    :step="field.step"
                    :rules="field.rules"
                    :outlined="outlined"
                    :filled="filled"
                    :dense="dense"
                    :readonly="field.readonly"
                    :disable="field.disable"
                    :class="['form-input', field.class]"
                  />

                  <!-- Checkbox -->
                  <q-checkbox
                    v-else-if="field.type === 'checkbox'"
                    v-model="formData[field.name]"
                    :label="field.label"
                    :color="field.color || 'brown-7'"
                    :disable="field.disable"
                    :class="['form-checkbox', field.class]"
                  />

                  <!-- Radio -->
                  <q-radio
                    v-else-if="field.type === 'radio'"
                    v-model="formData[field.name]"
                    :val="field.value"
                    :label="field.label"
                    :color="field.color || 'brown-7'"
                    :disable="field.disable"
                    :class="['form-radio', field.class]"
                  />
                </div>
              </div>

              <!-- Acciones del formulario -->
              <div class="form-actions text-center q-mt-xl">
                <!-- Slot para acciones personalizadas -->
                <div v-if="$slots.actions">
                  <slot name="actions" :is-submitting="isSubmitting" :form-data="formData" />
                </div>
                
                <!-- Botones por defecto -->
                <div v-else class="default-actions">
                  <BaseButton
                    type="submit"
                    :variant="submitButtonVariant"
                    :color="submitButtonColor"
                    :label="submitButtonText"
                    :icon="submitButtonIcon"
                    :loading="isSubmitting"
                    :size="submitButtonSize"
                    :class="['submit-btn', submitButtonClass]"
                  />
                  
                  <BaseButton
                    v-if="showCancelButton"
                    :variant="cancelButtonVariant"
                    :color="cancelButtonColor"
                    :label="cancelButtonText"
                    :icon="cancelButtonIcon"
                    :size="cancelButtonSize"
                    :class="['cancel-btn q-ml-md', cancelButtonClass]"
                    @click="handleCancel"
                  />
                </div>

                <!-- Nota adicional -->
                <div v-if="formNote" class="form-note q-mt-md">
                  <div class="text-body2 text-grey-6">
                    <q-icon v-if="formNote.icon" :name="formNote.icon" size="sm" class="q-mr-xs" />
                    {{ formNote.text }}
                  </div>
                </div>
              </div>
            </form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'
import BaseButton from './BaseButton.vue'

const $q = useQuasar()

const props = defineProps({
  // Configuración de la sección
  title: String,
  subtitle: String,
  titleClass: {
    type: String,
    default: 'text-grey-8'
  },
  subtitleClass: {
    type: String,
    default: 'text-grey-6'
  },
  
  // Configuración del formulario
  formTitle: String,
  formSubtitle: String,
  
  // Configuración de campos automáticos
  fields: Array,
  modelValue: {
    type: Object,
    default: () => ({})
  },
  
  // Estilos
  theme: {
    type: String,
    default: 'light'
  },
  sectionClass: String,
  formContainerClass: {
    type: String,
    default: 'col-lg-8 col-md-10 col-sm-12 col-xs-12'
  },
  cardSectionClass: String,
  
  // Configuración de inputs
  outlined: {
    type: Boolean,
    default: true
  },
  filled: Boolean,
  dense: Boolean,
  flat: Boolean,
  bordered: {
    type: Boolean,
    default: true
  },
  
  // Configuración de botones
  submitButtonText: {
    type: String,
    default: 'Enviar'
  },
  submitButtonVariant: {
    type: String,
    default: 'cta'
  },
  submitButtonColor: {
    type: String,
    default: 'blue-6'
  },
  submitButtonIcon: String,
  submitButtonSize: {
    type: String,
    default: 'lg'
  },
  submitButtonClass: String,
  
  showCancelButton: Boolean,
  cancelButtonText: {
    type: String,
    default: 'Cancelar'
  },
  cancelButtonVariant: {
    type: String,
    default: 'secondary'
  },
  cancelButtonColor: String,
  cancelButtonIcon: String,
  cancelButtonSize: {
    type: String,
    default: 'lg'
  },
  cancelButtonClass: String,
  
  // Nota del formulario
  formNote: Object,
  
  // Estado de carga
  loading: Boolean
})

const emit = defineEmits(['submit', 'cancel', 'update:modelValue', 'field-change'])

const isSubmitting = ref(false)
const formData = reactive({ ...props.modelValue })

// Funciones de notificación (reemplaza useNotifications)
const notify = (message, options = {}) => {
  $q.notify({
    message,
    position: 'top',
    timeout: 4000,
    actions: [{ icon: 'close', color: 'white', round: true }],
    ...options
  })
}

const notifySuccess = (message) => {
  notify(message, { color: 'positive', icon: 'check_circle' })
}

const notifyError = (message) => {
  notify(message, { color: 'negative', icon: 'error', timeout: 6000 })
}

// Configuraciones de tema
const themeConfig = {
  light: {
    background: '#f8f9fa',
    titleColor: 'text-grey-8',
    subtitleColor: 'text-grey-6'
  },
  dark: {
    background: 'linear-gradient(135deg, #2c2c2c, #1a1a1a)',
    titleColor: 'text-white',
    subtitleColor: 'text-grey-4'
  },
  primary: {
    background: 'linear-gradient(135deg, rgba(141, 69, 19, 0.05), rgba(160, 82, 45, 0.02))',
    titleColor: 'text-grey-8',
    subtitleColor: 'text-grey-6'
  }
}

const sectionStyle = computed(() => {
  const config = themeConfig[props.theme]
  return config ? { background: config.background } : {}
})

// Clase para contenedor de campo
const getFieldContainerClass = (field) => {
  const baseClass = field.containerClass || ''
  const sizeClass = field.size || 'col-12'
  return `${sizeClass} ${baseClass}`.trim()
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  Object.assign(formData, newValue)
}, { deep: true })

watch(formData, (newValue) => {
  emit('update:modelValue', { ...newValue })
}, { deep: true })

watch(() => props.loading, (newValue) => {
  isSubmitting.value = newValue
})

// Event handlers
const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await emit('submit', { ...formData })
    
    if (!props.loading) {
      notifySuccess('Formulario enviado exitosamente')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    notifyError('Error al enviar el formulario. Inténtelo nuevamente.')
  } finally {
    if (!props.loading) {
      isSubmitting.value = false
    }
  }
}

const handleCancel = () => {
  emit('cancel')
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    delete formData[key]
  })
  Object.assign(formData, props.modelValue)
}

const setFieldValue = (fieldName, value) => {
  formData[fieldName] = value
  emit('field-change', { field: fieldName, value })
}

// Exponer métodos públicos
defineExpose({
  resetForm,
  setFieldValue,
  formData
})
</script>

<style scoped>
.form-section {
  background: #f8f9fa;
}

.form-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.form-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.form-content {
  max-width: 100%;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.form-fields .col-12 {
  grid-column: span 12;
}

.form-fields .col-6 {
  grid-column: span 6;
}

.form-fields .col-4 {
  grid-column: span 4;
}

.form-fields .col-3 {
  grid-column: span 3;
}

.form-input {
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.form-checkbox,
.form-radio {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.form-actions {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.submit-btn {
  min-width: 200px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.cancel-btn {
  min-width: 150px;
}

.form-note {
  opacity: 0.8;
  margin-top: 1rem;
}

/* Animaciones */
.form-card {
  animation: formFadeIn 0.6s ease-out;
}

.form-fields > * {
  animation: fieldSlideIn 0.4s ease-out;
}

.form-fields > *:nth-child(1) { animation-delay: 0.1s; }
.form-fields > *:nth-child(2) { animation-delay: 0.15s; }
.form-fields > *:nth-child(3) { animation-delay: 0.2s; }
.form-fields > *:nth-child(4) { animation-delay: 0.25s; }
.form-fields > *:nth-child(5) { animation-delay: 0.3s; }
.form-fields > *:nth-child(6) { animation-delay: 0.35s; }

@keyframes formFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fieldSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .form-fields .col-6 {
    grid-column: span 12;
  }
  
  .form-fields .col-4 {
    grid-column: span 12;
  }
  
  .form-fields .col-3 {
    grid-column: span 12;
  }
  
  .submit-btn {
    min-width: 180px;
  }
  
  .cancel-btn {
    min-width: 120px;
    margin-left: 0 !important;
    margin-top: 0.5rem;
  }
  
  .default-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .form-card .q-pa-xl {
    padding: 1.5rem !important;
  }
  
  .submit-btn {
    min-width: 160px;
    width: 100%;
    max-width: 250px;
  }
  
  .cancel-btn {
    width: 100%;
    max-width: 200px;
  }
}

/* Temas */
.form-section.theme-dark {
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
}

.form-section.theme-dark .form-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-section.theme-primary {
  background: linear-gradient(135deg, rgba(141, 69, 19, 0.05), rgba(160, 82, 45, 0.02));
}
</style>