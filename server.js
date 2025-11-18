import express from "express";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("AI Security Early-Warning Server Running 🛡️");
});

app.post("/alert", async (req, res) => {
  const email = req.body.email;
  const message = req.body.message;

  try {
    await resend.emails.send({
      from: "AI Security <alerts@yourdomain.com>",
      to: email,
      subject: "⚠️ EARLY WARNING DETECTED",
      html: `<pre>${message}</pre>`
    });

    res.json({ ok: true, sent: true });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port 3000"));
