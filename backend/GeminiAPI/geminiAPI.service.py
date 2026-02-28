import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()  # loads .env 

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not set")

        # Initialize client with API key
        self.client = genai.Client(api_key=api_key)

    async def generate_rate_from_device(self, formData: dict) -> float:
        prompt = f"""
You are a helpful assistant that generates a rate from a device.
The form data is: {json.dumps(formData)}

formData contains the following fields:
- device_name: {formData.get("device_name")} The name of the device (e.g. "Smart Thermostat")
- device_type: {formData.get("device_type")} The type of the device (e.g. "Thermostat")
- device_brand: {formData.get("device_brand")} The brand of the device (e.g. "Nest")
- device_model: {formData.get("device_model")} The model of the device (e.g. "Nest Thermostat")

Generate the hourly energy consumption in kWh.
Return ONLY a float number.
"""
        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            text = response.text
            if not text:
                raise RuntimeError("Gemini returned empty response")

            return float(text.strip())

        except ValueError:
            raise ValueError(f"Gemini returned non-numeric response: {text}")

        except Exception as e:
            raise RuntimeError(f"Failed to generate rate: {e}")

