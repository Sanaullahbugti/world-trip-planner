const { GoogleGenerativeAI } = require('@google/generative-ai');

const countTokens = (text) => (text ? text.split(/\s+/).length : 0);

const sendToGemini = async (userInput) => {

    
  const prompt = {
    message: `You are a travel assistant. The user wants information on: ${userInput}. 
Please respond ONLY with a valid JSON object containing the following structure:
{
  "overview": {
    "description": "Brief overview of the trip",
    "genre": "Type of trip (e.g., adventure, cultural, leisure, etc.)",
    "total_cost": "Estimated total cost of the trip"
  },
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "early morning",
          "place": "Activity name or breakfast location",
          "description": "Brief description of the activity or meal",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., restaurant, park, etc.)"
        },
        {
          "time": "morning",
          "place": "Activity name",
          "description": "Brief description of the activity",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., museum, attraction, etc.)"
        },
        {
          "time": "late morning",
          "place": "Activity name or brunch location",
          "description": "Brief description of the activity or meal",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., restaurant, historical site, etc.)"
        },
        {
          "time": "early afternoon",
          "place": "Activity name",
          "description": "Brief description of the activity",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., park, cultural site, etc.)"
        },
        {
          "time": "afternoon",
          "place": "Lunch location",
          "description": "Brief description of the meal",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "restaurant"
        },
        {
          "time": "late afternoon",
          "place": "Activity name",
          "description": "Brief description of the activity",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., market, museum, etc.)"
        },
        {
          "time": "early evening",
          "place": "Activity name or light snack location",
          "description": "Brief description of the activity or snack",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., cafe, viewpoint, etc.)"
        },
        {
          "time": "evening",
          "place": "Dinner location",
          "description": "Brief description of the dinner",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "restaurant"
        },
        {
          "time": "late evening",
          "place": "Activity name",
          "description": "Brief description of the activity",
          "budget": "Estimated cost",
          "latitude": "numerical latitude",
          "longitude": "numerical longitude",
          "place_type": "type of place (e.g., bar, night attraction, etc.)"
        }
      ]
    }
  ]
}

Important:
1. Each day must have at least 8 to 10 itineraries, including meals.
2. Use ONLY double quotes, not single quotes.
3. All latitude and longitude values must be valid numbers.
4. Do not include any text before or after the JSON object.
5. Ensure all JSON properties are properly quoted.
    `
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });  
    const result = await model.generateContent(prompt.message);

    // Get the response text from the candidates array
    const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";

    // Count tokens using the actual usage metadata if available
    const inputTokens = result.response?.usageMetadata?.promptTokenCount || countTokens(prompt.message);
    const outputTokens = result.response?.usageMetadata?.candidatesTokenCount || countTokens(responseText);

    return {
      overview: JSON.parse(responseText).overview,
      itinerary: JSON.parse(responseText).itinerary,
      inputTokens,
      outputTokens,
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error.response?.data || error);
    throw new Error('Failed to fetch data from Gemini API');
  }
};

module.exports = { sendToGemini };
