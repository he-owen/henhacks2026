import os
import json
import base64
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig, GoogleSearch, Tool, Part

load_dotenv()


class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not set")
        self.client = genai.Client(api_key=api_key)

    def extract_bill_from_pdf(self, pdf_bytes: bytes) -> dict:
        """
        Given raw PDF bytes of a utility bill, use Gemini to extract:
        month, year, totalAmount, usageKwh, utility (company name).
        """
        prompt = """You are an expert at reading utility/electricity bills.
Analyze this PDF of a utility bill and extract the following information.

Return a JSON object with exactly these fields (no other text, no markdown):
- "month": number (1-12), the billing month
- "year": number (e.g. 2025), the billing year
- "totalAmount": number, the total amount due in dollars (e.g. 127.40)
- "usageKwh": number or null, the total energy usage in kWh if shown on the bill
- "utility": string, the utility company name

If you cannot determine a value, use null for optional fields (usageKwh) or your best guess for required fields (month, year, totalAmount, utility).

Return only valid JSON, no code block or explanation."""

        pdf_part = Part.from_bytes(data=pdf_bytes, mime_type="application/pdf")

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[pdf_part, prompt],
            )
            text = response.text
            if not text:
                raise RuntimeError("Gemini returned empty response")

            text = text.strip()
            if text.startswith("```"):
                lines = text.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].strip() == "```":
                    lines = lines[:-1]
                text = "\n".join(lines)

            data = json.loads(text)
            return {
                "month": int(data.get("month") or 1),
                "year": int(data.get("year") or 2025),
                "totalAmount": float(data.get("totalAmount") or 0),
                "usageKwh": int(data["usageKwh"]) if data.get("usageKwh") is not None else None,
                "utility": str(data.get("utility") or "Unknown"),
            }
        except json.JSONDecodeError as e:
            raise ValueError(f"Gemini returned invalid JSON: {e}")
        except Exception as e:
            raise RuntimeError(f"Failed to extract bill data: {e}")

    def enrich_device(self, name: str, brand: str, model: str) -> dict:
        """
        Given device name, brand, and model, return inferred device details as a dict:
        type, hourlyEnergy (kWh when in use only), isSmart, runDurationMinutes.
        Uses Google Search grounding for accurate, up-to-date specs.
        """
        prompt = f"""You are an expert on home appliances and energy usage. Use web search to find accurate power/spec data for this exact product when available.

Given this device:
- Name: {name}
- Brand: {brand}
- Model: {model}

Return a JSON object with exactly these fields (no other text, no markdown):
- "type": string, a **specific** device type (e.g. Refrigerator, Dishwasher, Washing Machine, Dryer, Television, Computer, Monitor, Air Conditioner, Space Heater, Microwave, Oven, Smart Speaker, Router, Dehumidifier, Water Heater, EV Charger, Solar Panel, Light Bulb, Ceiling Fan). Do NOT use generic terms like "Appliance" or "Electronics"—use the specific product type. Use "Other" only if no specific type fits.
- "hourlyEnergy": number, typical power consumption in kWh per hour **only when the device is in active use** (e.g. TV on, AC cooling, washer running). Do NOT average with standby; this must be the in-use draw only. Use 0 if unknown.
- "isSmart": boolean, true if this product is typically a smart/connected device
- "runDurationMinutes": number, typical daily run time in minutes when active (e.g. fridge 1440, TV 240). Use 60 if unknown.

Return only valid JSON, no code block or explanation."""

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=GenerateContentConfig(
                    tools=[Tool(google_search=GoogleSearch())]
                ),
            )
            text = response.text
            if not text:
                raise RuntimeError("Gemini returned empty response")

            text = text.strip()
            if text.startswith("```"):
                lines = text.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].strip() == "```":
                    lines = lines[:-1]
                text = "\n".join(lines)

            data = json.loads(text)
            hourly = data.get("hourlyEnergy")
            return {
                "type": str(data.get("type", "Other")).strip() or "Other",
                "hourlyEnergy": float(hourly) if hourly is not None else 0.0,
                "isSmart": bool(data.get("isSmart", False)),
                "runDurationMinutes": int(data.get("runDurationMinutes", 60)) if data.get("runDurationMinutes") is not None else 60,
            }
        except json.JSONDecodeError as e:
            raise ValueError(f"Gemini returned invalid JSON: {e}")
        except Exception as e:
            raise RuntimeError(f"Failed to enrich device: {e}")
