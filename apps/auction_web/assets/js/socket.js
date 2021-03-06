// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import { Socket } from 'phoenix';

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState !== 'loading')
        fn();
    });
  }
}

ready(function () {
  let socket = new Socket('/socket', { params: { token: window.userToken } });
  let match = document.location.pathname.match(/\/items\/(\d+)$/);
  if (match) {
    let itemId = match[1];

    socket.connect();

    let channel = socket.channel(`item:${itemId}`, {});

    channel.on('new_bid', data => {
      let bids = document.getElementById('bids');
      bids.insertAdjacentHTML('afterbegin', data.body);
    });

    channel.join()
           .receive('ok', resp => {
             console.log('Joined successfully', resp);
           })
           .receive('error', resp => {
             console.log('Unable to join', resp);
           });
  }
});

export default socket;
