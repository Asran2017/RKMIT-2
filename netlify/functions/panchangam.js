const now = new Date().toISOString();

export async function handler() {
  try {
    //  Get access token
    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    //  Call Panchangam API
    const apiResponse = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=13.0827,80.2707&datetime=${now}&language="ta"`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const auspiciousResponse = await fetch(
      `https://api.prokerala.com/v2/astrology/auspicious-time?coordinates=13.0827,80.2707&datetime=${now}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    function formatTime(time) {
      return new Date(time).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const auspiciousData = await auspiciousResponse.json();
    console.log(JSON.stringify(auspiciousData, null, 2));
    const rahukalam = auspiciousData.data.rahukalam;
    const yamagandam = auspiciousData.data.yamagandam;
    const kuligai = auspiciousData.data.gulika;

    const data = await apiResponse.json();
    console.log(data);
    const panchang = data.data;
    console.log(JSON.stringify(panchang.tithi, null, 2));
    console.log(JSON.stringify(panchang.nakshatra, null, 2));

    const result = {
      day: panchang.vaara,
      tithi: panchang.tithi?.[0]?.name,
      nakshatra: panchang.nakshatra?.[0]?.name,
      date: new Date(panchang.sunrise).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),

      rahukalam: `${formatTime(rahukalam.start)} - ${formatTime(rahukalam.end)}`,
      yamagandam: `${formatTime(yamagandam.start)} - ${formatTime(yamagandam.end)}`,
      kuligai: `${formatTime(kuligai.start)} - ${formatTime(kuligai.end)}`,
    };
    // STEP 3: Send data to frontend
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
