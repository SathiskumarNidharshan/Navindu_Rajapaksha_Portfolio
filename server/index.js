import { createApp } from "./app.js";
import * as db from "./sqliteDb.js";

const app = createApp(db);
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
