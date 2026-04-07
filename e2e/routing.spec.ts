import { test, expect, type Page } from '@playwright/test'

const PASSWORD = 'passw0rd'

const loginViaStub = async (page: Page) => {
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

  await page.goto('/auth/login')
  await page.getByLabel('Введите e-mail').fill('e2e@example.com')
  await page.getByLabel('Введите пароль').fill(PASSWORD)
  await page.getByRole('button', { name: 'Войти' }).click()
  await expect(page).toHaveURL(/\/root\/dashboard$/)
}

test.describe('Routing & protected routes', () => {
  test('guest: / redirects to /auth/login', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/auth\/login$/)
    await expect(page.getByRole('heading', { name: 'Войти в систему' })).toBeVisible()
  })

  test('guest: /root redirects to /auth/login', async ({ page }) => {
    await page.goto('/root')
    await expect(page).toHaveURL(/\/auth\/login$/)
  })

  test('guest: /auth/register stays on register page', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page).toHaveURL(/\/auth\/register$/)
    await expect(page.getByRole('heading', { name: 'Регистрация в системе' })).toBeVisible()
  })

  test('authed: /auth/login redirects to /root/dashboard', async ({ page }) => {
    await loginViaStub(page)
    await page.goto('/auth/login')
    await expect(page).toHaveURL(/\/root\/dashboard$/)
    await expect(page.getByRole('heading', { name: 'Панель' })).toBeVisible()
  })

  test('authed: / redirects to /root/dashboard', async ({ page }) => {
    await loginViaStub(page)
    await page.goto('/')
    await expect(page).toHaveURL(/\/root\/dashboard$/)
  })

  test('authed: /root redirects to /root/dashboard', async ({ page }) => {
    await loginViaStub(page)
    await page.goto('/root')
    await expect(page).toHaveURL(/\/root\/dashboard$/)
  })
})

