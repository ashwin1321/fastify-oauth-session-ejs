import axios from "axios";

async function validateOauth(request, reply, done) {
  try {
    const token = request.session.get("token");

    if (!token) {
      return reply.code(401).send("Unauthorized");
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    request.user = data;
    console.log(data);
    done();
  } catch (error) {
    console.error("Error validating OAuth token", error);
    reply.code(500).send("Internal Server Error");
  }
}

export default validateOauth;
