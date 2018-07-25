export default function (id) {
  // prepare data
  window.dataLayer = window.dataLayer || []

  function gtag () { dataLayer.push(arguments) }

  gtag('js', new Date())
  gtag('config', id)

  // load analytics
  var script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
  script.type = 'text/javascript'
  script.async = true
  document.head.appendChild(script)
}
