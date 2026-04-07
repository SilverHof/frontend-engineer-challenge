import { test, expect } from '@playwright/test'

const PASSWORD = 'passw0rd'
const uniqueEmail = () => `e2e_${Date.now()}_${Math.floor(Math.random() * 1e6)}@example.com`

test.describe('UX protections (double submit, disabled states)', () => {
  test('login: double click submit sends only one request and button becomes disabled/loading', async ({ page }) => {
    const email = uniqueEmail()

    // Stub register (so we can login with a known password, but still keep test fast and deterministic)
    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      })
    })

    // Stub login with an artificial delay and count requests
    let loginRequests = 0
    await page.route('**/api/v1/auth/login', async (route) => {
      loginRequests += 1
      await new Promise((r) => setTimeout(r, 600))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            accessToken: 'e2e_access',
            refreshToken: 'e2e_refresh',
            tokenType: 'Bearer',
            expiresIn: 3600,
          },
        }),
      })
    })

    await page.goto('/auth/register')
    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)
    await page.getByLabel('Повторите пароль').fill(PASSWORD)
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click()

    await expect(page).toHaveURL(/\/auth\/login$/)

    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)

    const submit = page.getByRole('button', { name: 'Войти' })

    // spam click while request in-flight
    await submit.click()
    await expect(submit).toBeDisabled()
    await submit.click({ force: true }).catch(() => undefined)
    await submit.click({ force: true }).catch(() => undefined)

    await expect(page).toHaveURL(/\/root\/dashboard$/)
    expect(loginRequests).toBe(1)
  })

  test('register: submit button becomes disabled/loading and does not send duplicates', async ({ page }) => {
    const email = uniqueEmail()

    let registerRequests = 0
    await page.route('**/api/v1/auth/register', async (route) => {
      registerRequests += 1
      await new Promise((r) => setTimeout(r, 600))
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      })
    })

    await page.goto('/auth/register')
    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)
    await page.getByLabel('Повторите пароль').fill(PASSWORD)

    const submit = page.getByRole('button', { name: 'Зарегистрироваться' })
    await submit.click()
    await expect(submit).toBeDisabled()

    // extra clicks while in-flight shouldn't cause more requests
    await submit.click({ force: true }).catch(() => undefined)
    await submit.click({ force: true }).catch(() => undefined)

    await expect(page).toHaveURL(/\/auth\/login$/)
    expect(registerRequests).toBe(1)
  })
})

