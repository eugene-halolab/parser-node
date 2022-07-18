<?php
$url = "http://localhost:3003";
$params = array(
  "url" => "https://dev.amidstyle.com/"
);

$curl = curl_init();
$q_param = http_build_query($params);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL, $url."?".$q_param);

$resp = curl_exec($curl);

$resp = json_decode($resp, true);
curl_close($curl);

echo "Sign: " . $resp['sign'];
?>