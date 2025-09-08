This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```bash
src/
├── app/ # Next.js App Router (라우팅만 담당)
└── [FSD 레이어들] # 실제 비즈니스 로직

-   app/ 디렉토리: 라우팅, 레이아웃, 로딩만 담당
-   F.S.D 레이어: 실제 비즈니스 로직과 UI 컴포넌트

🔴 pages ← 최종 페이지 조합 (app/ 디렉토리와 연결)
🟠 widgets ← 페이지 구성 블록 (Header, Footer, Sidebar)  
🟡 features ← 사용자 시나리오 (로그인, 검색, 장바구니)
🟢 entities ← 비즈니스 엔티티 (User, Product, Order)
🔵 shared ← 공통 로직 (UI, API, Utils)
```
# collabdesk-front

-   [F.S.D Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs)- an F.S.D Next.js tutorial.
