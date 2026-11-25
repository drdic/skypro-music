export const API_BASE = 'https://webdev-music-003b5b991590.herokuapp.com'

const DEFAULT_ERROR = 'Не удалось выполнить запрос. Попробуйте позже.'

const MESSAGE_TRANSLATIONS = [
  {
    pattern: /username must be at least 3 characters/i,
    text: 'Имя должно содержать минимум 3 символа',
  },
  {
    pattern: /username.*(latin|letters|characters)/i,
    text: 'Имя может содержать только латинские буквы, цифры и символы @ . / + - _',
  },
  {
    pattern: /password must be at least 6 characters/i,
    text: 'Пароль должен содержать минимум 6 символов',
  },
  {
    pattern: /email must be a valid email/i,
    text: 'Введите корректный email',
  },
  {
    pattern: /user with this email already exists|duplicate/i,
    text: 'Пользователь с такой почтой уже зарегистрирован',
  },
  {
    pattern: /данные в неверном формате/i,
    text: 'Проверьте правильность заполнения полей',
  },
]

function translateMessage(raw) {
  const text = String(raw || '').trim()
  if (!text) return ''

  const match = MESSAGE_TRANSLATIONS.find((item) => item.pattern.test(text))
  return match ? match.text : text
}

function collectFieldErrors(data) {
  const errors = data?.errors
  if (!errors || typeof errors !== 'object') return ''

  return Object.values(errors)
    .flat()
    .filter(Boolean)
    .map((item) => translateMessage(item))
    .filter(Boolean)
    .join(' ')
}

export async function request(path, options = {}) {
  const { method = 'GET', body, token } = options

  try {
    return await $fetch(`${API_BASE}${path}`, {
      method,
      body,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  } catch (error) {
    const data = error?.data || {}
    const details = collectFieldErrors(data)
    const message =
      details || translateMessage(data.message) || translateMessage(data.detail) || DEFAULT_ERROR
    const result = new Error(message)
    result.statusCode = error?.status || error?.response?.status || 0
    throw result
  }
}
