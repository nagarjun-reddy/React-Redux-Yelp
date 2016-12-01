import axios from 'axios';
import oauth_signature from 'oauth-signature';
import nonce from 'nonce';
import _ from 'lodash';
import qs from 'querystring';

//Define these properties
//const CONSUMER_KEY =	'';
//const CONSUMER_SECRET = '';
//const TOKEN = '';
//const TOKEN_SECRET = '';
const ROOT_URL = 'http://api.yelp.com/v2/search';

export function fetchPlaces(searchterm) {

  const default_parameters = {
    location: 'San+Francisco',
    term: searchterm
  };

  const required_parameters = {
    oauth_consumer_key : CONSUMER_KEY,
    oauth_token : TOKEN,
    oauth_nonce : nonce()(),
    oauth_timestamp : nonce()().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1'
 };
 const HTTP_METHOD = 'GET';
 const parameters = _.assign(default_parameters, null, required_parameters);

   /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  const signature = oauth_signature.generate(HTTP_METHOD, ROOT_URL, parameters, CONSUMER_SECRET, TOKEN_SECRET, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  const paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  const url =`${ROOT_URL}?${paramURL}`;

  const request = axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });;
	return {
		type:'FETCH_PLACES',
		payload:request
	};
}
