export default async function handler(req, res) {
  try {
    // 🟢 1. READ LANGUAGE (FROM FRONTEND)
    const { lang = "en" } = req.query;

    //  CURRENT DATETIME (ISO FORMAT)
    const now = new Date().toISOString();

    //  GET ACCESS TOKEN
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

    //  CALL PANCHANG API (WITH LANGUAGE PARAM)
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

    // EXTRACT INAUSPICIOUS PERIOD
    const inauspicious = panchang.inauspicious_period || [];

    console.log("INAUSPICIOUS:", JSON.stringify(inauspicious, null, 2));
    console.log("LANG:", lang);
    console.log("FULL DATA:", JSON.stringify(panchang, null, 2));

    const rahu = inauspicious.find(
      (p) => p.name.includes("Rahu") || p.name.includes("இராகு"),
    );

    const yama = inauspicious.find(
      (p) => p.name.includes("Yamaganda") || p.name.includes("எமகண்டம்"),
    );

    const gulika = inauspicious.find(
      (p) => p.name.includes("Gulika") || p.name.includes("குளிகை"),
    );
    console.log(
      "INAUSPICIOUS PERIOD:",
      inauspicious.find((p) => p.name),
    );
    const rahuStart = rahu?.period?.[0]?.start;
    const rahuEnd = rahu?.period?.[0]?.end;

    const yamaStart = yama?.period?.[0]?.start;
    const yamaEnd = yama?.period?.[0]?.end;

    const gulikaStart = gulika?.period?.[0]?.start;
    const gulikaEnd = gulika?.period?.[0]?.end;

    function formatTime(timeString, lang = "en-IN") {
      if (!timeString) return "N/A";

      const date = new Date(timeString);
      return date.toLocaleTimeString(lang, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata", // force IST
      });
    }

    //  FALLBACK TAMIL MAPPING
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

    // EXTRACT VALUES
    const tithiName = panchang.tithi?.[0]?.name;
    const nakshatraName = panchang.nakshatra?.[0]?.name;
    const dayName = panchang.vaara;

    //  FINAL RESULT
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
          timeZone: "Asia/Kolkata",
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

    // RETURN RESPONSE
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

    res.status(200).json(result);
  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
