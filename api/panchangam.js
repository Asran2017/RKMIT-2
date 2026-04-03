export default async function handler(req, res) {
  try {
    // 🟢 1. READ LANGUAGE (FROM FRONTEND)
    const { lang = "en" } = req.query;

    // 🟢 2. CURRENT DATETIME (ISO FORMAT)
    const now = new Date().toISOString();

    // 🟢 3. GET ACCESS TOKEN
    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    });

    const tokenData = await tokenResponse.json();
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

    const data = await apiResponse.json();
    const panchang = data.data;

    // 🟢 5. LOG FULL RESPONSE (FOR DEBUGGING)
    console.log("LANG:", lang);
    console.log("FULL DATA:", JSON.stringify(panchang, null, 2));

    // 🟢 6. EXTRACT INAUSPICIOUS PERIOD
    const inauspicious = panchang.inauspicious_period || [];

    console.log("INAUSPICIOUS:", JSON.stringify(inauspicious, null, 2));

    const rahu = inauspicious.find((p) => p.name === "Rahu");
    const yama = inauspicious.find((p) => p.name === "Yamaganda");
    const gulika = inauspicious.find((p) => p.name === "Gulika");
    const rahuStart = rahu?.period?.[0]?.start;
    const rahuEnd = rahu?.period?.[0]?.end;

    const yamaStart = yama?.period?.[0]?.start;
    const yamaEnd = yama?.period?.[0]?.end;

    const gulikaStart = gulika?.period?.[0]?.start;
    const gulikaEnd = gulika?.period?.[0]?.end;

    // 🟢 7. TIME FORMAT FUNCTION
    function formatTime(time) {
      if (!time) return "N/A";
      return new Date(time).toLocaleTimeString(
        lang === "ta" ? "ta-IN" : "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      );
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
