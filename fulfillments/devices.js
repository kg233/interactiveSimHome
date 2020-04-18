//return a list of device names

const axios = require('axios');

async function devices() {
  try {
    let { data } = await axios.get(
      'https://pluto.calit2.uci.edu:8481/v1/energy/devices'
    );

    data = data
      .filter((item) => {
        return item.device_name != null;
      })
      .map((item) => {
        return item.device_name;
      });

    return 'here are the devices: ' + data.join();
  } catch (err) {
    console.log(err);
    return 'error occurred, please try again.';
  }
}

module.exports = devices;
