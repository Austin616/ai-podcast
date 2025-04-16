require('dotenv').config({ path: '.env.local' });

console.log("CLERK_WEBHOOK_SECRET:", process.env.CLERK_WEBHOOK_SECRET);
console.log("CONVEX_DEPLOYMENT:", process.env.CONVEX_DEPLOYMENT);
