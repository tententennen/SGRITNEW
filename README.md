# 爆撃竜馬 Official Site - 株式会社SGRIT

## デプロイ手順

### 1. GitHubにプッシュ

```bash
cd sgrit-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/sgrit-site.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. https://vercel.com にアクセスしてGitHubでログイン
2. 「New Project」→ sgrit-site リポジトリを選択
3. 「Deploy」をクリック

### 3. カスタムドメイン設定

1. Vercelダッシュボード → プロジェクト → Settings → Domains
2. `sgrit.jp` を入力して「Add」
3. DNS設定（ドメイン管理画面）：
   - Aレコード: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com.`

### ローカル開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。
