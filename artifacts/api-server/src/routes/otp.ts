import { Router } from "express";

const router: Router = Router();

const otpStore = new Map<string, { otp: string; expiresAt: number }>();

router.post("/otp/send", async (req, res) => {
  const { mobile } = req.body as { mobile?: string };

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    res.status(400).json({ success: false, message: "Valid 10-digit mobile number required" });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(mobile, { otp, expiresAt });

  const apiKey = process.env["FAST2SMS_API_KEY"];

  if (apiKey) {
    try {
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: otp,
          numbers: mobile,
          flash: 0,
        }),
      });
      const data = (await response.json()) as { return: boolean; message?: string[] };
      if (!data.return) {
        req.log.error({ data }, "Fast2SMS error");
        res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
        return;
      }
    } catch (err) {
      req.log.error({ err }, "Fast2SMS request failed");
      res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
      return;
    }
  } else {
    req.log.info({ otp, mobile }, "FAST2SMS_API_KEY not configured — OTP logged for dev");
  }

  res.json({ success: true, message: "OTP sent to your mobile number" });
});

router.post("/otp/verify", (req, res) => {
  const { mobile, otp } = req.body as { mobile?: string; otp?: string };

  if (!mobile || !otp) {
    res.status(400).json({ success: false, message: "Mobile and OTP are required" });
    return;
  }

  const record = otpStore.get(mobile);

  if (!record) {
    res.status(400).json({ success: false, message: "OTP not found. Please request a new one." });
    return;
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    return;
  }

  if (record.otp !== otp.trim()) {
    res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
    return;
  }

  otpStore.delete(mobile);
  res.json({ success: true, message: "OTP verified successfully" });
});

export default router;
