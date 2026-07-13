# Read this

## template
> views folder incldues the main template
- assest  includes the imgs uses as base64 in pdf file
- 

## express server
> Shown the example, how use this template
- start the ejsserver to view the ejs template preview on this path = /

## QRcode
> the qrcode should contain the full url to verify the invoice with the param as digitally signed(using hashing algo)
- generate the hash with the combination of the invioce number and the secret id and then add the as query param in qr code url
- server should only show/render the invoice upon the verification of the signature(hash)
