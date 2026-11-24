/**
 * Helper to verify Cloudflare Turnstile CAPTCHA tokens.
 * Supports dev mode bypass when secret is not configured or set to mock.
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Development bypass if no secret or set to test key
  if (!secret || secret === "mock-turnstile-secret" || secret.startsWith("1x0000000000000000000000000000000AA")) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token || !token.trim()) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      console.error("Turnstile verification HTTP error:", res.status);
      return false;
    }

    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}
