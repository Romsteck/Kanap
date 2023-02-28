const URLParameters = new URLSearchParams(window.location.search)
document.getElementById('orderId').textContent = URLParameters.get('id')