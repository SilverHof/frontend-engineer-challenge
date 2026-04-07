import { test, expect } from '@playwright/test'

const uniqueEmail = () => `e2e_${Date.now()}_${Math.floor(Math.random() * 1e6)}@example.com`
const PASSWORD = 'passw0rd'

test.describe('Auth flow (critical paths)', () => {
  test('guest is redirected from /root/dashboard to /auth/login', async ({ page }) => {
    await page.goto('/root/dashboard')
    await expect(page).toHaveURL(/\/auth\/login$/)
    await expect(page.getByRole('heading', { name: 'Войти в систему' })).toBeVisible()
  })

  test('register -> redirected to login', async ({ page }) => {
    const email = uniqueEmail()

    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      })
    })

    await page.goto('/auth/register')
    await expect(page.getByRole('heading', { name: 'Регистрация в системе' })).toBeVisible()

    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)
    await page.getByLabel('Повторите пароль').fill(PASSWORD)

    await page.getByRole('button', { name: 'Зарегистрироваться' }).click()

    await expect(page).toHaveURL(/\/auth\/login$/)
    await expect(page.getByRole('heading', { name: 'Войти в систему' })).toBeVisible()
  })

  test('login -> dashboard -> logout -> back to login', async ({ page, context }) => {
    const email = uniqueEmail()

    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      })
    })

    await page.route('**/api/v1/auth/login', async (route) => {
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

    // register (always redirects to login)
    await page.goto('/auth/register')
    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)
    await page.getByLabel('Повторите пароль').fill(PASSWORD)
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click()
    await expect(page).toHaveURL(/\/auth\/login$/)

    // login
    await page.getByLabel('Введите e-mail').fill(email)
    await page.getByLabel('Введите пароль').fill(PASSWORD)
    await page.getByRole('button', { name: 'Войти' }).click()

    await expect(page).toHaveURL(/\/root\/dashboard$/)
    await expect(page.getByRole('heading', { name: 'Панель' })).toBeVisible()

    // logout
    await page.getByRole('button', { name: 'Выйти' }).click()
    await expect(page).toHaveURL(/\/auth\/login$/)

    // cookies should be cleared (at least auth cookies)
    const cookies = await context.cookies()
    const authCookies = cookies.filter((c) =>
      ['access_token', 'refresh_token', 'expires_in', 'token_type'].includes(c.name),
    )
    expect(authCookies.length).toBe(0)
  })

  test('recovery request sends user back to login', async ({ page }) => {
    await page.route('**/api/v1/auth/request-password-reset', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      })
    })

    await page.goto('/auth/recovery')
    await expect(page.getByRole('heading', { name: 'Восстановление пароля' })).toBeVisible()

    await page.getByLabel('Введите e-mail').fill(uniqueEmail())
    await page.getByRole('button', { name: 'Восстановить пароль' }).click()

    await expect(page).toHaveURL(/\/auth\/login$/)
  })
})

