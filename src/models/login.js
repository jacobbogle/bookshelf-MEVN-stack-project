import { ref } from "vue";

const Login = () => {
  const state = ref({
    responseStatus: null,
  });

  const postSession = async function (username, password) {
    try {
      let loginCredentials = {
        username: username,
        password: password,
      };

      let response = await fetch("/session", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status == 200) {
        state.value.responseStatus = response.status;
        this.$router.go({ path: "/" });
      } else if (response.status == 401) {
        state.value.responseStatus = response.status;
      } else if (response.status == 500) {
        state.value.responseStatus = response.status;
      }
    } catch (error) {
      console.log("Some other error in POST /session, now the error: " + error);
    }
  };

  return {
    postSession,
    state,
  };
};

export default Login;
