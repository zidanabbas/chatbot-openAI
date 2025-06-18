# 🧠 Chatbot OpenAI

Chatbot sederhana berbasis AI menggunakan **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, dan **OpenRouter API (OpenAI compatible endpoint)**. Project ini di-deploy secara **serverless** di [Vercel](https://vercel.com).

---

## 🚀 Demo

🌐 [Lihat Live Demo](https://chatbot-openai-zidanabbas.vercel.app)

---

## 📦 Fitur

- ⚡️ Realtime chatbot menggunakan OpenRouter (OpenAI API compatible)
- 🎨 Styling elegan dengan Tailwind CSS
- ⚙️ App Router (Next.js 15) dengan API Routes (server functions)
- 💬 Scroll otomatis, validasi input, dan UX responsif
- 🔐 Menggunakan variabel environment untuk keamanan API Key
- ☁️ Deploy otomatis via Vercel

---

## 🧰 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter API](https://openrouter.ai/)
- [Vercel](https://vercel.com/)

---

## 🧑‍💻 Cara Menjalankan Lokal

### 1. Clone Repositori

```bash
git clone https://github.com/zidanabbas/chatbot-openai.git
cd chatbot-openai
```

### 2. Install Dependencies

```bash
pnpm install
# atau
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment

Buat file `.env.local` di root project:

```env
OPENAI_API_URL=https://openrouter.ai/api/v1/chat/completions
OPENAI_API_KEY=sk-xxxxxxx  # Ganti dengan API key dari OpenRouter
```

### 4. Jalankan Dev Server

```bash
pnpm dev
# atau
npm run dev
```

Buka browser ke [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy ke Vercel

1. Push project ini ke GitHub.
2. Buka [vercel.com/import](https://vercel.com/import).
3. Import repositori GitHub kamu.
4. Tambahkan environment variable:
   - `OPENAI_API_KEY`
   - `OPENAI_API_URL` = `https://openrouter.ai/api/v1/chat/completions`
5. Klik deploy 🚀

---

## 🧾 Struktur Folder

```
zidanabbas-chatbot-openai/
├── src/
│   └── app/
│       ├── page.tsx        # UI Chatbot
│       ├── layout.tsx      # Layout utama
│       └── api/chat/       # Route API untuk POST ke OpenRouter
│           └── route.js
├── public/
├── styles/
│   └── globals.css         # Tailwind import
├── .env.local              # (dibuat manual)
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 📄 Lisensi

MIT License © 2025 [Zidan Abbas](https://abbasdev.vercel.app/)

---

## 🤝 Kontribusi

Pull Request terbuka untuk perbaikan fitur atau peningkatan UX. Jangan lupa ⭐️ project ini jika bermanfaat!

---

## 📬 Kontak

- 🧑‍💻 Website: [abbasdev.vercel.app](https://abbasdev.vercel.app)
- 📮 Email: zidan.abbas28@gmail.com
- 💼 LinkedIn: [linkedin.com/in/zidanabbas](https://linkedin.com/in/zidanabbas)
