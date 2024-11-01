const cspHeader = `
  default-src 'self';
  frame-src 'self' 
    https://m.vk.com 
    https://smartcaptcha.yandexcloud.net 
    https://id.vk.com 
    https://login.vk.com 
    https://vk.com 
    https://www.google.com/recaptcha/ 
    https://recaptcha.google.com/recaptcha/ 
    https://*.onetimelink.ru 
    https://metrika.yandex.ru 
    https://metrika.yandex.by 
    https://metrica.yandex.com 
    https://metrica.yandex.com.tr 
    https://yandexadexchange.net 
    https://*.yandexadexchange.net 
    https://yastatic.net 
    https://*.yandex.ru 
    https://*.adfox.ru 
    https://webvisor.com 
    https://*.webvisor.com 
    http://webvisor.com 
    http://*.webvisor.com 
    https://mc.yandex.ru;
  script-src 'self' blob: 'unsafe-inline' 'unsafe-eval' 
    https://*.onetimelink.ru 
    https://smartcaptcha.yandexcloud.net 
    https://*.mail.ru 
    https://img.imgsmail.ru 
    https://imgs2.imgsmail.ru 
    https://yastatic.net 
    https://yandex.ru 
    https://*.yandex.ru 
    https://*.adfox.ru 
    https://yandex.ru 
    https://yandex.com 
    https://verify.yandex.ru 
    https://www.google.com/recaptcha/ 
    https://www.gstatic.com/recaptcha/ 
    https://cdnjs.cloudflare.com 
    https://cdn.jsdelivr.net 
    https://*.cloudfront.net 
    https://www.googletagmanager.com 
    https://vk.com;
  connect-src 'self' blob: 
    https://*.onetimelink.ru 
    https://*.mail.ru 
    https://yandex.ru 
    https://*.yandex.ru 
    https://*.yandex.net 
    https://*.yandex.com 
    https://yastatic.net 
    https://*.adfox.ru 
    https://*.google-analytics.com 
    https://*.analytics.google.com 
    https://*.googletagmanager.com 
    https://*.apptracer.ru;
  img-src 'self' data: blob: https://*;
  media-src 'self' data: blob: 
    https://*.onetimelink.ru 
    https://yastatic.net 
    https://yandex.ru 
    https://*.yandex.net 
    https://*.yandex.ru 
    https://*.adfox.ru 
    https://yandex.ru 
    https://yandex.com;
  style-src 'self' 'unsafe-inline' 
    https://cdn.jsdelivr.net 
    https://fonts.googleapis.com 
    https://yastatic.net;
  font-src 'self' 'unsafe-inline' data: 
    https://fonts.gstatic.com 
    https://yastatic.net;
  frame-ancestors 'self' 
    https://*.onetimelink.ru 
    https://metrika.yandex.ru 
    https://metrika.yandex.by 
    https://metrica.yandex.com 
    https://metrica.yandex.com.tr 
    https://webvisor.com 
    https://*.webvisor.com 
    http://webvisor.com 
    http://*.webvisor.com;
`;

module.exports = {cspHeader};
