import axios from 'axios';

const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK!;

export async function notifyZapier(userEmail: string,subject:string ,message: string) {
  try {
    await axios.post(zapierWebhookUrl, {
      email: userEmail,
      subject:subject,
      message:message,
      timestamp: new Date().toISOString(),
    });
    console.log("Zapier notified successfully");
  } catch (error) {
    console.error("Failed to notify Zapier:", error);
  }
}
