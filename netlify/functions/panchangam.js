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
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=13.0827,80.2707&datetime=${now}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await apiResponse.json();
    console.log(data);
    const panchang = data.data;

    const result = {
      day: panchang.vaara,
      tithi: panchang.tithi[0].name,
      nakshatra: panchang.nakshatra[0].name,
      date: new Date(panchang.sunrise).toLocaleDateString("en-IN"),
    };

    // STEP 3: Send data to frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    console.log(data);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Panchangam" }),
    };
  }
}
