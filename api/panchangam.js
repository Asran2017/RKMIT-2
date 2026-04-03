export default async function handler(req, res) {
  try {
    // 🟢 1. READ LANGUAGE (FROM FRONTEND)
    const { lang = "en" } = req.query;

    // 🟢 2. CURRENT DATETIME (ISO FORMAT)
    const now = new Date().toISOString();

    // 🟢 3. GET ACCESS TOKEN
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);

    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      console.error("TOKEN ERROR:", tokenData);

      return res.status(500).json({
        error: "Failed to generate access token",
      });
    }
    console.log("CLIENT_ID:", process.env.CLIENT_ID);
    console.log(
      "CLIENT_SECRET:",
      process.env.CLIENT_SECRET ? "EXISTS" : "MISSING",
    );
    console.log("TOKEN DATA:", JSON.stringify(tokenData, null, 2));

    const accessToken = tokenData.access_token;

    // 🟢 4. CALL PANCHANG API (WITH LANGUAGE PARAM)
    const apiResponse = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=1&coordinates=13.0827,80.2707&datetime=${now}&la=${lang}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("API STATUS:", apiResponse.status);

    const data = await apiResponse.json();

    console.log("RAW API RESPONSE:", JSON.stringify(data, null, 2));
    if (!data || !data.data) {
      console.error("API FAILED:", data);

      return res.status(500).json({
        error: "Invalid API response",
      });
    }

    const panchang = data.data;
    console.log("PANCHANG OK");

    // 🟢 6. EXTRACT INAUSPICIOUS PERIOD
    const inauspicious = panchang.inauspicious_period || [];

    console.log("INAUSPICIOUS:", JSON.stringify(inauspicious, null, 2));
    console.log("LANG:", lang);
    console.log("FULL DATA:", JSON.stringify(panchang, null, 2));

    const getName = (p) => p.name?.en || p.name;

    const rahu = inauspicious.find((p) => getName(p) === "Rahu");
    const yama = inauspicious.find((p) => getName(p) === "Yamaganda");
    const gulika = inauspicious.find((p) => getName(p) === "Gulika");
    const rahuStart = rahu?.period?.[0]?.start;
    const rahuEnd = rahu?.period?.[0]?.end;

    const yamaStart = yama?.period?.[0]?.start;
    const yamaEnd = yama?.period?.[0]?.end;

    const gulikaStart = gulika?.period?.[0]?.start;
    const gulikaEnd = gulika?.period?.[0]?.end;

    // 🟢 7. TIME FORMAT FUNCTION
    function formatTime(time) {
      if (!time) return "N/A";
      const date = new Date(time);
      return date.toLocaleTimeString(lang === "ta" ? "ta-IN" : "en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // 🟢 8. FALLBACK TAMIL MAPPING
    const tithiMap = {
      Purnima: "பௌர்ணமி",
      Amavasya: "அமாவாசை",
    };

    const nakshatraMap = {
      Hasta: "ஹஸ்தம்",
      Ashwini: "அஸ்வினி",
    };

    const dayMap = {
      Sunday: "ஞாயிற்றுக்கிழமை",
      Monday: "திங்கட்கிழமை",
      Tuesday: "செவ்வாய்க்கிழமை",
      Wednesday: "புதன்கிழமை",
      Thursday: "வியாழக்கிழமை",
      Friday: "வெள்ளிக்கிழமை",
      Saturday: "சனிக்கிழமை",
    };

    // 🟢 9. EXTRACT VALUES
    const tithiName = panchang.tithi?.[0]?.name;
    const nakshatraName = panchang.nakshatra?.[0]?.name;
    const dayName = panchang.vaara;

    // 🟢 10. FINAL RESULT
    const result = {
      day: lang === "ta" ? dayMap[dayName] || dayName : dayName,

      tithi: lang === "ta" ? tithiMap[tithiName] || tithiName : tithiName,

      nakshatra:
        lang === "ta"
          ? nakshatraMap[nakshatraName] || nakshatraName
          : nakshatraName,

      date: new Date(panchang.sunrise).toLocaleDateString(
        lang === "ta" ? "ta-IN" : "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      ),

      rahukalam:
        rahuStart && rahuEnd
          ? `${formatTime(rahuStart)} - ${formatTime(rahuEnd)}`
          : "N/A",

      yamagandam:
        yamaStart && yamaEnd
          ? `${formatTime(yamaStart)} - ${formatTime(yamaEnd)}`
          : "N/A",

      kuligai:
        gulikaStart && gulikaEnd
          ? `${formatTime(gulikaStart)} - ${formatTime(gulikaEnd)}`
          : "N/A",
    };

    // 🟢 11. RETURN RESPONSE

    res.status(200).json(result);
  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
