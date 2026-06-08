# ROOT Experience — описание проекта

**Что это:** отдельный web-сервис для [ROOT Winery](https://rootwinery.it) (Maiolati Spontini, Marche). Дополняет основной сайт и Shopify. Не заменяет их — собирает заявки и создаёт подарочные артефакты.

**Стек:** Next.js 16, TypeScript, Supabase, Resend (email), Telegram, Vercel. Публичные страницы — server-rendered HTML.

**Языки:** en, it (обязательно), ru (опционально). Все публичные тексты локализованы.

---

## Модуль 1 — Gift Constructor

**Цель:** человек подбирает подарок и получает **именную подарочную страницу**, а не просто «мы перезвоним».

### Шаг 1 — Wizard (`/gift`)

5 шагов:

| # | Поле |
|---|------|
| 1 | Повод: birthday, anniversary, wedding, corporate, holiday, thank you, just because |
| 2 | Кому: partner, friend, family, colleague, client |
| 3 | Бюджет: 4 диапазона EUR |
| 4 | Тип: experience, wine set, non-alcoholic, food pairing, wellness, mixed |
| 5 | Личное сообщение (опционально) |

### Шаг 2 — Рекомендация (`/gift/result`)

- Алгоритм `matchGift()` выбирает лучший вариант из каталога `config/gift-options.ts`
- Каталог: Vineyard Day Pass, Cellar Tasting Box, Sparkling Heritage Set, Artisan Pairing Crate, Wellness Voucher
- Best match + альтернативы
- Кнопка на Shopify (`ctaUrl`) — внешняя ссылка, без checkout внутри приложения

### Шаг 3 — Персонализация и submit

Форма: имя получателя, имя дарителя, сообщение, email, телефон (опц.), consent.

При submit:

1. Lead → Supabase `gift_leads` (контакты + answers jsonb)
2. Gift page → Supabase `gift_pages` (slug, names, message, gift, ctaUrl, lead_id)
3. Email + Telegram уведомление команде (если настроено)

### Шаг 4 — Reveal (`/gift/g/[slug]/open`)

Экран-сюрприз перед открытием: seal ROOT, имена, кнопка «Open your gift».

### Шаг 5 — Certificate (`/gift/g/[slug]`)

Публичная страница:

- сертификат с датой и seal ROOT
- auto-generated gift story (2 предложения)
- occasion, recommended gift, personal message
- CTA: Buy on ROOT Winery / Request ROOT to prepare
- print / save as PDF, copy reveal link, QR
- **email и телефон не показываются**

Slug: детерминированный hash + защита от коллизий.

---

## Модуль 2 — Booking Assistant

**Цель:** заявка на тур/дегустацию. **Не instant booking.**

### Wizard (`/booking`) — 6 шагов

| # | Поле |
|---|------|
| 1 | Тип: vineyard tour, buggy tour, tasting, picnic, private group, corporate |
| 2 | Число гостей |
| 3 | Язык |
| 4 | Дата и время |
| 5 | Контакты + notes |
| 6 | Consent + review |

Submit → Supabase `booking_requests` → `/booking/confirmation` с формулировкой «request only, not confirmed booking».

---

## Admin (`/admin`)

- Список gift leads и booking requests
- Фильтры по status / date, CSV export
- Detail: контакты, answers, status, internal notes
- Ссылка на gift page (если создана)
- Статусы: `new` → `contacted` → `confirmed` → `declined` → `completed`
- Auth: пароль или Supabase Auth + allowlist email

---

## Уведомления

- **Resend** — email на `NOTIFY_EMAIL_TO`
- **Telegram** — сообщение в chat
- Ошибки notification не блокируют сохранение lead / booking

---

## Wine Daily Bot (дополнительно)

Cron `/api/cron/daily-wine` — ежедневный wine tip в Telegram (погода Marche + новости). Отдельная фича, не часть основного user flow.

---

## База данных (Supabase)

| Таблица | Назначение |
|---------|------------|
| `gift_leads` | приватные контакты + answers |
| `gift_pages` | публичные подарочные страницы |
| `booking_requests` | заявки на бронирование |
| `gift_options` | есть в схеме, не используется — каталог в коде |

RLS включён. Доступ через service_role на сервере.

---

## API

| Endpoint | Назначение |
|----------|------------|
| `POST /api/gift/recommendation` | JSON-рекомендация |
| `POST /api/gift/lead` | lead + gift page |
| `POST /api/submissions/gift` | прямой insert lead |
| `POST /api/booking/request` | booking request |
| `POST /api/submissions/booking` | прямой insert booking |

---

## Чего нет (by design)

- Оплаты, checkout, Stripe
- Instant booking confirmation
- CRM sync
- Real-time Shopify inventory
- Полноценный CMS / админка

---

## Тесты и деплой

- **Vitest:** recommendation, slug, gift pages, submissions, notifications
- **Playwright:** smoke — gift flow (reveal → certificate), booking, consent, mobile
- **Deploy:** Vercel + env vars из `.env.example`

---

## User journeys

**Gift:**

```
/gift → /gift/result → submit → /gift/g/[slug]/open → /gift/g/[slug] → share/print → Shopify или заявка ROOT
```

**Booking:**

```
/booking → submit → /booking/confirmation → ROOT связывается вручную
```

---

## Суть

Digital-слой для ROOT Winery: guided gift experience с shareable certificate + booking requests без кассы и без ложного «бронирование подтверждено».
